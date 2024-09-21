import { defineStore } from "pinia";
import { ref } from "vue";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../fireBase.js";
import { authStore } from "./authStore"; // Import authStore

export const recipesStore = defineStore("recipesStore", () => {
	const useAuthStore = authStore();
	const userRecipes = ref([]);
	const user = useAuthStore.user;

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
			console.log("Recipe added successfully");
		} catch (error) {
			console.log("Error in recipesStore.js in addRecipe", error);
		}
	};

	return {
		getRecipe,
		addRecipe,
		userRecipes,
	};
});
