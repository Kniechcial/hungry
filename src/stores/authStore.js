import { defineStore } from "pinia";
import { auth } from "../fireBase.js";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const authStore = defineStore("authStore", () => {
	const user = ref({});
	const router = useRouter();
	const init = () => {
		onAuthStateChanged(auth, (userDetails) => {
			// console.log("User changed state");
			// console.log(user);
			if (userDetails) {
				const uid = userDetails.uid;
				user.value = { email: userDetails.email, uid };
				router.push({ name: "HomeView" });
			} else {
				user.value = {};
				router.replace({
					name: "Authorization",
					params: { findBy: "login" },
				});
			}
		});
	};
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
	const loginUser = (loginUser) => {
		signInWithEmailAndPassword(auth, loginUser.email, loginUser.password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user);
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(error.message);
			});
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
		init,
		user,
	};
});
