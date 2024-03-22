<template>
	<div
		v-for="recipe in recipeStore.fetchedRecipes"
		:key="recipe.name">
		<ul>
			<li>
				<div class="container">
					<div class="recipe-box">
						<div class="top-row">
							<div class="recipe-name">
								<strong>{{ recipe.name }}</strong>
							</div>
							<div class="button-location">
								<Button
									class="button-class"
									type="button"
									label=" Pokaż przepis "
									icon="pi pi-chevron-down" />
							</div>
							<div class="set-time">
								<p class="time">
									<strong>CZAS: {{ recipe.Time }} min</strong>
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
import { useRecipeStore } from "../../../stores/recipes.js";
const recipeStore = useRecipeStore();

</script>

<style scoped>
* {
	box-sizing: border-box;
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
	color: #261474;
}
.recipe-box {
	display: flex;
	flex-wrap: wrap;
	overflow: auto;
	max-width: 65rem;
	border: 1px solid black;
	border-radius: 10px;
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
	background-color: #faf8f7;
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
	border: 1px solid black;
	margin-top: 0.5rem;
	border-radius: 10px;
	padding-top: 1rem;
	padding-bottom: 1rem;
	background-color: #ecf005;
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
	/* border: 1px solid black; */
	border-radius: 10px;
	padding: 1rem;
	margin-right: 0.5rem;
	margin-left: 1rem;
}
.button-class {
	padding: 1rem;
}
</style>
