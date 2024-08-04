import { defineStore } from "pinia";
import { auth } from "../fireBase.js";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";

export const authStore = defineStore("authStore", () => {
	const user = ref(null);

	const registerUser = async (newUser) => {
		try {
			const response = await createUserWithEmailAndPassword(
				auth,
				newUser.email,
				newUser.password
			);
			const responseData = await response.json();
			user.value = responseData.user;
			console.log(user);
			return { result: true };
		} catch (error) {
			// console.log("Error in authStore.js: " + error.code);
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
			const responseData = await response.json();
			user.value = responseData.user;
			console.log(user);
			return { result: true };
		} catch (error) {
			// console.log("Error in authStore.js: " + error.code);
			return { result: false, error: error.code };
		}
	};
	const logoutUser = () => {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				console.log("loggedout");
			})
			.catch((error) => {
				// An error happened.
			});
	};

	return {
		registerUser,
		loginUser,
		logoutUser,
		user,
	};
});
