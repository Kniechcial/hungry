<template>
	<Dialog
		class="dialog-class"
		v-model:visible="confirmRestorePassword"
		modal
		:style="{ width: '30rem' }"
		:breakpoints="{ '650px': '80vw' }"
		:closable="true"
		:dismissableMask="true"
		:showHeader="false"
		><div>
			<div class="card flex mt-3">
				<div class="flex flex-column p-3 gap-2">
					An email with a link to change your password has been sent.
				</div>
			</div>
		</div>
	</Dialog>

	<div class="content">
		<div>
			<img
				class="log-icon"
				:src="logIcon"
				alt="photo" />
		</div>
		<div class="card flex justify-content-center">
			<div class="flex flex-column gap-1">
				<p>E-mail:</p>
				<div class="card flex justify-content-center">
					<InputText
						:class="{ 'p-invalid': displayError }"
						v-model.trim="loginUser.email"
						@keydown.enter="toggleToLoginUser"
						type="text" />
				</div>
				<p>Password:</p>
				<div>
					<div class="card flex justify-content-center">
						<InputText
							:class="{
								'p-invalid': displayError,
							}"
							v-model.trim="loginUser.password"
							@keydown.enter="toggleToLoginUser"
							toggleMask
							type="password" />
					</div>
				</div>
			</div>
		</div>
		<div class="button-box">
			<div class="card relative inline-block cursor-pointer">
				<Button
					@click="toggleToLoginUser()"
					label="Login account"
					:disabled="!loginUser.email || !loginUser.password" />
			</div>
			<div
				v-if="displayError"
				class="card relative inline-block cursor-pointer">
				<Button
					label="Restore password"
					@click="toggleToRestorePassword()" />
			</div>
		</div>
	</div>
	<Toast
		class="w-18rem md:w-4"
		position="top-right" />
</template>

<script setup>
import { ref, reactive } from "vue";
import { useAuthStore } from "../../../stores/authStore.js";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import Dialog from "primevue/dialog";
import logIcon from "../../../assets/icon/log-icon.png";

const toast = useToast();
const authStore = useAuthStore();
const confirmRestorePassword = ref(false);

const displayError = ref(false);

const loginUser = reactive({
	email: "",
	password: "",
});

const toggleToLoginUser = async () => {
	if (!loginUser.email || !loginUser.password) {
		showError("Please enter email and password");
		return;
	}
	const response = await authStore.loginUser(loginUser);
	if (!response.result) {
		checkError(response.error);
	}
};

const toggleToRestorePassword = async () => {
	const email = loginUser.email;
	if (!email) {
		showError("Please enter your email");
		return;
	}
	await authStore.restorePassword(email);
	showConfirmRestore();
};

const checkError = (error) => {
	displayError.value = true;
	if (error === "auth/invalid-email" || error === "auth/invalid-credential") {
		showError("Invalid credential"), console.log(error);
	} else if (error === "auth/too-many-requests") {
		showError("Too many requests"), console.log(error);
	}
};

const showConfirmRestore = () => {
	confirmRestorePassword.value = true;
	setTimeout(() => {
		confirmRestorePassword.value = false;
	}, 3000);
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

.dialog-class {
	margin: 0;
	padding: 0;
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

.button-box {
	display: flex;
	justify-content: center;
	gap: 0.75rem;
	margin-top: 1.25rem;
	flex-wrap: wrap;
}

@media (max-width: 650px) {
	.content {
		margin: 1rem;
		padding: 1.25rem;
	}
}
</style>
