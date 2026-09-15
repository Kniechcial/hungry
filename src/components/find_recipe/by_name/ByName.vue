<template>
	<div class="content">
		<label for="recipe">Dish name</label>
		<div class="card flex mt-3">
			<div class="flex flex-column p-3 gap-2">
				<InputText
					:class="{ 'p-invalid': displayError }"
					class="input-text"
					id="recipe"
					v-model="foodName"
					@keydown.enter="getRecipe"
					:feedback="false"
					aria-describedby="recipe-help" />
				<small
					id="recipe-help"
					class="description-input"
					>Enter name dish to find recipe.</small
				>
			</div>
		</div>
		<div class="button-box">
			<div class="card flex">
				<Button
					@click="toggleToGetRecipes"
					label="Find recipe" />
			</div>
		</div>
	</div>
	<div
		v-if="isLoadingLoader"
		class="loader">
		<CarrotLoader></CarrotLoader>
	</div>
	<Toast
		class="w-18rem md:w-4"
		position="top-right" />
</template>

<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Toast from "primevue/toast";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useTastyStore } from "../../../stores/tasty.js";
import CarrotLoader from "../../Reusable/CarrotLoader.vue";

const tastyStore = useTastyStore();
const router = useRouter();
const toast = useToast();
const foodName = ref(null);
const displayError = ref(false);
const isLoadingLoader = ref(false);

const NavigateToBaseRecipeList = () =>
	router.push({
		name: "RecipeList",
		query: {
			storeType: "tasty",
			headerMessage: "Your delicious recipes. Enjoy!",
			foodName: foodName,
			buttonType: true,
		},
	});

async function getRecipe() {
	isLoadingLoader.value = true;
	await tastyStore.getRecipes(0, 100, foodName.value);
	isLoadingLoader.value = false;

	if (foodName.value) {
		if (tastyStore.fetchedRecipes.length === 0) {
			showError();
			displayError.value = true;
		} else {
			NavigateToBaseRecipeList();
		}
	} else {
		showError();
	}
}
const toggleToGetRecipes = () => {
	getRecipe();
};

const showError = () => {
	toast.add({
		severity: "error",
		summary: "Error Message",
		detail: "Sorry, no results found. Try again ",
		life: 3000,
	});
};
</script>

<style scoped>
.content {
	border-radius: var(--radius-card);
	background-color: var(--color-surface);
	padding: 2rem;
	margin: 2rem auto;
	max-width: 30rem;
	box-shadow: var(--shadow-card);
	color: var(--color-text);
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}
.content label {
	font-weight: 600;
	font-size: 1rem;
}
.input-text {
	width: 100%;
}
.button-box {
	display: flex;
	justify-content: flex-end;
	margin-top: 0.75rem;
}
.description-input {
	color: var(--color-text-muted);
	font-style: italic;
}
.p-invalid {
	border-color: var(--color-danger) !important;
	background-color: rgba(158, 59, 52, 0.08);
}

@media (max-width: 650px) {
	.content {
		margin: 1rem;
		padding: 1.25rem;
	}
}
</style>
