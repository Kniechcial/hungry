<template>
	<div class="carrot-box">
		<carrotDialog
			class="carrot"
			v-if="isLoading"></carrotDialog>
	</div>
	<div class="content">
		<p class="description">
			<strong
				>Click the button and enjoy the recipe for a delicious dish!</strong
			>
		</p>
		<div class="button-box">
			<div class="card flex justify-content-center">
				<Button
					@click="getRecipe()"
					label="Get random recipe" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import carrotDialog from "@/components/reusable/carrotDialog.vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { tastyStore } from "../../../stores/tasty.js";
import { tastyTagsListStore } from "../../../stores/tasty.js";

const useTastyStore = tastyStore();
const useTastyTagsListStore = tastyTagsListStore();
const router = useRouter();
const toast = useToast();

const isLoading = ref(false);
const recipesLoading = ref(false);

let foodName = ref(null);

const BaseRecipeList = () => router.push({ name: "RecipeList" });

async function getRecipe() {
	isLoading.value = true;
	getRandomRecipe();
	await useTastyStore.getRecipes(0, 1, foodName.display_name);
	recipesLoading.value = false;
	if (useTastyStore.fetchedRecipes.length === 0) {
		showError();
		isLoading.value = !isLoading.value;
	} else {
		BaseRecipeList();
	}
}

function getRandomRecipe() {
	const randomIndex = Math.floor(Math.random() * 500);
	foodName = useTastyTagsListStore.fetchedTags[randomIndex];
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
	border: 1px solid;
	border-color: aliceblue;
	border-radius: 10px;
	background-color: #fcffff;
	padding: 1rem;
	margin-top: 10rem;
	width: 30rem;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 22px;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	color: #44424d;
}
.description {
	font-size: 18px;
	margin-left: auto;
	margin-right: auto;
	padding: 1rem;
}
p {
	margin-left: auto;
	margin-right: auto;
}
.button-box {
	margin-top: 2rem;
}
.carrot {
	position: absolute;
	left: 15%;
	transform: translate(-50%, -50%);
	z-index: 1;
}
.carrot-box {
	position: relative;
	animation: moveUpDown 0.7s infinite alternate;
}

/* @media (min-width: 768px) {
	.button-chose {
		padding: 13px 50px 13px;
	}
} */

@media (max-width: 1250px) {
	.content {
		flex-direction: column;
		align-items: center;
		font-size: 12px;
		width: 100%;

		max-width: 300px;
	}
	.button-box {
		scale: 0.7;
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
