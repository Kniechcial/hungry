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

	<Dialog
		class="confirm-delete-dialog"
		v-model:visible="confirmDeleteRecipe"
		modal
		:closable="true"
		:dismissableMask="true"
		:showHeader="false">
		<div class="content">
			<div class="card flex mt-3">
				<div class="flex flex-column p-3 gap-2">
					Are you sure you want to delete this recipe?
				</div>
			</div>
			<div class="button-box">
				<div class="card flex">
					<Button
						@click="handlerDeleteRecipe(activeRecipe)"
						label="Confirm" />
				</div>
			</div>
		</div>
	</Dialog>

	<div class="header-text"></div>
	<div>
		<ul>
			<li
				v-for="(recipe, index) in fetchedRecipes"
				:key="index">
				<div
					class="container"
					:class="[getItemClass(index)]">
					<div class="recipe-name">
						<strong>{{ index + 1 }}. {{ recipe.name || "no data" }}</strong>
					</div>
					<div class="right-elements">
						<div
							v-if="recipe.Time"
							class="set-time">
							<p class="time">
								<strong>Time: {{ recipe.Time }}<strong> min</strong></strong>
							</p>
						</div>
						<div class="button-show">
							<Button
								@click="showRecipe(recipe)"
								class="button-class"
								type="button"
								label="Show recipe"
								icon="pi pi-chevron-down" />
						</div>
						<div class="button-delete">
							<Button
								@click="showConfirmDeleteRecipe(recipe)"
								class="button-class button-delete"
								type="button"
								icon="pi pi-trash" />
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
					>You haven't added any recipes yet. Add your first recipe and save it
					for future use.</small
				>
			</div>
		</div>
		<div class="button-box">
			<Button
				class="button-class button-delete"
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
const confirmDeleteRecipe = ref(false);
const activeRecipe = ref(null);
const storeType = route.query.storeType;
const displayBaseDescription = ref(false);

const headerMessage = ref(
	route.query.headerMessage || "Your delicious recipes. Enjoy!"
);

const showConfirmDeleteRecipe = (recipe) => {
	activeRecipe.value = recipe;
	confirmDeleteRecipe.value = true;
};

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
	try {
		await useRecipesStore.deleteRecipe(recipe);
		confirmDeleteRecipe.value = false;
	} catch (error) {
		console.error("Failed to delete recipe:", error);
	}
};
</script>

<style scoped>
.confirm-delete-dialog {
	background-color: transparent;
}

.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.button-box .p-button {
	width: 100%;
	margin-top: 10px;
	background-color: #e53935;
	color: white;
}

.button-box .p-button:hover {
	background-color: #ea9424;
}

* {
	box-sizing: border-box;
}

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
	position: relative;
	margin: 2rem auto;
	max-width: 65rem;
	width: 100%;
	border-color: aliceblue;
	border-radius: 10px;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	padding: 1rem;
	z-index: 1;
}

.recipe-name {
	display: inline-block;
	vertical-align: middle;
	width: 55%;
	font-size: 18px;
	padding: 1rem;
	box-sizing: border-box;
	word-wrap: break-word;
}

.right-elements {
	display: inline-block;
	vertical-align: middle;
	width: 45%;
	text-align: right;
	padding-right: 1rem;
	box-sizing: border-box;
	white-space: nowrap;
}

.set-time {
	display: inline-block;
	vertical-align: middle;
	background-color: #ffeb99;
	text-align: right;
	padding: 0.5rem 1rem;
	margin-left: 1rem;
	border-radius: 8px;
	font-size: 16px;
}

.time {
	font-size: 16px;
	margin: 0;
}

.button-show {
	display: inline-block;
	vertical-align: middle;
	margin-left: 1rem;
	padding: 0.5rem 1rem;
}

.button-delete {
	display: inline-block;
	vertical-align: middle;
	padding: 0.5rem 0.5rem;
	background-color: #f92222;
	border: none;
	border-radius: 4px;
	color: white;
	font-size: 16px;
	width: auto;
}

.button-class {
	padding: 0.5rem;
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
	z-index: 1;
}

.button-box {
	margin-top: 2rem;
	margin-left: 18rem;
}

@media (max-width: 650px) {
	ul,
	li {
		padding: 0;
		margin: 0;
	}

	.container {
		width: 100%;
		max-width: 100%;
		margin-left: 0;
		margin-right: 0;
		padding-left: 0;
		padding-right: 0;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}
	.set-time {
		display: none;
	}

	.recipe-name {
		width: 100%;
		font-size: 16px;
		padding: 0.5rem;
	}

	.right-elements {
		width: 100%;
		text-align: left;
		padding-right: 0;
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}

	.button-show,
	.button-delete {
		display: inline-flex;
		margin: 0;
		padding: 0.5rem 0.75rem;
		width: auto;
	}

	.button-delete {
		margin-right: 0.5rem;
		padding: 0.25rem;
		width: auto;
		height: auto;
		display: inline-flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
