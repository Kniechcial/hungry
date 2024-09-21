import { defineStore } from "pinia";
import { auth } from "../fireBase.js";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
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
			console.log("Error in authStore.js in registerUser: " + error);
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
			console.log(user.value);
			return { result: true };
		} catch (error) {
			console.log("Error in authStore.js in loginUser: " + error);
			return { result: false, error: error.code };
		}
	};
	const logoutUser = () => {
		signOut(auth)
			.then(() => {
				user.value = null;
				console.log("loggedout");
			})
			.catch((error) => {
				console.log("Error in authStore.js in logoutUser", error);
			});
	};

	const checkUserState = () => {
		onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				user.value = currentUser;
			} else {
				user.value = null;
				console.log("No user is logged in.");
			}
		});
	};

	checkUserState();
	return {
		registerUser,
		loginUser,
		logoutUser,
		user,
	};
});
