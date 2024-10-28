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
import { useAuthStore } from "./authStore";

export const useRecipesStore = defineStore("recipesStore", () => {
	const authStore = useAuthStore();
	const userRecipes = ref([]);
	const addRecipeStatus = ref(null);
	const addRecipeMessage = ref("");
	const cleanStore = () => {
		userRecipes.value = [];
		addRecipeStatus.value = null;
		addRecipeMessage.value = "";
	};

	const getRecipe = async () => {
		try {
			const recipes = [];
			const recipesCollection = collection(
				db,
				"users",
				authStore.user.uid,
				"recipes"
			);
			const querySnapshot = await getDocs(recipesCollection);
			querySnapshot.forEach((doc) => {
				recipes.push({
					id: doc.id,
					...doc.data(),
				});
			});
			userRecipes.value = recipes;
			
			
		} catch (error) {
			console.log(error);
		}
	};

	const addRecipe = async (recipe) => {
		addRecipeStatus.value = null;
		addRecipeMessage.value = "";
		try {
			const recipesCollection = collection(
				db,
				"users",
				authStore.user.uid,
				"recipes"
			);
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
			console.error(error);
			return { success: false, message: "Error adding recipe." };
		}
	};

	const deleteRecipe = async (recipe) => {
		await deleteDoc(
			doc(db, "users", authStore.user.uid, "recipes", recipe.id)
		);
	};
	let recipesListener = null;
	async function addRecipesListener() {
		removeRecipeListener();
		if (!authStore.user.uid) {
			return;
		}
		recipesListener = onSnapshot(
			collection(db, "users", authStore.user.uid, "recipes"),
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
		cleanStore,
	};
});
