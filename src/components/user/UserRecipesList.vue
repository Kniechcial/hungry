<template>
	<Dialog
		class="dialog-class"
		v-model:visible="recipeVisible"
		modal
		:closable="true"
		:dismissableMask="true"
		@setVisible="setVisible()"
		:showHeader="false">
		<RecipeDetails
			:recipe="activeRecipe"
			@setVisible="setVisible(false)"></RecipeDetails>
	</Dialog>
	<div class="header-text">{{ headerMessage }}</div>
	<div>
		<ul>
			<li
				v-for="(recipe, index) in fetchedRecipes"
				:key="index">
				<div class="container">
					<div class="recipe-box">
						<div :class="['top-row', getItemClass(index)]">
							<div class="recipe-name">
								<strong>{{ index + 1 }}. {{ recipe.name || "no data" }}</strong>
							</div>
							<div
								v-if="storeType === 'recipes'"
								class="button-location">
								<Button
									@click="handlerDeleteRecipe(recipe)"
									class="button-class button-delete"
									type="button"
									icon="pi pi-trash" />
							</div>

							<div class="button-location">
								<Button
									@click="showRecipe(recipe)"
									class="button-class"
									type="button"
									label="Show recipe"
									icon="pi pi-chevron-down" />
							</div>
							<div
								v-if="recipe.Time"
								class="set-time bg-yellow-200">
								<p class="time">
									<strong>Time: {{ recipe.Time }}<strong> min</strong></strong>
								</p>
							</div>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
	<div
		v-if="displayBaseDescription"
		class="content">
		<div class="card flex mt-3">
			<div class="flex flex-column p-3 gap-2">
				<label><strong>Your list is empty</strong></label>
				<small class="description"
					>You don't added any recipe yet. Add your first recipe and save it for
					use if in the future.</small
				>
			</div>
		</div>
		<div class="button-box">
			<Button
				@click="addFirstRecipe()"
				label="Add first recipe" />
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import RecipeDetails from "../find_recipe/recipe_details/RecipeDetails.vue";
import { recipesStore } from "../../stores/recipesStore.js";
import { useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const useRecipesStore = recipesStore();
const recipeVisible = ref(false);
const activeRecipe = ref(null);
const storeType = route.query.storeType;
const displayBaseDescription = ref(false);

const headerMessage = ref(
	route.query.headerMessage || "Your delicious recipes. Enjoy!"
);

const fetchedRecipes = computed(() => {
	if (useRecipesStore.userRecipes.length > 0) {
		displayBaseDescription.value = false;
		return useRecipesStore.userRecipes;
	} else {
		displayBaseDescription.value = true;
		return [];
	}
});

const addFirstRecipe = () =>
	router.push({ name: "FindRecipe", params: { findBy: "name" } });

const showRecipe = (recipe) => {
	recipeVisible.value = true;
	activeRecipe.value = recipe;
};
const setVisible = (visible) => {
	recipeVisible.value = visible;
	console.log("RecipeList");
};

const getItemClass = (index) => {
	return (index + 1) % 2 === 0 ? "even" : "odd";
};
const handlerDeleteRecipe = async (recipe) => {
	const useRecipesStore = recipesStore();
	await useRecipesStore.deleteRecipe(recipe);
};
</script>

<style scoped>
.even {
	background-color: #fcffff;
}
.odd {
	background-color: #a6ffea8c;
}
.header-text {
	margin: 2rem auto 0 auto;
	padding-left: 1rem;
	padding-right: 1rem;
	display: block;
	width: fit-content;
	font-size: 26px;
	font-weight: bold;
	font-style: italic;
	color: #44424d;
}

* {
	box-sizing: border-box;
}
ul,
li {
	list-style: none !important;
}
.dialog-class {
	margin: 0;
	padding: 0;
}

.description {
	font-size: 20px;
	margin-left: auto;
	margin-right: auto;
	font-style: italic;
}

.container {
	display: block;
	margin-left: auto;
	margin-right: auto;
	margin-top: 2rem;
	max-width: 65rem;
	width: 100%;
	border-color: aliceblue;
	border-radius: 10px;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	color: #44424d;
}

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
.recipe-box {
	display: flex;
	flex-wrap: wrap;
	overflow: auto;
	max-width: 65rem;
	border-radius: 10px;
	justify-content: space-between;
}
.top-row {
	z-index: 1;
	position: relative;
	display: block;
	width: 100%;
	max-height: 5rem;
	min-height: 1px;
	padding-right: 15px;
	padding-left: 15px;
	max-width: 100%;
	border-radius: 10px;
}
.recipe-name {
	float: left;
	max-height: 100%;
	font-size: 20px;
	padding: 1.5rem;
}

.set-time {
	display: block;
	float: right;
	height: 100%;
	max-height: 4rem;
	margin-top: 0.5rem;
	border-radius: 10px;
	padding: 1rem;
	margin-right: 0.5rem;
	color: black;
}
.time {
	font-size: 16px;
	padding-right: 0.5rem;
	padding-left: 0.5rem;
}

.button-location {
	display: block;
	float: right;
	height: 100%;
	border-radius: 10px;
	padding: 1rem;
	margin-right: 0.5rem;
}
.button-class {
	padding: 1rem;
}
.button-delete {
	background-color: #f92222;
	margin-left: 0.5rem;
}
.button-box {
	margin-top: 2rem;
	margin-left: 18rem;
}

@media (max-width: 768px) {
	.container {
		margin-left: 1rem;
		margin-right: 1rem;
	}
	.recipe-box {
		flex-direction: column;
		align-items: flex-start;
	}

	.recipe-name {
		font-size: 14px;
	}

	.set-time {
		display: none;
	}

	.button-location {
		transform: scale(0.7);
		margin-left: 0;
		margin-right: 0;
		padding: 0.6rem;
		float: none;
	}

	.top-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem;
	}
}
</style>
