<template>
	<div class="carrot-box">
		<carrotDialog
			class="carrot"
			v-if="isLoading"></carrotDialog>
	</div>
	<div class="content">
		<label for="recipe">Dish name</label>
		<div class="card flex mt-3">
			<div class="flex flex-column p-3 gap-2">
				<InputText
					id="recipe"
					style="width: 350px"
					v-model="foodName"
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
import carrotDialog from "@/components/reusable/carrotDialog.vue";
import { useRouter } from "vue-router";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { useRecipeStore } from "../../../stores/recipes.js";

const recipeStore = useRecipeStore();
const router = useRouter();
const foodName = ref(null);
const isLoading = ref(false);
const recipesLoading = ref(false);
const toast = useToast();

const BaseRecipeList = () => router.push({ name: "RecipeList" });

async function getRecipe() {
	isLoading.value = true;
	await recipeStore.getRecipes(0, 2, foodName.value);
	console.log(recipeStore.fetchedRecipes);
	recipesLoading.value = false;
	if (foodName) {
		if (recipeStore.fetchedRecipes.length === 0) {
			showError();
			isLoading.value = !isLoading.value;
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
	margin-top: 10rem;
	width: 30rem;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 22px;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	color: #44424d;
}
.button-box {
	margin-top: 2rem;
	margin-left: 18rem;
}
.carrot {
	position: absolute;
	left: 20%;
	transform: translate(-50%, -50%);
	z-index: 1;
}
.carrot-box {
	position: relative;
	animation: moveUpDown 0.7s infinite alternate;
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
</style>
