<template>
	<div class="main-box">
		<div class="left-box box-content">
			<div class="box-property-left">
				<strong class="paragraph">
					Enter the name of the ingredient from which you want to create a dish
					test
				</strong>
			</div>
			<div class="content">
				<div class="card flex justify-content-center">
					<div class="flex flex-column gap-2">
						<label for="ingredient">Ingredient name:</label>
						<InputText
							class="input-text"
							id="ingredient"
							v-model="ingredientName"
							@keydown.enter="getChosedIngredient"
							:feedback="false"
							aria-describedby="recipe-help" />
						<small id="recipe-help">Enter the ingredient</small>
					</div>
				</div>
				<div class="button-box-left">
					<div class="card flex justify-content-center">
						<Button
							@click="getChosedIngredient"
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
						You haven't selected any ingredient yet. Enter the ingredient you
						are interested in and add it to the search. You can serve up to five
						ingredients at a time.
					</p>
				</div>

				<div v-if="userChosed.length > 0">
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
							:disabled="disabledButtonFindRecipe"
							@click="toggleToGetRecipes"
							label="Find recipe" />
					</div>
				</div>
			</div>
		</div>
	</div>
	<div
		v-if="isLoading"
		class="loader">
		<CarrotLoader></CarrotLoader>
	</div>
	<Toast />
</template>

<script setup>
import { ref, computed } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Toast from "primevue/toast";
import { tastyStore } from "../../../stores/tasty.js";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import CarrotLoader from "@/components/reusable/CarrotLoader.vue";

const useTastyStore = tastyStore();
const router = useRouter();
const toast = useToast();

const isLoading = ref(false);
const numberOfItemsToShow = ref(6);
const showAll = ref(false);
const userChosed = ref([]);
const foodName = ref(null);
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
	ingredientName.value = "";
};

const deleteSelectedTag = (index) => {
	userChosed.value.splice(index, 1);
};

const disabledButtonFindRecipe = computed(() => {
	return userChosed.value.length === 0;
});

const toggleShow = () => {
	showAll.value = !showAll.value;
	if (!showAll.value) {
		numberOfItemsToShow.value = 6;
	}
};

const showMoreTags = () => {
	numberOfItemsToShow.value = numberOfItemsToShow.value = Infinity;
};

const BaseRecipeList = () =>
	router.push({
		name: "RecipeList",
		query: {
			storeType: "tasty",
			foodName: foodName.value,
		},
	});

const toggleToGetRecipes = () => {
	getRecipe();
};

async function getRecipe() {
	isLoading.value = true;
	const selectedIngredients = ref(userChosed.value.join(","));
	await useTastyStore.getRecipes(0, 2, selectedIngredients.value);
	foodName.value = selectedIngredients;
	console.log(useTastyStore.fetchedRecipes);
	isLoading.value = false;

	if (useTastyStore.fetchedRecipes.length === 0) {
		showError();
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
.main-box {
	display: flex;
	justify-content: space-between;
	margin: 0 2rem;
	flex-wrap: wrap;
}
.input-text {
	width: 350px;
	margin-bottom: 1rem;
}

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
	height: 19rem;
	width: 37%;
	margin-top: 2rem;
	z-index: 1;
	max-width: 37%;
}
.right-box {
	height: 19rem;
	width: 37%;
	margin-top: 2rem;
	max-width: 37%;
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
	bottom: 1rem;
	right: 2rem !important;
}
.button-box-right {
	position: absolute;
	bottom: 1rem;
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
@media (max-width: 1250px) {
	.main-box {
		flex-direction: column;
		align-items: center;
		margin: 0 1rem;
	}
	.left-box,
	.right-box {
		width: 100%;
		max-width: 65%;
		margin: 1rem 0;
	}
	.input-text {
		width: 250px;
		margin-bottom: 1rem;
	}
	.button-box-left,
	.button-box-right {
		margin-bottom: 1rem;
	}
	.carrot {
		left: 50%;
		transform: translateX(-50%);
	}
}
@media (max-width: 1000px) {
	.left-box,
	.right-box {
		width: 100%;
		max-width: 65%;
		margin: 1rem 0;
	}
	.input-text {
		width: 250px;
		margin-bottom: 1rem;
	}
	.description {
		font-size: 13px;
	}
	.paragraph {
		font-size: 15px;
	}
	.button-box-left,
	.button-box-right {
		scale: 0.8;
		margin-bottom: 1rem;
	}
	.button-box-right {
		right: 2rem !important;
	}
}
@media (max-width: 650px) {
	.left-box,
	.right-box {
		width: 100%;
		max-width: none;
		margin: 1rem 0;
	}
	.button-box-left,
	.button-box-right {
		bottom: 0.2rem;
	}
	.input-text {
		width: 200px;
	}
}
</style>
