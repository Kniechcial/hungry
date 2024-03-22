<template>
	<body class="content">
		<p class="inputDescription">
			Na podany adres email: ADRES EMAIL wysłalismy link z kodem aktywacyjnym.
			wprowadź poniżej kod żeby dokończyć proces rejestracji.
		</p>
		<div class="card flex justify-content-center">
			<div class="card flex mt-4 mr-2">
				<InputText
					v-model.trim="inputCode"
					type="number"
					placeholder=" WPROWADŹ KOD"
					size="large" />
			</div>
			<div class="card flex justify-content-center mt-4 cursor-pointer">
				<Toast />
				<Button
					@click="Console()"
					label="Potwierdź Kod" />
			</div>
		</div>
		<p
			v-if="!correctCode"
			class="showError">
			BŁĘDNY KOD!
		</p>
	</body>
</template>
<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Toast from "primevue/toast";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

const router = useRouter();
const toast = useToast();

const inputCode = ref("");
// let validateCode = ref(null);
const validateCode = ref("1");
const correctCode = ref(true);

const showSuccess = () => {
	toast.add({
		severity: "success",
		detail: "Konto odzyskane! Zmień hasło",
		life: 3000,
	});
};

const showError = () => {
	toast.add({
		severity: "error",
		detail: "Konto nie zostało odzyskane!",
		life: 3000,
	});
};

const Console = () => {
	console.log(inputCode.value);
	// generateCode();
	checkValidateCode();
};

// const generateCode = () => {
// 	const min = 1000000000;
// 	const max = 9999999999;
// 	validateCode.value = Math.floor(Math.random() * (max - min + 1)) + min;
// 	console.log(validateCode.value);
// };

const checkValidateCode = () => {
	if (validateCode.value === inputCode.value) {
		showSuccess();
		goToEditPassword();
		correctCode.value = true;
	} else {
		correctCode.value = false;
		showError();
	}
};

const goToEditPassword = () => {
	router.push({ name: "editPassword" });
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
	border-radius: 1rem;
	background-color: #f6f7f9;
	padding: 1rem;
	margin-left: 30%;
	margin-right: 30%;
}
.showError {
	color: red;
	font-weight: bold;
	margin-top: 1rem;
}
.inputDescription {
	width: 100%;
	font-size: large;
	margin-bottom: 1rem;
}
</style>
