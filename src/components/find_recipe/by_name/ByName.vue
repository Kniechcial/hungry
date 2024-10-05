<template>
	<div class="content">
		<label for="recipe">Dish name</label>
		<div class="card flex mt-3">
			<div class="flex flex-column p-3 gap-2">
				<InputText
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

const emit = defineEmits(["setLoading"]);
const useTastyStore = tastyStore();
const router = useRouter();
const foodName = ref(null);
const toast = useToast();

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
	emit("setLoading");
	await useTastyStore.getRecipes(0, 2, foodName.value);
	console.log(useTastyStore.fetchedRecipes);
	if (foodName) {
		if (useTastyStore.fetchedRecipes.length === 0) {
			showError();
			emit("setLoading");
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
	width: 30rem;
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
@keyframes moveUpDown {
	from {
		top: 0;
	}
	to {
		top: 20px;
	}
}
/* @media (max-width: 1250px) {
	.content {
		flex-direction: column;
		align-items: center;
		font-size: 12px;
		width: 100%;
		max-width: none;
		margin: 1rem 0;
	}
	.input-text {
		width: 230px;
	}
	.button-box {
		scale: 0.7;
		margin-left: 8rem;
	}
} */
@media (max-width: 650px) {
	.content {
		flex-direction: column;
		align-items: center;
		font-size: 14px;
		width: 100%;
		max-width: 300px;
	}
	.button-box {
		margin-left: 8rem;
		scale: 0.9;
	}
	.input-text {
		width: 230px;
	}
}
</style>
