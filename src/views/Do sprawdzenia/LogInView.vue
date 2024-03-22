<template>
	<form @submit.prevent="submitData">
		<body>
			<div class="content">
				<div class="card flex justify-content-center">
					<div class="flex flex-column gap-3">
						<p>Email:</p>
						<div>
							<div class="card flex">
								<InputText
									v-model.trim="inputEmail"
									type="text"
									size="large" />
							</div>
						</div>

						<p>Hasło:</p>
						<div>
							<div class="card flex justify-content-center">
								<Password
									v-model="inputPassword"
									toggleMask />
							</div>
						</div>
					</div>
				</div>
				<div class="card relative inline-block mt-4 mr-7 ml-2 cursor-pointer">
					<Button
						label="Załóż konto"
						@click="panelSingIn()" />
				</div>
				<div class="card relative inline-block mt-4 ml-7 cursor-pointer">
					<Button @click="logInUser()" label="Zaloguj" type:="submit"/>
				</div>
				<!-- <p
					v-if="!correctInputs"
					class="errorInput">
					Błędny email lub hasło!
				</p> -->
			</div>
		</body>
	</form>

	<!-- <div class="card flex justify-content-center mt-4 cursor-pointer">
		<Button
			@click="getRecipe()"
			severity="success"
			label="Get idea"
			icon="pi pi-cloud-download"
			icon-pos="right"
			class="w-12rem"></Button>
	</div> -->
	<!-- <div>
		{{ ideasStore.idea?.activity }}
	</div> -->
</template>

<script setup>
import { ref, watch } from "vue";
import Password from "primevue/password";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { useRouter } from "vue-router";

// import { useIdeasStore } from "../stores/ideas";
// const value = ref(null);
// const foodName = ref(null);

const router = useRouter();
const panelSingIn = () => router.push({ name: "singIn" });

const inputEmail = ref("");
const inputPassword = ref("");
let correctPassword = true;
let correctEmail = false;
let userList = ref([
	{ id: 1, name: "karol", password: "hasło" },
	{ id: 2, name: "Aneta", password: "hasło2" },
]);

// const ideasStore = useIdeasStore();
// async function getRecipe() {
// 	ideasStore.getRecipes(0, 5, foodName.value);
// }

const logInUser = () => {
	const LogUser = { email: inputEmail.value, password: inputPassword.value };
	console.log(LogUser);
	checkEmail();

	if (correctEmail && correctPassword) {
		return alert("Zostałeś zalogowany!");
	}
};

const checkEmail = () => {
	if (userList.value.find((email) => email.name === inputEmail.value)) {
		checkPassword();
	} else {
		return (
			(correctEmail = false),
			alert("Konto zarejestrowane na taki adres email nie istnieje!")
		);
	}
};

const checkPassword = () => {
	if (userList.value.find((email) => email.password === inputPassword.value)) {
		return (correctPassword = true), (correctEmail = true);
	} else {
		return (correctPassword = false), alert("Błędne hasło!");
	}
};
</script>

<style scoped>
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}
.errorInput {
	margin-top: 1rem;
	margin-left: 40%;
	color: red;
}
.content {
	margin-top: 4rem;
	border-radius: 1rem;
	background-color: #f6f7f9;
	padding: 1rem;
	margin-left: 39%;
	margin-right: 39%;
}
</style>

<!-- Trim function
Wyświetlenie błędu
-->
