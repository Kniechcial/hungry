import { defineStore } from "pinia";
import { auth } from "../fireBase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const authStore = defineStore("authStore", () => {
	const registerUser = (newUser) => {
		createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
			.then((userCredential) => {
				// Signed up
				const user = userCredential.user;
				console.log(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(error.message);
			});
	};
	return {
		registerUser,
	};
});
