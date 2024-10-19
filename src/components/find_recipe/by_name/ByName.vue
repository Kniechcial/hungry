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
					@click="getRecipe()"
					label="Find recipe" />
			</div>
		</div>
	</div>
	<div
		v-if="isLoading"
		class="loader">
		<CarrotLoader></CarrotLoader>
	</div>
	<Toast />
</template>

<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Toast from "primevue/toast";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { tastyStore } from "../../../stores/tasty.js";
import CarrotLoader from "@/components/reusable/CarrotLoader.vue";

const useTastyStore = tastyStore();
const router = useRouter();
const toast = useToast();
const foodName = ref(null);
const displayError = ref(false);
const isLoading = ref(false);

const BaseRecipeList = () =>
	router.push({
		name: "RecipeList",
		query: {
			storeType: "tasty",
			headerMessage: "Your delicious recipes. Enjoy!",
			foodName: foodName,
		},
	});

async function getRecipe() {
	isLoading.value = true;
	await useTastyStore.getRecipes(0, 2, foodName.value);
	console.log(useTastyStore.fetchedRecipes);
	isLoading.value = false;

	if (foodName) {
		if (useTastyStore.fetchedRecipes.length === 0) {
			showError();
			displayError.value = true;
		} else {
			BaseRecipeList();
		}
	} else {
		showError();
	}
}

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
	position: relative;
	border: 1px solid;
	border-color: aliceblue;
	border-radius: 10px;
	background-color: #fcffff;
	padding: 1rem;
	margin-top: 12rem;
	width: calc(30rem - 2rem);
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 22px;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	color: #44424d;
}

.input-text {
	width: 350px;
	margin-bottom: 1rem;
}

.button-box {
	margin-top: 2rem;
	margin-left: 18rem;
}

.content label {
	padding: 1rem;
}

.description-input {
	font-style: italic;
}

.p-invalid {
	border-color: red;
	background-color: #fdd;
	box-shadow: rgba(255, 1, 1, 0.2) 0px 8px 24px;
}

@media (max-width: 650px) {
	.content {
		flex-direction: column;
		align-items: center;
		font-size: 14px;
		width: calc(100% - 2rem);
		max-width: 300px;
	}
	.button-box {
		scale: 0.8;
		margin-left: 7rem;
	}
	.input-text {
		width: 200px;
	}
}
</style>
