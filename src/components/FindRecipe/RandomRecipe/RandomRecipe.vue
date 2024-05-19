<template>
	<div class="carrot-box">
		<carrotDialog
			class="carrot"
			v-if="isLoading"></carrotDialog>
	</div>
	<div class="content">
		<p class="description">
			<Strong
				>Click the button and enjoy the recipe for a delicious dish!</Strong
			>
		</p>
	</div>
	<div class="button-box">
		<div class="card flex justify-content-center">
			<Button
				@click="getRecipe()"
				label="Get random recipe" />
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import carrotDialog from "@/components/Reusable/carrotDialog.vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useRecipeStore } from "../../../stores/recipes.js";
import { useTagsListStore } from "../../../stores/tags.js";

const tagListStore = useTagsListStore();
const recipeStore = useRecipeStore();
const router = useRouter();
let foodName = ref(null);
const isLoading = ref(false);
const recipesLoading = ref(false);
const toast = useToast();

const BaseRecipeList = () => router.push({ name: "RecipeList" });

async function getRecipe() {
	isLoading.value = true;
	getRandomRecipe();
	await recipeStore.getRecipes(0, 1, foodName.display_name);
	// console.log(recipeStore.fetchedRecipes);
	recipesLoading.value = false;
	if (recipeStore.fetchedRecipes.length === 0) {
		showError();
		isLoading.value = !isLoading.value;
	} else {
		BaseRecipeList();
	}
}

function getRandomRecipe() {
	const randomIndex = Math.floor(Math.random() * 500);
	foodName = tagListStore.fetchedTags[randomIndex];
	console.log(foodName.display_name);
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
.content {
	position: relative;
	border: 1px solid black;
	border-radius: 10px;
	background-color: #faf8f7;
	padding: 1rem;
	margin-top: 10rem;
	width: 25rem;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 22px;
	box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
}
.description {
	font-size: 18px;
	margin-left: auto;
	margin-right: auto;
}
p {
	margin-left: auto;
	margin-right: auto;
}

.carrot {
	position: relative;
	left: 15%;
	transform: translate(-50%, -50%);
	z-index: 1;
}
.carrot-box {
	position: relative;
	animation: moveUpDown 0.7s infinite alternate;
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
