<template>
	<div class="content">
		<div class="card flex justify-content-center">
			<div class="flex flex-column gap-2">
				<label for="recipe">Name dish</label>
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
	<!-- <div>{{ recipeStore.recipe.nutrition }}</div> -->
	<div>
		<!-- {{ recipeStore.recipe?.results.name }} -->
	</div>
	<div v-if="recipesLoading">
		<ProgressSpinner />
	</div>
	<div v-else>
		<p>Nazwa Dania :</p>
		<div
			v-for="recipe in recipeStore.fetchedRecipes"
			:key="recipe.name">
			{{ recipe.name }}
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useRecipeStore } from "../../stores/recipes.js";
import ProgressSpinner from "primevue/progressspinner";
const foodName = ref(null);
const value = ref(null);
const recipeStore = useRecipeStore();
const recipesLoading = ref(false);
import { useRouter } from "vue-router";
const router = useRouter();
const RecipeList = () => router.push({ name: "RecipeList" });
const BaseRecipeList = () => router.push({ name: "BaseRecipeList" });

async function getRecipe() {
	recipesLoading.value = true;
	await recipeStore.getRecipes(0, 2, foodName.value);
	console.log(recipeStore.fetchedRecipes);
	recipesLoading.value = false;
	// RecipeList();
	BaseRecipeList();
}
</script>

<style scoped>
.content {
	margin-top: 15rem;
}
.button-box {
	margin-top: 2rem;
	margin-left: 7rem;
}
</style>
