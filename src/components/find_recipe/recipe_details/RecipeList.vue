<template>
	<Dialog
		class="recipe-dialog"
		v-model:visible="recipeVisible"
		modal
		:style="{ width: '70rem' }"
		:breakpoints="{ '900px': '92vw' }"
		:closable="true"
		:dismissableMask="true"
		:showHeader="false">
		<RecipeDetails
			:recipe="activeRecipe"
			@setVisible="setVisible(false)"></RecipeDetails>
	</Dialog>

	<section class="results">
		<h2 class="results-title">{{ headerMessage }}</h2>
		<p class="results-subtitle">
			{{ visibleRecipes.length }} of {{ fetchedRecipes.length }} shown
		</p>

		<ul class="recipe-grid">
			<li
				v-for="(recipe, index) in visibleRecipes"
				:key="index"
				class="recipe-card"
				@click="toggleToShowRecipe(recipe)">
				<div
					class="recipe-thumb"
					:style="recipeBackground(recipe)">
					<span
						v-if="recipe.Time"
						class="time-badge">
						<i class="pi pi-clock"></i>
						{{ recipe.Time }} min
					</span>
				</div>
				<div class="recipe-body">
					<h3 class="recipe-name">
						{{ recipe.name || "Unnamed recipe" }}
					</h3>
					<span class="recipe-cta">
						Show recipe
						<i class="pi pi-arrow-right"></i>
					</span>
				</div>
			</li>
		</ul>

		<div class="results-actions">
			<Button
				v-if="buttonType && visibleRecipes.length < fetchedRecipes.length"
				@click="toggleToLoadMoreRecipes"
				label="Show five more"
				icon="pi pi-chevron-down" />
			<Button
				v-if="!buttonType"
				@click="navigateToRandomRecipe()"
				label="Try another recipe"
				icon="pi pi-refresh" />
		</div>
	</section>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useTastyStore } from "../../../stores/tasty.js";
import { storeToRefs } from "pinia";
import router from "@/router";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import RecipeDetails from "./RecipeDetails.vue";

const tastyStore = useTastyStore();
const route = useRoute();
const { fetchedRecipes } = storeToRefs(tastyStore);
const buttonType = ref(route.query.buttonType === "true");
const recipeVisible = ref(false);
const activeRecipe = ref(null);
const visibleRecipes = ref([]);
const currentIndex = ref(5);

const headerMessage = ref(
	route.query.headerMessage || "Your five delicious recipes. Enjoy!"
);

const navigateToRandomRecipe = () => {
	router.push({
		name: "FindRecipe",
		params: { findBy: "random" },
	});
};

const toggleToLoadMoreRecipes = () => {
	const nextRecipes = fetchedRecipes.value.slice(
		currentIndex.value,
		currentIndex.value + 5
	);
	visibleRecipes.value.push(...nextRecipes);
	currentIndex.value += 5;
};

if (fetchedRecipes.value.length > 0) {
	visibleRecipes.value = fetchedRecipes.value.slice(0, 5);
}

const toggleToShowRecipe = (recipe) => {
	recipeVisible.value = true;
	activeRecipe.value = recipe;
};
const setVisible = (visible) => {
	recipeVisible.value = visible;
};

const recipeBackground = (recipe) => {
	if (!recipe?.image) {
		return { background: "var(--color-surface-alt)" };
	}
	return { backgroundImage: `url(${recipe.image})` };
};
</script>

<style scoped>
.results {
	max-width: 64rem;
	margin: 2rem auto;
	padding: 0 1rem 3rem;
}

.results-title {
	font-family: var(--font-heading);
	font-weight: 600;
	font-size: clamp(1.5rem, 3vw, 2rem);
	color: var(--color-text);
	margin: 0;
	text-align: center;
}
.results-subtitle {
	text-align: center;
	color: var(--color-text-muted);
	margin: 0.25rem 0 1.75rem;
	font-size: 0.9375rem;
}

.recipe-grid {
	list-style: none;
	padding: 0;
	margin: 0;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
	gap: 1.25rem;
}

.recipe-card {
	background: var(--color-surface);
	color: var(--color-text);
	border-radius: var(--radius-card);
	box-shadow: var(--shadow-card);
	overflow: hidden;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.recipe-card:hover {
	transform: translateY(-4px);
	box-shadow: 0 12px 28px rgba(58, 42, 32, 0.18);
}

.recipe-thumb {
	position: relative;
	height: 170px;
	background-size: cover;
	background-position: center;
	background-color: var(--color-surface-alt);
}
.time-badge {
	position: absolute;
	inset: auto 0.75rem 0.75rem auto;
	display: inline-flex;
	align-items: center;
	gap: 0.35rem;
	background: rgba(58, 42, 32, 0.85);
	color: #fff;
	font-size: 0.8125rem;
	font-weight: 600;
	padding: 0.3rem 0.65rem;
	border-radius: 999px;
}

.recipe-body {
	padding: 1rem 1.15rem 1.25rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	flex: 1;
}
.recipe-name {
	font-family: var(--font-heading);
	font-weight: 600;
	font-size: 1.125rem;
	margin: 0;
	line-height: 1.3;
}
.recipe-cta {
	display: inline-flex;
	align-items: center;
	gap: 0.35rem;
	color: var(--color-primary);
	font-weight: 600;
	font-size: 0.9375rem;
	margin-top: auto;
}

.results-actions {
	display: flex;
	justify-content: center;
	margin-top: 2rem;
}

@media (max-width: 640px) {
	.results {
		padding: 0 0.75rem 2rem;
	}
	.recipe-thumb {
		height: 150px;
	}
}
</style>
