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
								v-model.trim="newUser.password"
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
		<div class="card flex justify-content-left mt-4 cursor-pointer">
			<Button
				@click="addUser()"
				label="Add User" />
		</div>
	</div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
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
const toast = useToast();

const newUser = reactive({
	id: Date.now(),
	email: "",
	password: "",
});

const addUser = () => {
	checkError();
	console.log("name", newUser.email);
	console.log("password", newUser.password);
	useAuthStore.registerUser(newUser);
};

const formatedErrorCode = computed(() => {
	switch (useAuthStore.errorMessage) {
		case "auth/email-already-in-use":
			return "Email already in use";
			break;
		case "auth/missing-email":
			return "Missing email";
			break;
		case "auth/weak-password":
			return "Weak password";
			break;
		case "auth/missing-password":
			return "Missing password";
			break;
		default:
			break;
	}
});
const checkError = () => {
	if (
		formatedErrorCode.value === "Email already in use" ||
		formatedErrorCode.value === "Missing email"
	) {
		return (
			(displayEmailError.value = true),
			(displayPasswordError.value = false),
			showError(),
			console.log(displayEmailError.value)
		);
	} else if (
		formatedErrorCode.value === "Weak password add more characters" ||
		formatedErrorCode.value === "Missing password"
	) {
		return (
			(displayPasswordError.value = true),
			(displayEmailError.value = false),
			showError(),
			console.log(displayPasswordError.value),
			(formatedErrorCode.value = null)
		);
	}
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
.showError {
	color: red;
	font-weight: bold;
}
.redBorder {
	border: 3px solid red;
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
