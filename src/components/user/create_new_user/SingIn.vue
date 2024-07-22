<template>
	<Toast />
	<div class="content">
		<img
			class="log-icon"
			:src="logIcon"
			alt="Photo" />
		<div class="card flex justify-content-center">
			<div class="flex flex-column gap-3">
				<p>E-mail:</p>
				<div>
					<div :class="{ redBorder: displayEmailError }">
						<div class="card flex justify-content-center">
							<InputText
								class="input-email"
								v-model.trim="newUser.email"
								type="text"
								size="large" />
						</div>
					</div>
					<span
						class="showError"
						v-if="displayEmailError"
						>WRONG E-MAIL ADDRESS!</span
					>
				</div>
				<p>Password:</p>
				<div>
					<div :class="{ redBorder: displayPasswordError }">
						<div class="card flex justify-content-center">
							<Password
								v-model.trim="password"
								toggleMask />
						</div>
					</div>
					<span
						class="showError"
						v-if="displayPasswordError"
						>WRONG PASSWORD!</span
					>
				</div>
				<p>Confirm password:</p>
				<div>
					<div :class="{ redBorder: displayPasswordError }">
						<div class="card flex justify-content-center">
							<Password
								v-model.trim="confirmPassword"
								toggleMask />
						</div>
					</div>
					<span
						class="showError"
						v-if="displayPasswordError"
						>WRONG PASSWORD!</span
					>
				</div>
			</div>
		</div>
		<div class="card flex justify-content-left mt-4">
			<Button
				@click="addUser()"
				label="Add User"
				:disabled="!newUser.email || !password || !confirmPassword" />
		</div>
	</div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { authStore } from "../../../stores/authStore.js";
import Password from "primevue/password";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import logIcon from "../../../assets/icon/log-icon.png";
import { useToast } from "primevue/usetoast";

const useAuthStore = authStore();
const displayPasswordError = ref(false);
const displayEmailError = ref(false);

const password = ref("");
const confirmPassword = ref("");
const toast = useToast();

const newUser = reactive({
	id: Date.now(),
	email: "",
	password: "",
});

const addUser = async () => {
	// Sprawdza błędy po stronie frontend-u (brak wprowadzenia danych, błędne hasła)
	if (!newUser.email) {
		displayEmailError.value = true;
		validatePasswords();
		return;
	}
	if (!password.value || !confirmPassword.value) {
		displayPasswordError.value = true;
		validatePasswords();
		return;
	}
	validatePasswords();
	//  Sprawdza błędy po strone backend-u (odpowiedzi z firebase)
	const response = await useAuthStore.registerUser(newUser);
	if (!response.result) {
		checkError(response.error);
		return;
	}
	console.log("name", newUser.email);
	console.log("password", newUser.password);
};

const validatePasswords = () => {
	displayPasswordError.value = !(
		password.value === confirmPassword.value && password.value.length > 0
	);
	if (!displayPasswordError.value) {
		newUser.password = password.value;
		console.log("Validate Passwords " + newUser.password);
	} else {
		showError("Passwords do not match");
		return;
	}
};

const checkError = (error) => {
	if (error === "auth/email-already-in-use" || error === "Missing email") {
		return (
			(displayEmailError.value = true),
			(displayPasswordError.value = false),
			showError("Email already in use" || "Missing email"),
			console.log(displayEmailError.value)
		);
	} else if (error === "auth/weak-password" || error === "Missing password") {
		return (
			(displayPasswordError.value = true),
			(displayEmailError.value = false),
			showError("Weak password add more characters" || "Missing password")
		);
	}
};

const showError = (message) => {
	toast.add({
		severity: "error",
		summary: "Error Message",
		detail: message,
		life: 3000,
	});
};
</script>

<style scoped>
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}
.input-email {
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
}
.content {
	position: relative;
	border: 1px solid;
	border-color: aliceblue;
	border-radius: 10px;
	background-color: #fcffff;
	padding: 1rem;
	width: 27rem;
	left: 50%;
	transform: translate(-50%, 5%);
	font-size: 18px;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	color: #44424d;
}
.showError {
	color: red;
	font-weight: bold;
}
.redBorder {
	border: 2px solid red;
	border-radius: 10px;
}
button {
	margin-left: auto;
	margin-right: auto;
	padding: 4rem;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
}
.log-icon {
	margin-top: 3rem;
	position: relative;
	margin-bottom: -5rem;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
</style>
