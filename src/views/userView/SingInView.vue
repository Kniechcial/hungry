<template>
	<body class="content">
		<div>
			<img
				class="log-icon"
				:src="logIcon"
				alt="Zdjęcie" />
		</div>
		<div class="card flex justify-content-center">
			<div class="flex flex-column gap-3">
				<p>Email:</p>
				<div>
					<div :class="{ redBorder: displayEmailError }">
						<div class="card flex">
							<InputText
								v-model.trim="inputEmail"
								type="text"
								size="large" />
						</div>
					</div>
					<span
						class="showError"
						v-if="displayEmailError"
						>BŁĘDNY ADRES EMAIL!</span
					>
				</div>
				<p>Hasło:</p>
				<div>
					<div :class="{ redBorder: displayPasswordError }">
						<div class="card flex justify-content-center">
							<Password
								v-model.trim="inputPassword"
								toggleMask />
						</div>
					</div>
					<span
						class="showError"
						v-if="displayPasswordError"
						>BŁĘDNE HASŁO!</span
					>
				</div>
				<p>Potwierdź hasło:</p>
				<div>
					<div :class="{ redBorder: displayPasswordError }">
						<div class="card flex justify-content-center">
							<Password
								v-model.trim="inputConfirmPassword"
								toggleMask />
						</div>
					</div>
					<span
						class="showError"
						v-if="displayPasswordError"
						>BŁĘDNE HASŁO!</span
					>
				</div>
			</div>
		</div>
		<div class="card flex justify-content-left mt-4 cursor-pointer">
			<Toast />
			<Button
				@click="requireConditions"
				label="Dodaj użytkownika" />
		</div>
		<!-- <div>
			<ul>
				<li
					v-for="user in userList"
					:key="userList.id">
					<span>{{ user.name }}</span>
				</li>
			</ul>
		</div> -->
	</body>
</template>

<script setup>
import { inject, ref, watch } from "vue";
import Password from "primevue/password";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { useRouter } from "vue-router";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import logIcon from "../../assets/icon/log-icon.png";

const router = useRouter();
const toast = useToast();

// import { useUserStore } from "../../stores/users";

// const userBase = useUserStore();
const displayPasswordError = ref(false);
const displayEmailError = ref(false);
let inputEmail = ref("");
let inputPassword = ref("");
let inputConfirmPassword = ref("");
let correctPassword = true;
let correctEmail = false;
let userList = ref([
	{ id: 1, name: "karol", password: "hasło" },
	{ id: 2, name: "Aneta", password: "hasło2" },
]);

const showError = () => {
	toast.add({
		severity: "error",
		detail: "Konto nie zostało dodane!",
		life: 3000,
	});
};

const showEmailEmptyError = () => {
	toast.add({
		severity: "error",
		detail: "Wprowadź adres email!",
		life: 6000,
	});
};
const showEmailExistError = () => {
	toast.add({
		severity: "error",
		detail: "Konto zarejestrowane na taki adres email już istnieje!",
		life: 6000,
	});
};

const showPasswordError = () => {
	toast.add({
		severity: "error",
		detail: "Błędne Hasła!",
		life: 6000,
	});
};

const checkEmail = () => {
	if (userList.value.find((email) => email.name === inputEmail.value)) {
		return (correctEmail = false), showEmailExistError();
	} else {
		if (inputEmail.value) {
			return (correctEmail = true), (displayEmailError.value = false);
		} else {
			return (correctEmail = false), showEmailEmptyError();
		}
	}
};

const checkPassword = () => {
	if (inputPassword.value === inputConfirmPassword.value) {
		if (inputPassword.value || inputConfirmPassword.value) {
			return (correctPassword = true), (displayPasswordError.value = false);
		} else {
			return (correctPassword = false), showPasswordError();
		}
	} else {
		return (correctPassword = false), showPasswordError();
	}
};

const addUser = () => {
	let newUser = {
		id: Date.now(),
		name: inputEmail.value,
		password: inputPassword.value,
	};
	userList.value.push(newUser);
	// userList.value.push(userBase.usersBaseStore);
	// console.log(userBase.usersBaseStore);
};

const requireConditions = () => {
	checkPassword();
	checkEmail();
	if (correctEmail) {
		if (correctPassword) {
			addUser();
			showSuccess();
			confirmpassword();
			displayPasswordError.value = false;
		} else {
			showError();
			displayPasswordError.value = true;
		}
	} else {
		showError();
		displayEmailError.value = true;
	}
};

const restorePassword = () => {
	router.push({ name: "restorePassword" });
};

const confirmpassword = () => {
	router.push({ name: "confirmpassword" });
};
</script>

<style scoped>
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}
.content {
	margin-top: 4rem;
	margin-left: 39%;
	margin-right: 39%;
	padding: 1rem;
	border-radius: 1rem;
	border: 1px solid black;
	background-color: #f6f7f9;
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
	padding-left: 1rem;
	padding-right: 1rem;
	padding-top: 0.5rem;
	padding-bottom: 0.6rem;
}
.log-icon {
	margin-top: 2.5rem;
	position: relative;
	margin-bottom: -5rem;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
</style>
