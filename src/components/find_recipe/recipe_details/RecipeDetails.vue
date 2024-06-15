<template>
	<div>
		<ul>
			<li>
				<div class="container">
					<div class="recipe-box">
						<div class="top-row">
							<div class="recipe-name">
								<ul>
									<li>
										<strong>{{ recipe.name || "no data" }}</strong>
									</li>
								</ul>
							</div>
							<div class="recipe-tags">
								<ul>
									<li
										v-for="(tag, index) in recipe.tags"
										:key="index">
										<div
											class="allergy-icon-box"
											v-if="tag.display_name === 'Gluten-Free'">
											<img
												class="allergy-icon"
												src="../../../assets/icon/gluten-free.png" />
											<p>Gluten Free</p>
										</div>
									</li>
									<li>
										<div class="allergy-icon-box">
											<img
												class="allergy-icon"
												src="../../../assets/icon/meats-free.png" />
											<p>Meats Free</p>
										</div>
									</li>
									<li>
										<div class="allergy-icon-box">
											<img
												class="allergy-icon"
												src="../../../assets/icon/dairy-free.png" />
											<p>Dairy Free</p>
										</div>
									</li>
									<li>
										<div class="allergy-icon-box">
											<img
												class="allergy-icon"
												src="../../../assets/icon/seefood-free.png" />
											<p>Seefood Free</p>
										</div>
									</li>
									<li>
										<div class="allergy-icon-box">
											<img
												class="allergy-icon"
												src="../../../assets/icon/nuts free.png" />
											<p>Nuts Free</p>
										</div>
									</li>
								</ul>
							</div>

							<div class="set-time bg-yellow-200">
								<p class="time">
									<strong>TIME: {{ recipe.Time || "no data" }} min</strong>
								</p>
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
			</li>
		</ul>
		<Button
			class="button-add-to-book"
			label="Add recipe to Your book" />
	</div>
</template>

<script setup>
import { ref } from "vue";
import Button from "primevue/button";
const props = defineProps({
	recipe: Object,
});

const showIngridients = ref(false);
const hiddenButton = ref(false);

const displayIngridients = () => {
	showIngridients.value = true;
	hiddenButton.value = true;
};
const getIndexInArray = (index) => {
	return index + 1;
};
</script>

<style scoped>
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

.allergy-icon-box {
	max-height: 70px;
	max-width: 70px;
}

.allergy-icon {
	width: 50px;
	height: 50px;
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
	position: relative;
	display: flex;
	width: 100%;
	min-height: 1px;
	padding: 15px;
	max-width: 100%;
	border-radius: 10px;
	background-color: #faf8f7;
	justify-content: flex-end;
	align-items: center;
}
.recipe-name {
	display: contents;
	width: 20rem;
	max-height: 100%;
	font-size: 20px;
	margin-top: 0.5rem !important;
}
.recipe-tags {
	display: inline-block;
	font-size: 22px;
	max-height: 100%;
	margin-top: 0.5rem !important;
}
.recipe-tags ul {
	display: flex;
	justify-content: flex-end;
}
.bottom-row {
	position: relative;
	display: block;
	margin-right: 1rem;
	margin-left: -1rem;
	width: 100%;
	min-height: 1px;
	padding-right: 15px;
	padding-left: 15px;
	max-width: 100%;
	background-color: #fff;
}

img {
	border-radius: 3rem;
}
.recipe-image {
	float: left;
	padding: 2rem;
	padding-right: 1rem;
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
.set-time {
	display: inline-flex;
	align-items: center;
	float: right;
	height: 100%;
	min-width: 6rem;
	border: 1px solid black;
	border-radius: 10px;
	padding-top: 1.5rem;
	padding-bottom: 1.5rem;
	margin-left: 0.5rem;
}
.time {
	font-size: 17px;
	padding-right: 0.5rem;
	padding-left: 0.5rem;
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
	margin: 1rem;
}
@media (max-width: 1100px) {
	.recipe-box {
		flex-direction: column;
		align-items: center;
		border: solid;
		max-width: 500px;
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
}
</style>
