<template>
	<div>
		<ul>
			<li>
				<div class="container">
					<div class="recipe-box">
						<div class="closeRecipe">
							<Button
								class="buttonCloseRecipe"
								@click="closeRecipe()"
								label="X" />
						</div>

						<div class="top-row">
							<div class="recipe-name">
								<ul>
									<li>
										<strong>{{ recipe.name || "no data" }}</strong>
									</li>
								</ul>
							</div>
							<div class="right-top-row-box">
								<div class="recipe-tags">
									<span
										v-for="tag in recipe.tags"
										:key="tag">
										<div
											class="allergy-icon-box"
											v-if="tag.display_name === 'Gluten-Free'">
											<img
												class="allergy-icon"
												src="../../../assets/icon/gluten-free.png" />
											<p class="description-allergy">Gluten Free</p>
										</div>
									</span>
									<span
										v-for="tag in recipe.tags"
										:key="tag">
									</span>
									<div
										class="allergy-icon-box"
										v-if="
											!recipe.tags.some((tag) =>
												['Chicken', 'Meats', 'Beef'].includes(tag.display_name)
											)
										">
										<img
											class="allergy-icon"
											src="../../../assets/icon/meats-free.png" />
										<p class="description-allergy">Meats Free</p>
									</div>
									<span
										v-for="tag in recipe.tags"
										:key="tag">
										<div
											class="allergy-icon-box"
											v-if="tag.display_name === 'Dairy-Free'">
											<img
												class="allergy-icon"
												src="../../../assets/icon/dairy-free.png" />
											<p class="description-allergy">Dairy Free</p>
										</div>
									</span>
									<span
										v-for="tag in recipe.tags"
										:key="tag">
									</span>
									<div
										class="allergy-icon-box"
										v-if="
											!recipe.tags.some((tag) =>
												['Seafood', 'Shellfish', 'Fish'].includes(
													tag.display_name
												)
											)
										">
										<img
											class="allergy-icon"
											src="../../../assets/icon/seefood-free.png" />
										<p class="description-allergy">Seafood Free</p>
									</div>
									<span
										v-for="tag in recipe.tags"
										:key="tag">
									</span>
									<div
										class="allergy-icon-box"
										v-if="
											!recipe.tags.some((tag) =>
												['Tree nuts', 'Peanuts'].includes(tag.display_name)
											)
										">
										<img
											class="allergy-icon"
											src="../../../assets/icon/nuts free.png" />
										<p class="description-allergy">Nuts Free</p>
									</div>
								</div>

								<div class="set-time bg-yellow-200">
									<p class="time">
										<strong>TIME: {{ recipe.Time || "no data" }} min</strong>
									</p>
								</div>
							</div>
						</div>
						<div class="bottom-row">
							<div>
								<img
									class="recipe-image"
									:src="recipe.image"
									alt="Zdjęcie" />
							</div>

							<div class="details">
								<div class="left-part-description-recipe">
									<div class="calories-recipe">
										<div class="header-description">
											Kalorie:
											{{ recipe.calories.calories || "no data" }} kcal
										</div>
										<ul class="calories-specific">
											<li>
												<strong>Fat:</strong>
												<p>{{ recipe.calories.fat || "no data" }} kcal</p>
											</li>
											<li>
												<strong>Sugar:</strong>
												<p>{{ recipe.calories.sugar || "no data" }} kcal</p>
											</li>
											<li>
												<strong>Carbohydrates:</strong>
												<p>
													{{ recipe.calories.carbohydrates || "no data" }} kcal
												</p>
											</li>
										</ul>
									</div>
									<div class="ingridiens-recipe">
										<div
											v-if="!hiddenButton"
											class="card flex justify-content-center mt-4 pl-5 cursor-pointer">
											<Button
												@click="displayIngridients"
												label="Show Ingridiens" />
										</div>
										<ul v-if="showIngridients">
											<div class="header-description">Ingridients:</div>
											<div
												v-for="name in recipe.ingridients"
												:key="name">
												<li>
													{{ name.name || "no data" }}
													<p>
														{{ name.value || "no data" }}
														<strong>{{ name.unit || "-" }}</strong>
													</p>
												</li>
											</div>
										</ul>
									</div>
								</div>
								<div class="right-part-description-recipe">
									<div class="description-recipe">
										<div class="description-topic header-description">
											Description:
										</div>
										<div
											v-for="(step, index) in recipe.instructions"
											:key="index">
											<ul>
												<div class="header-description">
													Step: {{ getIndexInArray(index) }}
												</div>
												<li class="description-step">
													{{ step.step }}
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Button
					v-if="useAuthStore.user"
					class="button-add-to-book"
					@click="addToBook()"
					label="Add recipe to Your book" />
			</li>
		</ul>
	</div>
	<Toast />
</template>

<script setup>
import { ref, watch } from "vue";
import Button from "primevue/button";
import { authStore } from "@/stores/authStore";
import { tastyStore } from "../../../stores/tasty.js";
import { recipesStore } from "@/stores/recipesStore.js";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";

const useTastyStore = tastyStore();
const useRecipesStore = recipesStore();
const useAuthStore = authStore();
const props = defineProps({
	recipe: Object,
});
const router = useRouter();
const emit = defineEmits(["setVisible"]);
const closeRecipe = () => {
	emit("setVisible", false);
	console.log("TAK");
	console.log("setVisible");
};
const toast = useToast();
const showIngridients = ref(false);
const hiddenButton = ref(false);

const displayIngridients = () => {
	showIngridients.value = true;
	hiddenButton.value = true;
};
const getIndexInArray = (index) => {
	return index + 1;
};

const addToBook = () => {
	useRecipesStore.addRecipe(props.recipe);
	useRecipesStore.getRecipe();
};

watch(
	() => useRecipesStore.addRecipeStatus,
	(newStatus) => {
		if (newStatus === true) {
			console.log("Recipe was added successfully!");
			showSuccess();
			setTimeout(() => {
				router.push({
					name: "UserRecipes",
				});
			}, 1500);
		} else if (newStatus === false) {
			showError();
			console.log("Failed to add recipe.");
		}
	}
);

const showError = () => {
	toast.add({
		severity: "error",
		summary: "Error Message",
		detail: "Sorry, failed to add recipe. Try again ",
		life: 3000,
	});
};

const showSuccess = () => {
	toast.add({
		severity: "success",
		summary: "Success Message",
		detail: "Recipe was added successfully!",
		life: 3000,
	});
};
</script>

<style scoped>
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}
.closeRecipe {
	display: flex;
	visibility: hidden;
	flex-direction: row-reverse !important;
	margin-top: 1rem;
	margin-left: auto;
}
.buttonCloseRecipe {
	margin-right: 2rem;
}

.allergy-icon-box {
	margin-left: 0.5rem;
	max-height: 70px;
	max-width: 70px;
	padding: 10px;
}

.allergy-icon {
	width: 50px;
	height: 50px;
}
.description-allergy {
	visibility: hidden;
	z-index: 9999 !important;
}

.allergy-icon-box:hover .description-allergy {
	visibility: visible;
	opacity: 1;
	font-weight: 500;
	font-size: 14px;
	font-style: italic;
	color: red;
}
.allergy-icon-box:hover .allergy-icon {
	transform: scale(1.2);
}

.container {
	display: block;
	margin-left: auto;
	margin-right: auto;
	margin-top: 2rem;
	max-width: 65rem;
	border-color: aliceblue;
	border-radius: 10px;
	background-color: #fcffff;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	color: #44424d;
}

.header-description {
	padding-left: 0.5rem;
	font-weight: bold;
}
.recipe-box {
	display: flex;
	flex-wrap: wrap;
	overflow: auto;
	max-width: 65rem;
	border-color: aliceblue;
	border-radius: 10px;
}
.top-row {
	display: flex;
	flex-direction: row;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	padding: 0 1rem;
	z-index: 1;
}
.right-top-row-box {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 1rem;
}

.set-time {
	display: flex;
	align-items: center;
	height: 4rem;
	text-wrap: nowrap;
	width: fit-content;
	border: 1px solid black;
	border-radius: 10px;
	padding-top: 1.5rem;
	padding-bottom: 1.5rem;
}
.time {
	font-size: 17px;
	padding-right: 0.5rem;
	padding-left: 0.5rem;
}

.recipe-tags {
	display: flex;
	flex-direction: row;
}
.bottom-row {
	position: relative;
	display: block;
	margin-right: 1rem;
	width: 100%;
	min-height: 1px;
	padding-right: 15px;
	padding-left: 15px;
	padding: 1rem;
	max-width: 100%;
	background-color: #fff;
}

img {
	border-radius: 3rem;
}
.recipe-image {
	float: left;
	margin-left: -1rem;
	overflow: hidden;
	width: 400px;
	height: 400px;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
}
.details {
	display: block;
	position: relative;
	width: 60%;
	float: left;
	max-height: 100%;
	font-size: 20px;
	margin-top: 2rem;
}
.ingridiens-recipe {
	overflow: auto;
	max-height: 15rem;
	max-width: 20rem;
}
.description-recipe {
	display: block;
	max-height: 30rem;
	padding-left: 1rem;
	font-size: 16px;
	word-wrap: break-word;
}
.calories-recipe {
	display: block;
	max-width: 20rem;
	font-size: 16px;
}

.left-part-description-recipe {
	width: 40%;
	float: left;
	overflow-y: auto;
}
.right-part-description-recipe {
	width: 60%;
	float: right;
	overflow-y: auto;
}
.details ul {
	font-size: 16px;
}
.details li {
	display: block;
	padding: 5px;
	font-size: 16px;
	border-bottom: 1px solid #ccc;
}
.details li p {
	float: right;
	font-size: 16px;
}
ul {
	list-style: none;
	display: block;
	margin-block-start: 1em;
	margin-block-end: 1em;
	margin-inline-start: 0px;
	margin-inline-end: 0px;
}
li {
	display: inline-block;
	margin-left: 10px;
	font-size: 20px;
	line-height: 20px;
}

button {
	padding-left: 1rem;
	padding-right: 1rem;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
}

.description-topic {
	font-size: 18px;
}
.description-step {
	font-style: italic;
}
.button-add-to-book {
	float: right;
	margin-top: 1rem;
	margin-bottom: -1rem;
}
@media (max-width: 1100px) {
	.recipe-box {
		flex-direction: column;
		align-items: center;
		border: solid;
		max-width: 700px;
	}

	.top-row {
		flex-direction: column;
		align-items: center;
	}

	.recipe-name,
	.recipe-tags,
	.set-time {
		width: 100%;
		margin-top: 1rem !important;
		text-align: center;
	}
	.set-time {
		justify-content: center;
		text-align: center;
	}

	.recipe-image {
		width: 100%;
		height: auto;
		padding: 0.5rem;
		margin: 0 auto;
	}

	.details {
		width: 100%;
	}

	.left-part-description-recipe,
	.right-part-description-recipe {
		width: 100%;
	}

	.set-time {
		margin: 1rem auto;
	}

	.description-recipe,
	.ingridiens-recipe,
	.calories-recipe {
		width: 100%;
		max-width: none;
		margin-top: 1rem;
		padding-left: 0;
		padding-right: 0;
	}
	.closeRecipe {
		visibility: visible;
	}
}
</style>
