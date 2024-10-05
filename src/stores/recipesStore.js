import { defineStore } from "pinia";
import { ref } from "vue";
import {
	collection,
	getDocs,
	addDoc,
	deleteDoc,
	doc,
	onSnapshot,
} from "firebase/firestore";
import { db } from "../fireBase.js";
import { authStore } from "./authStore"; // Import authStore

export const recipesStore = defineStore("recipesStore", () => {
	const useAuthStore = authStore();
	const userRecipes = ref([]);
	const user = useAuthStore.user;
	const addRecipeStatus = ref(null);

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
		try {
			const recipesCollection = collection(db, "users", user.uid, "recipes");
			await addDoc(recipesCollection, recipe);
			addRecipeStatus.value = true;
			console.log("Recipe added successfully");
		} catch (error) {
			addRecipeStatus.value = false;
			console.log("Error in recipesStore.js in addRecipe", error);
		}
	};
	const deleteRecipe = async (recipe) => {
		await deleteDoc(doc(db, "users", user.uid, "recipes", recipe.id));
	};

	const getChanges = onSnapshot(
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

	return {
		getRecipe,
		addRecipe,
		userRecipes,
		addRecipeStatus,
		deleteRecipe,
		getChanges,
	};
});
