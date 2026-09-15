<template>
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
							v-model.trim="newUser.email"
							@keydown.enter="toggleToAddNewUser"
							type="text" />
					</div>
				</div>
				<p>Password:</p>
				<div>
					<div class="card flex justify-content-center">
						<InputText
							:class="{ 'p-invalid': displayPasswordError }"
							v-model.trim="password"
							@keydown.enter="toggleToAddNewUser"
							toggleMask
							type="password" />
					</div>
				</div>
				<p>Confirm password:</p>
				<div>
					<div class="card flex justify-content-center">
						<InputText
							:class="{ 'p-invalid': displayPasswordError }"
							v-model.trim="confirmPassword"
							@keydown.enter="toggleToAddNewUser"
							toggleMask
							type="password" />
					</div>
				</div>
			</div>
		</div>
		<div class="card flex justify-content-left mt-4">
			<Button
				@click="toggleToAddNewUser()"
				label="Register"
				:disabled="!newUser.email || !password || !confirmPassword" />
		</div>
	</div>
	<Toast
		class="w-18rem md:w-4"
		position="top-right" />
</template>

<script setup>
import { reactive, ref } from "vue";
import { useAuthStore } from "../../../stores/authStore.js";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import logIcon from "../../../assets/icon/log-icon.png";

const toast = useToast();
const authStore = useAuthStore();

const displayPasswordError = ref(false);
const displayEmailError = ref(false);

const password = ref("");
const confirmPassword = ref("");

const newUser = reactive({
	id: Date.now(),
	email: "",
	password: "",
});

const toggleToAddNewUser = async () => {
	if (!validatePasswords()) {
		return;
	}
	const response = await authStore.registerUser(newUser);
	if (!response.result) {
		checkError(response.error);
	}
};

const validatePasswords = () => {
	if (confirmPassword.value === password.value) {
		password.value === confirmPassword.value && password.value;
		newUser.password = password.value;
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
.p-invalid {
	border-color: var(--color-danger) !important;
	background-color: rgba(158, 59, 52, 0.08);
}
.content {
	max-width: 24rem;
	margin: 2rem auto;
	padding: 1.5rem 1.75rem 2rem;
	border-radius: var(--radius-card);
	background-color: var(--color-surface);
	box-shadow: var(--shadow-card);
	color: var(--color-text);
	text-align: center;
}
.log-icon {
	width: 72px;
	height: 72px;
	object-fit: contain;
	margin-bottom: 0.5rem;
}
.content :deep(.p-inputtext) {
	width: 100%;
}
.content p {
	text-align: left;
	margin: 0.75rem 0 0.35rem;
	font-weight: 600;
	color: var(--color-text);
}
.content :deep(.p-button) {
	margin: 1rem auto 0;
}

@media (max-width: 650px) {
	.content {
		margin: 1rem;
		padding: 1.25rem;
	}
}
</style>
