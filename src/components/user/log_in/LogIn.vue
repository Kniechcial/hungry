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
	border-color: red;
	background-color: #fdd;
	box-shadow: rgba(255, 1, 1, 0.2) 0px 8px 24px;
}

.dialog-class {
	margin: 0;
	padding: 0;
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
	justify-content: center;
	gap: 1rem;
}

.button-box .card {
	width: auto;
	margin: 0;
	padding-top: 1rem;
}

button {
	padding: 1rem;
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

.input-text {
	width: 17rem !important;
}

@media (max-width: 650px) {
	.content {
		flex-direction: column;
		align-items: center;
		font-size: 14px;
		width: calc(100% - 2rem);
		max-width: 300px;
		margin-bottom: 1rem;
		transform: translate(-50%, 5%);
	}

	.button-box {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;

		gap: 0.5rem;
	}

	.button-box .card {
		width: 45%;
	}

	.input-text {
		width: 200px;
	}

	p {
		padding-right: 0.5rem;
		padding-left: 0.5rem;
	}
}
</style>
