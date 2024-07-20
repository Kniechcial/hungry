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
					<div class="card flex justify-content-center">
						<InputText
							class="input-email"
							v-model.trim="loginUser.email"
							type="text"
							size="large" />
					</div>
				</div>

				<p>Password:</p>
				<div>
					<div class="card flex justify-content-center">
						<Password
							:feedback="false"
							v-model.trim="loginUser.password"
							toggleMask />
					</div>
				</div>
			</div>
		</div>
		<div class="button-box">
			<div class="card relative inline-block mr-5 mt-4 ml-5 cursor-pointer">
				<Button @click="logInUser()" label="Login" type:="submit"/>
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
const loginUser = reactive({
	email: "",
	password: "",
});

const logInUser = () => {
	if (!loginUser.email || !loginUser.password) {
		showErrorEmptyInput();
	} else {
		checkError();
		useAuthStore.loginUser(loginUser);
	}
};

const formatedErrorCode = computed(() => {
	switch (useAuthStore.errorMessage) {
		case "auth/invalid-email":
			return "Invalid email";
			break;
		case "auth/invalid-credential":
			return "Invalid credential";
			break;
		default:
			break;
	}
});
const checkError = () => {
	if (formatedErrorCode.value === "Invalid email") {
		showError();
	} else if (formatedErrorCode.value === "Invalid credential") {
		showError();
	}
};

const showErrorEmptyInput = () => {
	toast.add({
		severity: "error",
		summary: "Error Message",
		detail: "Please enter email and password",
		life: 3000,
	});
};
const showError = () => {
	toast.add({
		severity: "error",
		summary: "Error Message",
		detail: formatedErrorCode.value,
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
