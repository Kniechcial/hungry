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
							v-model.trim="inputEmail"
							type="text"
							size="large" />
					</div>
				</div>

				<p>Password:</p>
				<div>
					<div class="card flex justify-content-center">
						<Password
							v-model.trim="inputPassword"
							toggleMask />
					</div>
				</div>
			</div>
		</div>
		<div class="button-box">
			<div class="card relative inline-block mr-1 mt-4 ml-5 cursor-pointer">
				<Button
					label="Add account"
					@click="panelSingIn()" />
			</div>

			<div class="card relative inline-block mr-5 mt-4 ml-5 cursor-pointer">
				<Toast />
				<Button @click="logInUser()" label="Login" type:="submit"/>
			</div>
			<div v-if="displayError">
				<p class="errorInput">Błędny email lub hasło!</p>
				<Button
					@click="restorePassword"
					label="Przywróć konto" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import Password from "primevue/password";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
const toast = useToast();
import { useRouter } from "vue-router";
import logIcon from "../../../assets/icon/log-icon.png";

const router = useRouter();
const panelSingIn = () => router.push({ name: "singIn" });

const inputEmail = ref("");
const inputPassword = ref("");
const displayError = ref(false);
let correctPassword = true;
let correctEmail = false;

const checkEmail = () => {
	if (usersList.value.find((user) => user.name === inputEmail.value)) {
		checkPassword();
		correctEmail = true;
	} else {
		return (
			checkPassword(),
			(correctEmail = false),
			(displayError.value = true),
			// alert("Konto zarejestrowane na taki adres email nie istnieje!"),
			errorEmail()
		);
	}
};

const checkPassword = () => {
	if (usersList.value.find((user) => user.password === inputPassword.value)) {
		(correctPassword = true), (displayError.value = false), goToMainView();
	} else {
		return (
			(correctPassword = false),
			(displayError.value = true),
			// alert("Błędne hasło!"),
			errorPassword()
		);
	}
};
const goToMainView = () => {
	router.push({ name: "mainView" });
};

const logInUser = () => {
	console.log(inputEmail.value);
	const LogUser = { email: inputEmail.value, password: inputPassword.value };
	console.log(LogUser);
	checkEmail();

	if (correctEmail && correctPassword) {
		return alert("Zostałeś zalogowany!");
	}
};

const restorePassword = () => {
	router.push({ name: "restorePassword" });
};

const errorEmail = () => {
	toast.add({
		severity: "error",
		detail: "Konto zarejestrowane na taki adres email nie istnieje!",
		life: 3000,
	});
};

const errorPassword = () => {
	toast.add({
		severity: "error",
		detail: "Błędne hasło!",
		life: 6000,
	});
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
	/* font-size: large; */
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
