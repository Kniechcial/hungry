<template>
	<Dialog
		class="dialog-class"
		v-model:visible="recipeVisible"
		modal
		:style="{ width: '70rem' }"
		:breakpoints="{ '650px': '90vw' }"
		:closable="true"
		:dismissableMask="true"
		@setVisible="setVisible()"
		:showHeader="false">
		<RecipeDetails
			:recipe="activeRecipe"
			@setVisible="setVisible(false)"></RecipeDetails>
	</Dialog>
	<div class="header-text">{{ headerMessage }}</div>
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
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const route = useRoute();
const useTastyStore = tastyStore();
const { fetchedRecipes } = storeToRefs(useTastyStore);
const recipeVisible = ref(false);
const activeRecipe = ref(null);

const headerMessage = ref(
	route.query.headerMessage || "Your five delicious recipes. Enjoy!"
);

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
</script>

<style scoped>
.even {
	background-color: #fcffff;
}
.odd {
	background-color: #a6ffea8c;
}
ul,
li {
	list-style: none !important;
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
}
.dialog-class {
	margin: 0;
	padding: 0;
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
	padding: 1rem;
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
	padding: 1rem;
}
.button-class {
	padding: 1rem;
}
.button-delete {
	background-color: #f92222;
	margin-left: 0.5rem;
}

@media (max-width: 650px) {
	ul,
	li {
		padding: 0.5rem;
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
	.recipe-box {
		flex-direction: column;
		align-items: flex-start;
	}

	.button-location {
		transform: scale(0.7);
		margin-left: 0;
		margin-right: 0;
		padding: 0.6rem;
		float: none;
	}
	.button-class {
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
	.button-show {
		display: inline-flex;
		margin: 0;
		padding: 0.5rem 0.75rem;
		width: auto;
	}
}
</style>
