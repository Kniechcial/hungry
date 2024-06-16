<template>
	<Dialog
		class="dialog-class"
		v-model:visible="recipeVisible"
		modal
		:closable="true"
		:dismissableMask="true"
		:showHeader="false">
		<RecipeDetails :recipe="activeRecipe"></RecipeDetails>
	</Dialog>
	<div class="header-text">Your five delicious recipes. Enjoy your meal !</div>
	<div>
		<ul>
			<li
				v-for="(recipe, index) in useTastyStore.fetchedRecipes"
				:key="index">
				<div class="container">
					<div class="recipe-box">
						<div :class="['top-row', getItemClass(index)]">
							<div class="recipe-name">
								<strong>{{ index + 1 }}. {{ recipe.name || "no data" }}</strong>
							</div>
							<div class="button-location">
								<Button
									@click="showRecipe(recipe)"
									class="button-class"
									type="button"
									label="Show recipe"
									icon="pi pi-chevron-down" />
							</div>
							<div class="set-time bg-yellow-200">
								<p class="time">
									<strong
										>Time: {{ recipe.Time || "no data"
										}}<strong> min</strong></strong
									>
								</p>
							</div>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import RecipeDetails from "./RecipeDetails.vue";
import { tastyStore } from "../../../stores/tasty.js";
const useTastyStore = tastyStore();

const recipeVisible = ref(false);
const activeRecipe = ref(null);
const showRecipe = (recipe) => {
	recipeVisible.value = true;
	activeRecipe.value = recipe;
};

const getItemClass = (index) => {
	return (index + 1) % 2 === 0 ? "even" : "odd";
};

//

const handleResize = () => {
	isClosable.value = window.innerWidth >= 1000;
};

//
</script>

<style scoped>
.even {
	background-color: #fcffff;

	/* color: red; */
}
.odd {
	background-color: #a6ffea;
	/* color: blue; */
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
	margin: 0;
	padding: 0;
}
.dialog-class {
	border-radius: 10px;
	margin: 0;
	padding: 0;
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
.recipe-box {
	display: flex;
	flex-wrap: wrap;
	overflow: auto;
	max-width: 65rem;
	border-radius: 10px;
	justify-content: space-between;
}
.top-row {
	position: relative;
	display: block;
	width: 100%;
	max-height: 5rem;
	min-height: 1px;
	padding-right: 15px;
	padding-left: 15px;
	max-width: 100%;
	border-radius: 10px;
	/* background-color: #faf8f7; */
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
	padding-top: 1rem;
	padding-bottom: 1rem;
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
	margin-left: 1rem;
}
.button-class {
	padding: 1rem;
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
