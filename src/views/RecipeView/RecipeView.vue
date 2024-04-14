<template>
	<div class="carrot-box">
		<carrotDialog
			class="carrot"
			v-if="isLoading"></carrotDialog>
	</div>

	<div class="content">
		<div class="card flex justify-content-center">
			<div class="flex flex-column gap-2">
				<label for="recipe">Dish name</label>
				<InputText
					id="recipe"
					v-model="foodName"
					:feedback="false"
					aria-describedby="recipe-help" />
				<small id="recipe-help">Enter name dish to find recipe.</small>
			</div>
		</div>
	</div>
	<div class="button-box">
		<div class="card flex justify-content-center">
			<Button
				@click="getRecipe()"
				label="Find recipe" />
		</div>
	</div>

	<!-- <div v-if="recipesLoading">
		<ProgressSpinner />
	</div>
	<div v-else>
		<p>Nazwa Dania :</p>
		<div
			v-for="recipe in recipeStore.fetchedRecipes"
			:key="recipe.name">
			{{ recipe.name }}
		</div>
	</div> -->
</template>

<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useRecipeStore } from "../../stores/recipes.js";
import carrotDialog from "../RecipeView/New-recipe/carrotDialog.vue";
const foodName = ref(null);
const value = ref(null);
const recipeStore = useRecipeStore();
const recipesLoading = ref(false);
import { useRouter } from "vue-router";
const router = useRouter();
const BaseRecipeList = () => router.push({ name: "BaseRecipeList" });

const isLoading = ref(false);

async function getRecipe() {
	isLoading.value = true;
	await recipeStore.getRecipes(0, 2, foodName.value);
	console.log(recipeStore.fetchedRecipes);
	recipesLoading.value = false;

	BaseRecipeList();
}
</script>

<style scoped>
.content {
	position: relative;
	border: 1px solid black;
	border-radius: 10px;
	background-color: #faf8f7;
	padding: 1rem;
	margin-top: 10rem;
	width: max-content;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 22px;
}
.button-box {
	margin-left: 7rem;
}
.carrot {
	position: relative;
	left: 60%; /* Ustawienie odległości od lewej krawędzi na 50% */
	transform: translate(-50%, -50%);
	z-index: 1;
}
.carrot-box {
	position: relative;
	animation: moveUpDown 0.7s infinite alternate;
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
