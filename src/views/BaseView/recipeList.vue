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
										<strong>{{ recipe.name }}</strong>
										<!-- 
											Jak mogę zrobić coś takiego jak w wordzie "zawijanie tekstu"? Chodzi mi o coś takiego że nazwa mojego dania jest na tyle długa że wychodzi poza box. Chciał bym w takim przypadku żeby tekst się w jakiś sposób podzielił i wyświetlił w 2 linijkach.
										 -->
									</li>
								</ul>
							</div>
							<div class="set-time">
								<p class="time">
									<strong>CZAS: {{ recipe.Time || 'No data'}} min</strong>
									<!-- 
										Jak mogę zareagować w przypadku gdy dana wartość nie jest podana z API. Np. Nie dostaję informacji z API o czasie przygotowania dania. Chciał bym mieć możliwość wyświetlić jakąś informację dla użytkownika, a nie zostawiać puste okno.
									 -->
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
										<strong>
											Kalorie: {{ recipe.calories.calories }} kcal</strong
										>
										<ul class="calories-specific">
											<li>
												<strong>Tłuszcze:</strong>
												<p>{{ recipe.calories.fat }} kcal</p>
											</li>
											<li>
												<strong>Cukry:</strong>
												<p>{{ recipe.calories.sugar }} kcal</p>
											</li>
											<li>
												<strong>Węglowodany:</strong>
												<p>{{ recipe.calories.carbohydrates }} kcal</p>
											</li>
										</ul>
									</div>
									<div class="ingridiens-recipe">
										<div
											v-if="!hiddenButton"
											class="card flex justify-content-center mt-4 pl-5 cursor-pointer">
											<Button
												@click="displayIngridients"
												label="Pokaż składniki" />
										</div>
										<ul
											class="ingredients-specific"
											v-if="showIngridients">
											<strong>Składniki:</strong>
											<div
												v-for="(name, value, unit) in recipe.ingridients"
												:key="name">
												<li>
													{{ name.name }}
													<p>
														{{ name.value }} <strong>{{ name.unit }}</strong>
													</p>
												</li>
											</div>
										</ul>
									</div>
								</div>
								<div class="right-part-description-recipe">
									<div class="description-recipe">
										<Strong class="description-topic">Opis:</Strong>
										<div
											v-for="(step, index) in recipe.instructions"
											:key="index">
											<ul>
												<strong>Krok: {{ getIndexInArray(index) }}</strong>
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
	</div>
</template>

<script setup>
import { ref } from "vue";
// import image from "@/assets/icon/bg/pizza.jpg";
import Button from "primevue/button";

import { useRecipeStore } from "../../stores/recipes.js";

const props =  defineProps({
    recipe: Object,
})


const showIngridients = ref(false);
const hiddenButton = ref(false);

const displayIngridients = () => {
	showIngridients.value = true;
	hiddenButton.value = true;
};
const getIndexInArray = (index) => {
	// Funkcja zwracająca miejsce w tablicy
	return index + 1; // Dodaj 1, aby uzyskać indeksowanie od 1, jeśli to jest preferowane
};
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
	margin-top: 0.5rem !important;
}
.recipe-tags {
	float: right;
	font-size: 20px;
	max-height: 100%;
	margin-top: 0.5rem !important;
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
	/* border: 3px solid black;
	border-radius: 10px; */
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
	overflow: hidden;
	/* border: 3px solid black;
	border-radius: 10px; */
}
.ingridiens-recipe {
	/* border: 3px solid red;
	border-radius: 10px; */
	max-width: 20rem;
}
.description-recipe {
	display: block;
	padding-left: 1rem;
	height: 100%;
	font-size: 16px;
}
.calories-recipe {
	display: block;
	max-width: 20rem;
	font-size: 16px;
	/* border: 3px solid gold; */
}

.left-part-description-recipe {
	width: 40%;
	float: left;
}
.right-part-description-recipe {
	width: 60%;
	float: right;
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
	display: block;
	float: right;
	height: 100%;
	border: 1px solid black;
	border-radius: 10px;
	padding-top: 1.5rem;
	padding-bottom: 1.5rem;
	margin-right: -15px !important;
	margin-left: 0.5rem;
	background-color: #ecf005;
}
.time {
	font-size: 16px;
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
</style>
