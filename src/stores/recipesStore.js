import { defineStore } from "pinia";
import { ref } from "vue";
import {
	collection,
	getDocs,
	addDoc,
	deleteDoc,
	doc,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";
import { db } from "../fireBase.js";
import { authStore } from "./authStore";

export const recipesStore = defineStore("recipesStore", () => {
	const useAuthStore = authStore();
	const userRecipes = ref([]);
	const user = useAuthStore.user;
	const addRecipeStatus = ref(null);
	const addRecipeMessage = ref("");

	const getRecipe = async () => {
		try {
			const recipes = [];
			const recipesCollection = collection(db, "users", user.uid, "recipes");
			const querySnapshot = await getDocs(recipesCollection);
			querySnapshot.forEach((doc) => {
				recipes.push({
					id: doc.id,
					...doc.data(),
				});
			});
			userRecipes.value = recipes;
			console.log("GetRecipes is Working");
			console.log(recipes);
		} catch (error) {
			console.log("Error in recipesStore.js in getRecipe", error);
		}
	};

	const addRecipe = async (recipe) => {
		addRecipeStatus.value = null;
		addRecipeMessage.value = "";
		try {
			const recipesCollection = collection(db, "users", user.uid, "recipes");
			const q = query(recipesCollection, where("name", "==", recipe.name));
			const querySnapshot = await getDocs(q);

			if (!querySnapshot.empty) {
				addRecipeStatus.value = false;
				addRecipeMessage.value = "Recipe with this name already exists.";
				return { success: false, message: "Recipe already exists." };
			}

			await addDoc(recipesCollection, recipe);
			addRecipeStatus.value = true;
			addRecipeMessage.value = "Recipe added successfully!";
			return { success: true, message: "Recipe added successfully." };
		} catch (error) {
			addRecipeStatus.value = false;
			addRecipeMessage.value = "Error adding recipe.";
			console.error("Error in recipesStore.js in addRecipe:", error);
			return { success: false, message: "Error adding recipe." };
		}
	};

	const deleteRecipe = async (recipe) => {
		await deleteDoc(doc(db, "users", user.uid, "recipes", recipe.id));
	};
	let recipesListener = null;
	async function addRecipesListener() {
		removeRecipeListener();
		if (!user) {
			return;
		}
		recipesListener = onSnapshot(
			collection(db, "users", user.uid, "recipes"),
			(querySnapshot) => {
				const updatedRecipes = [];
				querySnapshot.forEach((doc) => {
					updatedRecipes.push({
						id: doc.id,
						...doc.data(),
					});
				});
				userRecipes.value = [...updatedRecipes];
			}
		);
	}
	function removeRecipeListener() {
		if (recipesListener) {
			recipesListener();
			recipesListener = null;
		}
	}

	return {
		getRecipe,
		addRecipe,
		userRecipes,
		addRecipeStatus,
		addRecipeMessage,
		deleteRecipe,
		addRecipesListener,
	};
});
