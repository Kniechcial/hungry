<template>
	<Toast />
	<div class="content">
		<div>
			<img
				class="log-icon"
				:src="logIcon"
				alt="Zdjęcie" />
		</div>
		<div class="card flex justify-content-center">
			<div class="flex flex-column gap-3">
				<p>E-mail:</p>
				<div>
					<div :class="{ redBorder: displayEmailError }">
						<div class="card flex justify-content-center">
							<InputText
								class="input-email"
								v-model.trim="loginUser.email"
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
								:feedback="false"
								v-model.trim="loginUser.password"
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
		<div class="button-box">
			<div class="card relative inline-block mr-5 mt-4 ml-5 cursor-pointer">
				<Button
					@click="logInUser()"
					label="Login"
					:disabled="!loginUser.email || !loginUser.password" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import Password from "primevue/password";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import logIcon from "../../../assets/icon/log-icon.png";
import { authStore } from "../../../stores/authStore.js";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const useAuthStore = authStore();
const displayPasswordError = ref(false);
const displayEmailError = ref(false);

const loginUser = reactive({
	email: "",
	password: "",
});

const logInUser = async () => {
	// Sprawdza błędy po stronie frontend-u (puste pola)
	if (!loginUser.email || !loginUser.password) {
		showError("Please enter email and password");
		displayPasswordError.value = true;
		displayEmailError.value = true;
		return;
	}
	//  Sprawdza błędy po strone backend-u (odpowiedzi z firebase)
	const response = await useAuthStore.loginUser(loginUser);
	if (!response.result) {
		checkError(response.error);
	}
};

const checkError = (error) => {
	if (error === "auth/invalid-email") {
		return (
			(displayEmailError.value = true),
			(displayPasswordError.value = false),
			showError("Invalid email"),
			console.log("error in LogIn.vue " + error)
		);
	} else if (error === "auth/invalid-credential") {
		return (
			(displayEmailError.value = true),
			(displayPasswordError.value = true),
			showError("Invalid credential"),
			console.log("error in LogIn.vue " + error)
		);
	} else if (error === "auth/too-many-requests") {
		return (
			(displayEmailError.value = true),
			(displayPasswordError.value = true),
			showError("Too many requests"),
			console.log("error in LogIn.vue " + error)
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

.errorInput {
	margin-top: 2rem;
	margin-bottom: 1rem;
	font-weight: bold;
	color: red;
}

.showError {
	color: red;
	font-weight: bold;
}
.redBorder {
	border: 2px solid red;
	border-radius: 10px;
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
	transform: translate(-50%, 15%);
	font-size: 18px;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	color: #44424d;
}
.button-box {
	display: flex;
	justify-content: space-between;
}
button {
	padding: 1rem;
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
