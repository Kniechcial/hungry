<template>
	<Dialog
		class="recipe-dialog"
		v-model:visible="recipeVisible"
		modal
		:style="{ width: '70rem' }"
		:breakpoints="{ '900px': '92vw' }"
		:closable="true"
		:dismissableMask="true"
		@setVisible="setVisible()"
		:showHeader="false">
		<RecipeDetails
			:recipe="activeRecipe"
			@setVisible="setVisible(false)"></RecipeDetails>
	</Dialog>

	<Dialog
		class="confirm-delete-dialog"
		v-model:visible="confirmDeleteRecipe"
		modal
		:style="{ width: '28rem' }"
		:breakpoints="{ '650px': '80vw' }"
		:closable="true"
		:dismissableMask="true"
		header="Delete recipe">
		<p class="confirm-body">
			Are you sure you want to remove
			<strong>{{ activeRecipe?.name || "this recipe" }}</strong> from your book?
		</p>
		<div class="confirm-actions">
			<Button
				severity="secondary"
				outlined
				label="Cancel"
				@click="confirmDeleteRecipe = false" />
			<Button
				severity="danger"
				icon="pi pi-trash"
				label="Delete"
				@click="handlerDeleteRecipe(activeRecipe)" />
		</div>
	</Dialog>

	<section class="results">
		<h2 class="results-title">{{ headerMessage }}</h2>
		<p
			v-if="fetchedRecipes.length"
			class="results-subtitle">
			{{ fetchedRecipes.length }}
			{{ fetchedRecipes.length === 1 ? "recipe" : "recipes" }} saved
		</p>

		<ul
			v-if="fetchedRecipes.length"
			class="recipe-grid">
			<li
				v-for="(recipe, index) in fetchedRecipes"
				:key="index"
				class="recipe-card">
				<div
					class="recipe-thumb"
					:style="recipeBackground(recipe)"
					@click="showRecipe(recipe)">
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
					<div class="recipe-actions">
						<Button
							@click="showRecipe(recipe)"
							label="Open"
							icon="pi pi-chevron-right"
							icon-pos="right" />
						<Button
							icon="pi pi-trash"
							severity="danger"
							outlined
							aria-label="Delete recipe"
							@click="showConfirmDeleteRecipe(recipe)" />
					</div>
				</div>
			</li>
		</ul>

		<div
			v-else
			class="empty-state">
			<i class="pi pi-book empty-icon"></i>
			<h3 class="empty-title">Your book is empty</h3>
			<p class="empty-text">
				Save recipes you find, or write your own — they'll show up here.
			</p>
			<div class="empty-actions">
				<Button
					@click="addFirstRecipe()"
					label="Find a recipe"
					icon="pi pi-search"
					outlined />
				<Button
					@click="createOwnRecipe()"
					label="Create your own"
					icon="pi pi-plus" />
			</div>
		</div>

		<Toast
			class="w-18rem md:w-4"
			position="top-right" />
	</section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import RecipeDetails from "../find_recipe/recipe_details/RecipeDetails.vue";
import { useRecipesStore } from "../../stores/recipesStore.js";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const router = useRouter();
const route = useRoute();
const recipesStore = useRecipesStore();
const recipeVisible = ref(false);
const confirmDeleteRecipe = ref(false);
const activeRecipe = ref(null);

const headerMessage = ref(
	route.query.headerMessage || "Your delicious recipes. Enjoy!"
);

const showConfirmDeleteRecipe = (recipe) => {
	activeRecipe.value = recipe;
	confirmDeleteRecipe.value = true;
};

const fetchedRecipes = computed(() => recipesStore.userRecipes);

const addFirstRecipe = () =>
	router.push({ name: "FindRecipe", params: { findBy: "name" } });

const createOwnRecipe = () => router.push({ name: "CreateRecipe" });

const showRecipe = (recipe) => {
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

const handlerDeleteRecipe = async (recipe) => {
	try {
		await recipesStore.deleteRecipe(recipe);
		confirmDeleteRecipe.value = false;
		showSuccess();
	} catch (error) {
		console.error(error);
	}
};

const showSuccess = () => {
	toast.add({
		severity: "success",
		detail: "The recipe has been deleted.",
		life: 2500,
	});
};

onMounted(() => {
	recipesStore.addRecipesListener();
});
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
	cursor: pointer;
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
	gap: 0.75rem;
	flex: 1;
}
.recipe-name {
	font-family: var(--font-heading);
	font-weight: 600;
	font-size: 1.125rem;
	margin: 0;
	line-height: 1.3;
}
.recipe-actions {
	display: flex;
	gap: 0.5rem;
	margin-top: auto;
}
.recipe-actions :deep(.p-button):first-child {
	flex: 1;
}

.empty-state {
	max-width: 32rem;
	margin: 2rem auto;
	padding: 2.5rem 2rem;
	text-align: center;
	background: var(--color-surface);
	border-radius: var(--radius-card);
	box-shadow: var(--shadow-card);
	color: var(--color-text);
}
.empty-icon {
	font-size: 2.75rem;
	color: var(--color-primary);
	margin-bottom: 0.75rem;
	display: block;
}
.empty-title {
	font-family: var(--font-heading);
	font-weight: 600;
	font-size: 1.5rem;
	margin: 0 0 0.5rem;
}
.empty-text {
	color: var(--color-text-muted);
	margin: 0 0 1.5rem;
	line-height: 1.55;
}
.empty-actions {
	display: flex;
	gap: 0.75rem;
	justify-content: center;
	flex-wrap: wrap;
}

.confirm-body {
	margin: 0 0 1.25rem;
	line-height: 1.55;
}
.confirm-actions {
	display: flex;
	justify-content: flex-end;
	gap: 0.75rem;
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
