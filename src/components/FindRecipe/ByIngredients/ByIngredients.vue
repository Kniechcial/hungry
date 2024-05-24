<template>
	<div class="carrot-box">
		<carrotDialog
			class="carrot"
			v-if="isLoading"></carrotDialog>
	</div>
	<div class="get-user-chose">
		<div>
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
		</div>
		<Toast />
		<div v-if="userChosed">
			<button
				class="button-chose show-less"
				v-for="(ingredient, index) in userChosed"
				:key="index"
				@click="deleteSelectedTag(index)">
				{{ ingredient }}
			</button>
		</div>
		<div class="button-box">
			<div class="card flex justify-content-center">
				<Button
					@click="toggleToGetRecipes()"
					label="Find recipe" />
			</div>
		</div>
	</div>
	<div class="box-property">
		<div class="get-tags">
			<div>
				<strong class="paragraph"
					>Enter the name of the ingredient from which you want to create a
					dish</strong
				>
			</div>
		</div>
	</div>
	<div class="content">
		<div class="card flex justify-content-center">
			<div class="flex flex-column gap-2">
				<label for="ingredient">Ingredient name:</label>
				<InputText
					id="ingredient"
					v-model="ingredientName"
					:feedback="false"
					aria-describedby="recipe-help" />
				<small id="recipe-help">Enter the ingredient</small>
			</div>
		</div>
		<div class="button-box">
			<div class="card flex justify-content-center">
				<Button
					@click="getChosedIngredient()"
					label="Add ingredient" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useRecipeStore } from "../../../stores/recipes.js";
import { useTagsListStore } from "../../../stores/tags.js";
import { useRecipeStoreByTags } from "../../../stores/recipesByTags.js";
import Toast from "primevue/toast";
import carrotDialog from "@/components/Reusable/carrotDialog.vue";
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
	if (userChosed.value.length < 5) {
		const checkDuplicate = userChosed.value.some(
			(ingredient) => ingredient === ingredientName.value
		);
		if (!checkDuplicate) {
			userChosed.value.push(ingredientName.value);
			console.log(userChosed.value);
		} else {
			console.log("Ten element już istnieje w tabeli.");
		}
	} else {
		console.log("Tabela zawiera już 5 elementów");
	}

	// console.log(ingredientName.value);
	// userChosed.value.push(ingredientName.value);
	// console.log(userChosed.value);
};

const deleteSelectedTag = (index) => {
	userChosed.value.splice(index, 1);
};

watch(userChosed);

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

const checkNuberChosedTags = () => {
	while (userChosed.value.length < 5) {
		userChosed.value.push(" - ");
	}
};
const toggleToGetRecipes = () => {
	checkNuberChosedTags();
	getRecipe();
};

async function getRecipe() {
	isLoading.value = true;
	const selectedIngredients = userChosed.value.join(",");
	await recipeStoreByTags.getRecipes(
		0,
		5,
		selectedIngredients
		// userChosed.value[0],
		// userChosed.value[1],
		// userChosed.value[2],
		// userChosed.value[3],
		// userChosed.value[4]
	);
	console.log(recipeStoreByTags.fetchedRecipes);
	recipesLoading.value = false;
	if (recipeStoreByTags.fetchedRecipes.length === 0) {
		showError();
		isLoading.value = !isLoading.value;
	} else {
		BaseRecipeList();
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

.button-box {
	margin-top: 1rem;
	margin-left: 7rem;
}
.carrot {
	position: relative;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 1;
}
.carrot-box {
	position: relative;
	animation: moveUpDown 0.7s infinite alternate;
}

.box-property {
	width: 35%;
	margin: 3% 3%;
	/* border: 1px solid black; */
	box-sizing: border-box;
	/* display: flex; */
}
.get-user-chose {
	float: right;
	width: 30%;
	margin: 3% 5%;
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
@media (min-width: 768px) {
	.button-chose {
		padding: 13px 50px 13px;
	}
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
