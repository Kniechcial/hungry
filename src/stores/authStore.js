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
	const user = ref(null);
	const router = useRouter();
	const init = () => {
		onAuthStateChanged(auth, (userDetails) => {
			if (userDetails) {
				const uid = userDetails.uid;
				user.value = { email: userDetails.email, uid };
				router.push({ name: "HomeView" });
			} else {
				user.value = null;
			}
		});
	};
	const registerUser = async (newUser) => {
		try {
			const response = await createUserWithEmailAndPassword(
				auth,
				newUser.email,
				newUser.password
			);
			const responseData = await response.json();
			// Signed up
			const user = responseData.user;
			console.log(user);
			return { result: true };
		} catch (error) {
			console.log("Error in authStore.js " + error.code);
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
			const user = responseData.user;
			console.log(user);
			return { result: true };
		} catch (error) {
			console.log("Error in authStore.js " + error.code);
			return { result: false, error: error.code };
		}
	};
	// const loginUser = (loginUser) => {
	// 	signInWithEmailAndPassword(auth, loginUser.email, loginUser.password)
	// 		.then((userCredential) => {
	// 			// Signed in
	// 			const user = userCredential.user;
	// 			console.log(user);
	// 			// ...
	// 		})
	// 		.catch((error) => {
	// 			console.log(error.code);
	// 			errorMessage.value = error.code;
	// 		});
	// };
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
