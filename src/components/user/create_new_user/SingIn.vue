<template>
	<Toast />
	<div class="content">
		<img
			class="log-icon"
			:src="logIcon"
			alt="Photo" />
		<div class="card flex justify-content-center">
			<div class="flex flex-column gap-1">
				<p>E-mail:</p>
				<div>
					<div class="card flex justify-content-center">
						<InputText
							:class="{ 'p-invalid': displayEmailError }"
							class="w-17rem"
							v-model.trim="newUser.email"
							type="text" />
					</div>
				</div>
				<p>Password:</p>
				<div>
					<div class="card flex justify-content-center">
						<Password
							:class="{ 'p-invalid': displayPasswordError }"
							v-model.trim="password"
							toggleMask />
					</div>
				</div>
				<p>Confirm password:</p>
				<div>
					<div class="card flex justify-content-center">
						<Password
							:class="{ 'p-invalid': displayPasswordError }"
							v-model.trim="confirmPassword"
							@keydown.enter="addUser"
							toggleMask />
					</div>
				</div>
			</div>
		</div>
		<div class="card flex justify-content-left mt-4">
			<Button
				@click="addUser()"
				label="Register"
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

const toast = useToast();
const useAuthStore = authStore();

const displayPasswordError = ref(false);
const displayEmailError = ref(false);

const password = ref("");
const confirmPassword = ref("");

const newUser = reactive({
	id: Date.now(),
	email: "",
	password: "",
});

const addUser = async () => {
	if (!validatePasswords()) {
		return;
	}
	const response = await useAuthStore.registerUser(newUser);
	if (!response.result) {
		checkError(response.error);
	}
};

const validatePasswords = () => {
	if (confirmPassword.value === password.value) {
		password.value === confirmPassword.value && password.value;
		newUser.password = password.value;
		console.log("Validate Passwords " + newUser.password);
		return true;
	} else {
		showError("Passwords do not match");
		displayPasswordError.value = true;
		return false;
	}
};

const checkError = (error) => {
	if (error === "auth/email-already-in-use" || error === "Missing email") {
		showError("Email already in use" || "Missing email"),
			(displayEmailError.value = true),
			(displayPasswordError.value = false);
	} else if (error === "auth/invalid-email") {
		showError("Invalid email");
		(displayEmailError.value = true), (displayPasswordError.value = false);
	} else if (error === "auth/weak-password" || error === "Missing password") {
		showError("Weak password add more characters" || "Missing password"),
			(displayPasswordError.value = true),
			(displayEmailError.value = false);
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
/* * {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
} */

/* */
.p-invalid {
	border-color: red;
	background-color: #fdd;
	box-shadow: rgba(255, 1, 1, 0.2) 0px 8px 24px;
}
/*  */

/* .input-email {
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
} */
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
	margin-bottom: -4rem;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}

@media (max-width: 650px) {
	.content {
		flex-direction: column;
		align-items: center;
		font-size: 14px;
		width: 100%;
		max-width: 300px;
		margin-bottom: 1rem;
		transform: translate(-50%, 3%);
	}
	.button-box {
		margin-left: 8rem;
		scale: 0.9;
	}
	.input-text {
		width: 230px;
	}
}
</style>
