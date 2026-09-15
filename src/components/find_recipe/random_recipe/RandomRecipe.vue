<template>
	<div class="content">
		<p class="description">
			<strong
				>Click the button and enjoy the recipe for a delicious dish!</strong
			>
		</p>
		<div class="button-box">
			<div class="card flex justify-content-center">
				<Button
					@click="toggleToGetRecipes"
					label="Get random recipe" />
			</div>
		</div>
	</div>
	<div
		v-if="isLoadingLoader"
		class="loader">
		<CarrotLoader></CarrotLoader>
	</div>
</template>

<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useTastyStore } from "../../../stores/tasty.js";
import CarrotLoader from "../../Reusable/CarrotLoader.vue";

const isLoadingLoader = ref(false);
const tastyStore = useTastyStore();
const router = useRouter();
const toast = useToast();

const foodName = ref(null);

const NavigateToBaseRecipeList = () =>
	router.push({
		name: "RecipeList",
		query: {
			storeType: "tasty",
			headerMessage: "Your delicious random recipes. Enjoy!",
			foodName: foodName.value?.display_name,
			buttonType: false,
		},
	});

async function getRecipe() {
	isLoadingLoader.value = true;
	getRandomRecipe();
	await tastyStore.getRecipes(0, 5, foodName.value?.display_name);
	if (tastyStore.fetchedRecipes.length === 0) {
		showError();
		isLoadingLoader.value = false;
	} else {
		NavigateToBaseRecipeList();
	}
}

function getRandomRecipe() {
	const randomIndex = Math.floor(Math.random() * 500);
	foodName.value = tastyStore.fetchedTags[randomIndex];
}

const showError = () => {
	toast.add({
		severity: "error",
		summary: "Error Message",
		detail: "Sorry, no results found. Try again ",
		life: 3000,
	});
};
const toggleToGetRecipes = () => {
	getRecipe();
};
</script>

<style scoped>
.content {
	border-radius: var(--radius-card);
	background-color: var(--color-surface);
	padding: 2rem;
	margin: 2rem auto;
	max-width: 30rem;
	text-align: center;
	box-shadow: var(--shadow-card);
	color: var(--color-text);
}
.description {
	font-size: 1.125rem;
	margin: 0 0 1.25rem;
}
.button-box {
	display: flex;
	justify-content: center;
}

@media (max-width: 650px) {
	.content {
		margin: 1rem;
		padding: 1.5rem;
	}
	.description {
		font-size: 1rem;
	}
}
</style>
