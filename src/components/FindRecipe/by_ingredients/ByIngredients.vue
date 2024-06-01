<template>
	<div class="carrot-box">
		<carrotDialog
			class="carrot"
			v-if="isLoading"></carrotDialog>
	</div>
	<div class="left-box box-content">
		<div class="box-property-left">
			<strong class="paragraph">
				Enter the name of the ingredient from which you want to create a dish
			</strong>
		</div>
		<div class="content">
			<div class="card flex justify-content-center">
				<div class="flex flex-column gap-2">
					<label for="ingredient">Ingredient name:</label>
					<InputText
						id="ingredient"
						style="width: 350px"
						v-model="ingredientName"
						:feedback="false"
						aria-describedby="recipe-help" />
					<small id="recipe-help">Enter the ingredient</small>
				</div>
			</div>
			<div class="button-box-left">
				<div class="card flex justify-content-center">
					<Button
						@click="getChosedIngredient()"
						label="Add ingredient" />
				</div>
			</div>
		</div>
	</div>
	<div class="right-box box-content">
		<div class="box-property-right">
			<p>
				<strong class="paragraph">Your selected ingredients: </strong>
			</p>
			<div v-if="userChosed.length === 0">
				<p class="description">
					You haven't selected any ingredient yet. Enter the ingredient you are
					interested in and add it to the search. You can serve up to five
					ingredients at a time.
				</p>
			</div>

			<div v-if="userChosed">
				<button
					class="button-chose show-less"
					v-for="(ingredient, index) in userChosed"
					:key="index"
					@click="deleteSelectedTag(index)">
					{{ ingredient }}
				</button>
			</div>
			<div class="button-box-right">
				<div class="card flex">
					<Button
						@click="toggleToGetRecipes()"
						label="Find recipe" />
				</div>
			</div>
		</div>
	</div>
	<Toast />
</template>

<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useRecipeStore } from "../../../stores/recipes.js";
import { useTagsListStore } from "../../../stores/tags.js";
import { useRecipeStoreByTags } from "../../../stores/recipesByTags.js";
import Toast from "primevue/toast";
import carrotDialog from "@/components/reusable/carrotDialog.vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

const recipeStore = useRecipeStore();
const tagListStore = useTagsListStore();
const recipeStoreByTags = useRecipeStoreByTags();
const router = useRouter();
const isLoading = ref(false);
const recipesLoading = ref(false);

const toast = useToast();

const numberOfItemsToShow = ref(6);
const showAll = ref(false);
const userChosed = ref([]);
let ingredientName = ref(null);

const getChosedIngredient = () => {
	if (ingredientName.value) {
		if (userChosed.value.length < 5) {
			const checkDuplicate = userChosed.value.some(
				(ingredient) => ingredient === ingredientName.value
			);
			if (!checkDuplicate) {
				userChosed.value.push(ingredientName.value);
				console.log(userChosed.value);
			} else {
				console.log("Ten element już istnieje w tabeli.");
				showErrorItemExist();
			}
		} else {
			console.log("Tabela zawiera już 5 elementów");
			showErrorOverFiveElements();
		}
	} else {
		showErrorEmptyInput();
	}
};

const deleteSelectedTag = (index) => {
	userChosed.value.splice(index, 1);
};

const toggleShow = () => {
	showAll.value = !showAll.value;
	if (!showAll.value) {
		numberOfItemsToShow.value = 6;
	}
};

const showMoreTags = () => {
	numberOfItemsToShow.value = numberOfItemsToShow.value = Infinity;
};

const BaseRecipeList = () => router.push({ name: "RecipeList" });

const toggleToGetRecipes = () => {
	getRecipe();
};

async function getRecipe() {
	isLoading.value = true;
	const selectedIngredients = userChosed.value.join(",");
	await recipeStoreByTags.getRecipes(0, 5, selectedIngredients);
	console.log(recipeStoreByTags.fetchedRecipes);
	recipesLoading.value = false;
	if (recipeStoreByTags.fetchedRecipes.length === 0) {
		showError();
		isLoading.value = !isLoading.value;
	} else {
		BaseRecipeList();
	}
}

const showErrorItemExist = () => {
	toast.add({
		severity: "error",
		summary: "Error Message",
		detail: "This item is already selected ",
		life: 3000,
	});
};
const showErrorOverFiveElements = () => {
	toast.add({
		severity: "error",
		summary: "Error Message",
		detail: "You have already selected five items ",
		life: 3000,
	});
};
const showErrorEmptyInput = () => {
	toast.add({
		severity: "error",
		summary: "Error Message",
		detail: "Ingredient name not provided. Enter the ingredient name",
		life: 3000,
	});
};
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
.box-content {
	position: relative;
	border: 1px solid;
	border-color: aliceblue;
	border-radius: 10px;
	background-color: #fcffff;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	z-index: 0;
	color: #44424d;
}

.left-box {
	position: fixed;
	width: 37%;
	margin-top: 2rem;
	left: 5rem;
	z-index: 1;
	justify-content: flex-end;
	align-items: flex-end;
	height: 19rem;
}
.right-box {
	width: 37%;
	position: fixed;
	margin-top: 2rem;
	right: 5rem;
	align-items: flex-end;
	justify-content: flex-start;
	height: 19rem;
}

.description {
	font-size: 18px;
	margin-left: auto;
	margin-right: auto;
}

p {
	margin-top: 1rem;
	margin-left: auto;
	margin-right: auto;
}
.paragraph {
	font-size: 22px;
}
.button-box-left {
	position: absolute;
	bottom: 2.5rem;
	right: 2rem;
}
.button-box-right {
	position: absolute;
	bottom: 2.5rem;
}
.carrot {
	position: absolute;
	left: 40%;
	z-index: 1;
}
.carrot-box {
	position: relative;
	animation: moveUpDown 0.7s infinite alternate;
}

.box-property-left,
.box-property-right {
	width: 100%;
	margin: 0;
	padding: 2rem;
	box-sizing: border-box;
}

.button-chose {
	font-size: 16px;
	font-weight: 200;
	letter-spacing: 1px;
	padding: 0.7rem;
	margin: 0.4rem;
	outline: 0;
	border: 1px solid black;
	cursor: pointer;
	position: relative;
	background-color: rgba(0, 0, 0, 0);
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
}
.button-chose:after {
	content: "";
	background-color: #ffe54c;
	width: 100%;
	z-index: -1;
	position: absolute;
	height: 100%;
	top: 7px;
	left: 7px;
	transition: 0.2s;
}

.show-less:after {
	background-color: #3dd1e7;
}
.button-chose:hover:after {
	top: 0px;
	left: 0px;
}

@keyframes moveUpDown {
	from {
		top: -30px;
	}
	to {
		top: 0px;
	}
}
</style>
