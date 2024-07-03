<template>
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
						<div class="card flex">
							<InputText
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
import { reactive, ref } from "vue";
import { authStore } from "../../../stores/authStore.js";
import Password from "primevue/password";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import logIcon from "../../../assets/icon/log-icon.png";

const useAuthStore = authStore();
const displayPasswordError = ref(false);
const displayEmailError = ref(false);

const newUser = reactive({
	id: Date.now(),
	email: "",
	password: "",
});

const addUser = () => {
	console.log("name", newUser.email);
	console.log("password", newUser.password);
	useAuthStore.registerUser(newUser);
};
</script>

<style scoped>
* {
	box-sizing: border-box;
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
