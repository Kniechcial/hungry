<template>
	<div class="container">
		<div class="recipe-box">
			<div class="left-side-bar">
				<div class="input-conteiner">
					<label class="label"><strong>Wprowadź nazwę dania:</strong></label>
				</div>
				<div class="input">
					<div class="card">
						<InputText
							id="dishName"
							v-model.trim="dishName"
							placeholder="Nazwa dania" />
					</div>
					<span
						class="showError"
						v-if="errorDishName"
						>Nazwa nie może być pusta!</span
					>
				</div>
				<div class="input-conteiner">
					<label class="label"><strong>Składniki:</strong></label>
				</div>
				<div class="input">
					<div class="card">
						<MultiSelect
							v-model="Ingridient"
							:options="Ingridients"
							filter
							optionLabel="name"
							placeholder="Wybierz składniki"
							:maxSelectedLabels="3"
							class="w-full md:w-20rem" />
					</div>
					<span
						class="showError"
						v-if="errorIngridients"
						>Składniki muszą zostać wybrane!</span
					>
				</div>
				<div class="input-conteiner">
					<label class="label"><strong>Wklej link do zdjęcia:</strong></label>
				</div>
				<div class="input">
					<div class="card">
						<InputText
							id="adresURL"
							v-model="adresURL"
							placeholder="Link..." />
					</div>
				</div>
			</div>
			<div class="right-side-bar">
				<div class="input-conteiner">
					<label class="label"><strong>Wprowadź tagi:</strong></label>
				</div>
				<div class="input">
					<div class="card">
						<MultiSelect
							v-model="Tag"
							:options="Tags"
							filter
							optionLabel="name"
							placeholder="Oznacz danie"
							:maxSelectedLabels="3"
							class="w-full md:w-20rem" />
					</div>
				</div>
				<div class="input-conteiner">
					<label class="label"
						><strong>Czy chcesz wprowadzić kalorie do potrawy?</strong></label
					>
				</div>
				<div class="card pt-2">
					<SelectButton
						v-model="isNutrition"
						:options="isNutritionOptions"
						option-label="label"
						option-value="value"
						aria-labelledby="basic" />
				</div>
			</div>
			<div class="center-bar">
				<div class="input-conteiner">
					<label class="label"
						><strong>Podaj plan przygotowania dania:</strong></label
					>
					<div class="input">
						<div class="card">
							<form @submit="onSubmit">
								<div class="card flex justify-content-center">
									<Textarea
										v-model="description"
										autoResize
										rows="10"
										cols="90" />
								</div>
							</form>
							<span
								class="showError"
								v-if="errorDescription"
								>Opis dania musi zostać podany!</span
							>
						</div>
					</div>
				</div>
			</div>
			<div class="down-bar">
				<div class="button-location">
					<div class="card">
						<Toast />
						<Button
							type="button"
							label="Dodaj przepis"
							icon="pi pi-check"
							:loading="loading"
							@click="load" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import InputText from "primevue/inputtext";
import SelectButton from "primevue/selectbutton";
import MultiSelect from "primevue/multiselect";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const toast = useToast();
const CreateRecipeStepTwo = () => router.push({ name: "CreateRecipeStepTwo" });
const dishName = ref(null);
const adresURL = ref(null);
const description = ref();

const newRecipe = ref({});

const Ingridients = ref([
	{ name: "Chicken" },
	{ name: "Tomato" },
	{ name: "Cheese" },
	{ name: "Butter" },
	{ name: "Bread" },
]);

const Tags = ref([
	{ name: "Chicken" },
	{ name: "Tomato" },
	{ name: "Cheese" },
	{ name: "Butter" },
	{ name: "Bread" },
]);

const errorDishName = ref(false);
const errorIngridients = ref(false);
const errorDescription = ref(false);

const Tag = ref();
const Ingridient = ref();
const isNutrition = ref(false);
const isNutritionOptions = ref([
	{ label: "NO", value: false },
	{ label: "YES", value: true },
]);

const loading = ref(false);

const checkDishName = () => {
	if (!dishName.value) {
		errorDishName.value = true;
	}
};
const checkIngridients = () => {
	if (!Ingridient.value) {
		errorIngridients.value = true;
	}
};
const checkDescription = () => {
	if (!description.value) {
		errorDescription.value = true;
	}
};

const load = () => {
	checkDishName();
	checkDescription();
	checkIngridients();
	if (dishName.value && Ingridient.value && description.value) {
		loading.value = true;
		setTimeout(() => {
			loading.value = false;
		}, 2000);
		newRecipe.value = {
			name: dishName.value,
			ingridients: Ingridient.value,
			calories: isNutrition.value,
			tag: Tag.value,
			description: description.value,
			url: adresURL.value,
		};
		console.log(newRecipe.value);
		CreateRecipeStepTwo();
	} else {
		showError();
	}
};
const showError = () => {
	toast.add({
		severity: "error",
		detail: "Danie nie zostało dodane!",
		life: 3000,
	});
};
</script>
<style scoped>
.container {
	display: block;
	margin-left: auto;
	margin-right: auto;
	margin-top: 2rem;
	max-width: 65rem;
	width: 100%;
	color: #261474;
}
.recipe-box {
	position: relative;
	display: flex;
	flex-wrap: wrap;
	overflow: auto;
	max-width: 65rem;
	border: 1px solid black;
	border-radius: 10px;
	background-color: #faf8f7;
	padding: 1rem;
}
.left-side-bar {
	width: 50%;
	float: left;
}
.right-side-bar {
	width: 50%;
	float: right;
}
.center-bar {
	margin-left: auto;
	margin-right: auto;
}
.down-bar {
	width: 100%;
	position: relative;
	margin-top: 1rem;
}
.input-conteiner {
	padding: 1rem;
	/* border: 2px solid blue; */
}
.label {
	text-align: center;
	margin-bottom: 0.5rem;
	width: auto;
}
.input {
	width: 100%;
	padding: 0.5rem;
	box-sizing: border-box;
	font-style: italic;
}

.button-location {
	float: right;
}

/* Błędy */

.showError {
	color: red;
	font-size: 12px;
	font-weight: bold;
}
</style>
