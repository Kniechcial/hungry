<template>
	<body>
		<div class="content">
			<p class="inputDescription">
				Wprowadź adres email, na którym było założone konto.
			</p>
			<div class="card flex justify-content-center">
				<div class="flex flex-column gap-3">
					<div class="card flex">
						<InputText
							v-model.trim="inputEmail"
							type="text"
							placeholder="Email"
							size="large" />
					</div>
				</div>
			</div>
			<div class="card flex ml-8 mt-4 cursor-pointer">
				<Toast />
				<Button
					@click="checkEmail()"
					label="Przywróć konto" />
			</div>
		</div>
	</body>
</template>

<script setup>
import { ref, watch } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { useRouter } from "vue-router";

const router = useRouter();
const panelSingIn = () => router.push({ name: "singIn" });

const inputEmail = ref("");
const displayError = ref(false);
let correctEmail = false;
let userList = ref([
	{ id: 1, name: "karol", password: "hasło" },
	{ id: 2, name: "Aneta", password: "hasło2" },
]);

const checkEmail = () => {
	if (userList.value.find((email) => email.name === inputEmail.value)) {
		displayError.value = false;
		confirmRestorePassword();
	} else {
		return (
			(correctEmail = false),
			(displayError.value = true),
			alert("Konto zarejestrowane na taki adres email nie istnieje!")
		);
	}
};
const confirmRestorePassword = () => {
	router.push({ name: "confirmRestorePassword" });
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
	margin-top: 4rem;
	border-radius: 1rem;
	background-color: #f6f7f9;
	padding: 1rem;
	margin-left: 39%;
	margin-right: 39%;
}
.inputDescription {
	width: 100%;
	font-size: large;
	margin-bottom: 1rem;
}
</style>
