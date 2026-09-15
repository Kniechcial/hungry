<template>
	<div class="ingredients-page">
		<div class="panel">
			<h3 class="panel-title">Add an ingredient</h3>
			<p class="panel-hint">
				Type what you've got in the fridge — up to five ingredients — then find a
				dish that uses them.
			</p>
			<div class="input-row">
				<InputText
					id="ingredient"
					v-model="ingredientName"
					class="input"
					placeholder="e.g. tomato"
					@keydown.enter="getChosedIngredient" />
				<Button
					label="Add"
					icon="pi pi-plus"
					@click="getChosedIngredient" />
			</div>
		</div>

		<div class="panel">
			<h3 class="panel-title">Your ingredients</h3>
			<p
				v-if="userChosed.length === 0"
				class="panel-hint">
				Nothing selected yet. Add ingredients on the left — click a pill to
				remove it.
			</p>
			<div
				v-else
				class="chip-list">
				<span
					v-for="(ingredient, index) in userChosed"
					:key="index"
					class="chip"
					role="button"
					@click="toggleToDeleteSelectedIngredient(index)"
					:title="`Remove ${ingredient}`">
					{{ ingredient }}
					<i class="pi pi-times chip-remove"></i>
				</span>
			</div>
			<div class="panel-actions">
				<span class="chip-count">{{ userChosed.length }} / 5</span>
				<Button
					:disabled="disabledButtonFindRecipe"
					@click="toggleToGetRecipes"
					label="Find recipes"
					icon="pi pi-search" />
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
	</div>
</template>

<script setup>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Toast from "primevue/toast";
import { ref, computed } from "vue";
import { useTastyStore } from "../../../stores/tasty.js";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

import CarrotLoader from "../../Reusable/CarrotLoader.vue";

const tastyStore = useTastyStore();
const router = useRouter();
const toast = useToast();

const userChosed = ref([]);
const foodName = ref(null);
const ingredientName = ref("");
const isLoadingLoader = ref(false);

const getChosedIngredient = () => {
	const value = ingredientName.value.trim();
	if (!value) {
		showErrorEmptyInput();
		ingredientName.value = "";
		return;
	}
	if (userChosed.value.length >= 5) {
		showErrorOverFiveElements();
		return;
	}
	const duplicate = userChosed.value.some(
		(item) => item.toLowerCase() === value.toLowerCase()
	);
	if (duplicate) {
		showErrorItemExist();
	} else {
		userChosed.value.push(value);
	}
	ingredientName.value = "";
};

const toggleToDeleteSelectedIngredient = (index) => {
	userChosed.value.splice(index, 1);
};

const disabledButtonFindRecipe = computed(
	() => userChosed.value.length === 0
);

const NavigateToBaseRecipeList = () =>
	router.push({
		name: "RecipeList",
		query: {
			storeType: "tasty",
			foodName: foodName.value,
			buttonType: true,
		},
	});

const toggleToGetRecipes = () => {
	getRecipe();
};

async function getRecipe() {
	isLoadingLoader.value = true;
	const selectedIngredients = userChosed.value.join(",");
	await tastyStore.getRecipes(0, 100, selectedIngredients);
	foodName.value = selectedIngredients;
	isLoadingLoader.value = false;

	if (tastyStore.fetchedRecipes.length === 0) {
		showError();
	} else {
		NavigateToBaseRecipeList();
	}
}

const showErrorItemExist = () => {
	toast.add({
		severity: "warn",
		detail: "This ingredient is already on the list.",
		life: 2500,
	});
};
const showErrorOverFiveElements = () => {
	toast.add({
		severity: "warn",
		detail: "You can add up to five ingredients.",
		life: 2500,
	});
};
const showErrorEmptyInput = () => {
	toast.add({
		severity: "warn",
		detail: "Type an ingredient name first.",
		life: 2500,
	});
};
const showError = () => {
	toast.add({
		severity: "error",
		detail: "Sorry, no results. Try different ingredients.",
		life: 3000,
	});
};
</script>

<style scoped>
.ingredients-page {
	max-width: 60rem;
	margin: 2rem auto;
	padding: 0 1rem;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	gap: 1.25rem;
}

.panel {
	background: var(--color-surface);
	color: var(--color-text);
	border-radius: var(--radius-card);
	box-shadow: var(--shadow-card);
	padding: 1.5rem 1.5rem 1.25rem;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

.panel-title {
	font-family: var(--font-heading);
	font-weight: 600;
	font-size: 1.25rem;
	margin: 0;
}

.panel-hint {
	color: var(--color-text-muted);
	margin: 0;
	line-height: 1.5;
}

.input-row {
	display: flex;
	gap: 0.5rem;
	align-items: center;
	margin-top: 0.5rem;
	flex-wrap: wrap;
}
.input {
	flex: 1;
	min-width: 0;
}
.input :deep(.p-inputtext) {
	width: 100%;
}

.chip-list {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin-top: 0.25rem;
}

.chip {
	display: inline-flex;
	align-items: center;
	gap: 0.4rem;
	padding: 0.4rem 0.85rem;
	background: var(--color-surface-alt);
	border: 1px solid var(--color-border);
	border-radius: 999px;
	color: var(--color-text);
	font-weight: 500;
	cursor: pointer;
	transition: background 0.15s, transform 0.15s;
}
.chip:hover {
	background: var(--color-border);
	transform: translateY(-1px);
}
.chip-remove {
	font-size: 0.75rem;
	color: var(--color-danger);
}

.panel-actions {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: auto;
	padding-top: 0.75rem;
	gap: 0.75rem;
}
.chip-count {
	color: var(--color-text-muted);
	font-size: 0.875rem;
	font-weight: 600;
}

@media (max-width: 640px) {
	.ingredients-page {
		grid-template-columns: 1fr;
	}
	.panel {
		padding: 1.25rem;
	}
}
</style>
