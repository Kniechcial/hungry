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

let foodName = ref(null);

const NavigateToBaseRecipeList = () =>
	router.push({
		name: "RecipeList",
		query: {
			storeType: "tasty",
			headerMessage: "Your delicious random recipes. Enjoy!",
			foodName: foodName.display_name,
			buttonType: false,
		},
	});

async function getRecipe() {
	isLoadingLoader.value = true;
	getRandomRecipe();
	await tastyStore.getRecipes(0, 5, foodName.display_name);
	if (tastyStore.fetchedRecipes.length === 0) {
		showError();
		isLoadingLoader.value = false;
	} else {
		NavigateToBaseRecipeList();
	}
}

function getRandomRecipe() {
	const randomIndex = Math.floor(Math.random() * 500);
	foodName = tastyStore.fetchedTags[randomIndex];
	
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

@media (max-width: 650px) {
	.content {
		flex-direction: column;
		align-items: center;
		font-size: 14px;
		width: calc(100% - 2rem);
		max-width: 300px;
	}
	.button-box {
		scale: 0.8;
		margin-bottom: 1rem;
	}
}
</style>
