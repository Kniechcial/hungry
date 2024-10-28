import { defineStore } from "pinia";
import { auth } from "../fireBase.js";
import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from "firebase/auth";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { ref } from "vue";
import { useRecipesStore } from "./recipesStore.js";

export const useAuthStore = defineStore("authStore", () => {
	const recipesStore = useRecipesStore();

	const user = ref(null);

	const registerUser = async (newUser) => {
		try {
			const response = await createUserWithEmailAndPassword(
				auth,
				newUser.email,
				newUser.password
			);
			user.value = response.user;

			return { result: true };
		} catch (error) {
			console.log(error);
			return { result: false, error: error.code };
		}
	};
	const loginUser = async (loginUser) => {
		try {
			const response = await signInWithEmailAndPassword(
				auth,
				loginUser.email,
				loginUser.password
			);
			user.value = response.user;
			return { result: true };
		} catch (error) {
			console.log(error);
			return { result: false, error: error.code };
		}
	};
	const logoutUser = () => {
		signOut(auth)
			.then(() => {
				user.value = null;
				recipesStore.cleanStore();
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const restorePassword = async (email) => {
		try {
			await sendPasswordResetEmail(auth, email);
		} catch (error) {
			console.log(error);
		}
	};

	const checkUserState = () => {
		onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				user.value = currentUser;
			} else {
				user.value = null;
			}
		});
	};

	checkUserState();
	return {
		registerUser,
		loginUser,
		logoutUser,
		restorePassword,
		user,
	};
});
