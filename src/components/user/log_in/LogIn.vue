<template>
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
					<div class="card flex">
						<InputText
							v-model.trim="loginUser.email"
							type="text"
							size="large" />
					</div>
				</div>

				<p>Password:</p>
				<div>
					<div class="card flex justify-content-center">
						<Password
							v-model.trim="loginUser.password"
							toggleMask />
					</div>
				</div>
			</div>
		</div>
		<div class="button-box">
			<div class="card relative inline-block mr-5 mt-4 ml-5 cursor-pointer">
				<!-- <Toast /> -->
				<Button @click="logInUser()" label="Login" type:="submit"/>
			</div>
			<!-- <div v-if="displayError">
				<p class="errorInput">Błędny email lub hasło!</p>
				<Button
					@click="restorePassword"
					label="Przywróć konto" />
			</div> -->
		</div>
	</div>
</template>

<script setup>
import { ref, reactive } from "vue";
import Password from "primevue/password";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import logIcon from "../../../assets/icon/log-icon.png";
import { authStore } from "../../../stores/authStore.js";

const useAuthStore = authStore();
const loginUser = reactive({
	email: "",
	password: "",
});

const logInUser = () => {
	if (!loginUser.email || !loginUser.password) {
		alert("Please enter email and password");
		return;
	} else useAuthStore.loginUser(loginUser);
};
</script>

<style scoped>
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
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
