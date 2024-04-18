<template>
	<div class="container">
		<div class="recipe-box">
			<div class="top-row">
				<div class="recipe-name">
					<ul>
						<li>
							<strong>Nazwa dnia</strong>
						</li>
					</ul>
				</div>
				<div>
					<ul>
						<div class="get-time">
							<p><strong>Czas:</strong></p>
							<div class="input-details-calories">
								<div class="card flex justify-content-center">
									<InputNumber
										v-model="time"
										cols="5"
										class="select-time-allergy" />
								</div>
								<span
									class="showError"
									v-if="errorTime"
									>Błędnie wpowadzony czas!</span
								>
							</div>
						</div>
						<div class="get-time">
							<p><strong>Alergie:</strong></p>
							<div class="card flex justify-content-center">
								<Dropdown
									v-model="alergy"
									:options="alergys"
									optionLabel="name"
									checkmark
									cols="8"
									:highlightOnSelect="false"
									class="select-time-allergy" />
							</div>
							<span
								class="showError"
								v-if="errorAlergy"
								>Błędnie wpowadzony alergie!</span
							>
						</div>
					</ul>
				</div>
			</div>
			<div class="bottom-row">
				<div>
					<img
						class="recipe-image"
						:src="image"
						alt="Zdjęcie" />
				</div>

				<div class="details">
					<div class="left-part-description-recipe">
						<div class="calories-recipe">
							<strong>Kalorie:</strong>
							<ul class="calories-specific">
								<li>
									<div class="input-details">
										<strong>Tłuszcze:</strong>
										<div class="input-details-calories">
											<form @submit="onSubmit">
												<div class="card">
													<Textarea
														v-model="fat"
														autoResize
														rows="1"
														cols="8" />
												</div>
											</form>
										</div>
										<p>kcal</p>
									</div>
								</li>
								<li>
									<div class="input-details">
										<strong>Cukry:</strong>
										<div class="input-details-calories">
											<form @submit="onSubmit">
												<div class="card">
													<Textarea
														v-model="sugar"
														autoResize
														rows="1"
														cols="8" />
												</div>
											</form>
										</div>
										<p>kcal</p>
									</div>
								</li>
								<li>
									<div class="input-details">
										<strong>Węglowodany:</strong>
										<div class="input-details-calories">
											<form @submit="onSubmit">
												<div class="card">
													<Textarea
														v-model="carbohydrates"
														autoResize
														rows="1"
														cols="8" />
												</div>
											</form>
										</div>
										<p>kcal</p>
									</div>
								</li>
								<span
									class="showError"
									v-if="errorCalories"
									>Błędnie wpowadzone kalorie!</span
								>
							</ul>
						</div>
						<div class="ingridiens-recipe">
							<ul class="ingredients-specific">
								<strong>Składniki:</strong>
								<li>
									<div class="input-details">
										<p>Składnik 1</p>
										<div class="input-details-calories">
											<form @submit="onSubmit">
												<div class="card">
													<Textarea
														v-model="ingridientValue"
														autoResize
														rows="1"
														cols="8" />
												</div>
											</form>
										</div>
										<div class="card flex justify-content-center">
											<Dropdown
												v-model="ingridientQuantity"
												:options="quantity"
												optionLabel="name"
												checkmark
												:highlightOnSelect="false"
												class="select-quantity" />
										</div>
									</div>
									<span
										class="showError"
										v-if="errorIngridient"
										>Błędnie wpowadzony składnik!</span
									>
								</li>
							</ul>
						</div>
					</div>
					<div class="right-part-description-recipe">
						<div class="description-recipe">
							<div>
								<p>
									Opis potrawy Lorem ipsum dolor sit amet, consectetur
									adipisicing elit. Esse, delectus dolorem sunt corrupti ipsam
									impedit. Repellat, eveniet itaque dolores eius aliquam
									exercitationem, non sit praesentium quam temporibus corporis!
									Alias, dolorum!
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="down-bar">
				<div class="button-location">
					<div class="card">
						<Toast />
						<Button
							type="button"
							label="Dodaj przepis"
							icon="pi pi-check"
							:loading="loading"
							@click="addFinalyRecipe" />
					</div>
				</div>
				<div class="button-location">
					<div class="card">
						<Toast />
						<Button
							type="button"
							label=" Cofnij "
							icon="pi pi-arrow-left"
							:loading="loading"
							@click="backToNewRecip1" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import image from "../../assets/icon/bg2.jpg";

import Button from "primevue/button";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import InputNumber from "primevue/inputnumber";
import { useRouter } from "vue-router";
const router = useRouter();
import Dropdown from "primevue/dropdown";
import Textarea from "primevue/textarea";

const toast = useToast();

const time = ref();
const alergy = ref();
const fat = ref();
const sugar = ref();
const carbohydrates = ref();
const ingridientValue = ref();
const ingridientQuantity = ref();
const errorTime = ref(false);
const errorCalories = ref(false);
const errorIngridient = ref(false);
const errorAlergy = ref(false);
const loading = ref(false);

const showIngridients = ref(false);
const hiddenButton = ref(false);

const displayIngridients = () => {
	showIngridients.value = true;
	hiddenButton.value = true;
};
const quantity = ref([{ name: " szt." }, { name: " ml" }, { name: " g" }]);
const alergys = ref([
	{ name: "Brak" },
	{ name: "Gluten" },
	{ name: "Mięso" },
	{ name: "Ryby" },
	{ name: "Laktoza" },
]);

const checkTime = () => {
	if (!time.value) {
		errorTime.value = true;
	} else {
		errorTime.value = false;
	}
};
const checkAlergys = () => {
	if (!alergy.value) {
		errorAlergy.value = true;
	} else {
		errorAlergy.value = false;
	}
};
const checkCalories = () => {
	if (!fat.value || !sugar.value || !carbohydrates.value) {
		errorCalories.value = true;
	} else errorCalories.value = false;
};
const checkIngridients = () => {
	if (!ingridientValue.value || !ingridientQuantity.value) {
		errorIngridient.value = true;
	} else {
		errorIngridient.value = false;
	}
};
const showError = () => {
	toast.add({
		severity: "error",
		detail: "Danie nie zostało dodane!",
		life: 3000,
	});
};
const addFinalyRecipe = () => {
	checkTime();
	checkAlergys();
	checkCalories();
	checkIngridients();
	if (
		time.value &&
		alergy.value &&
		fat.value &&
		sugar.value &&
		carbohydrates.value &&
		ingridientValue.value &&
		ingridientQuantity.value
	) {
		loading.value = true;
		setTimeout(() => {
			loading.value = false;
		}, 2000);
		console.log("przepis dodany");
	} else {
		showError();
	}
};

const backToNewRecip1 = () => {
	router.push({ name: "addRecipe" });
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
}
.ingridiens-recipe {
	max-width: 20rem;
}
.description-recipe {
	display: block;
	padding: 1rem;
	padding-top: 2rem;
	height: 100%;
	font-size: 16px;
}
.calories-recipe {
	display: block;
	max-width: 20rem;
	font-size: 16px;
}

.left-part-description-recipe {
	width: 45%;
	float: left;
}
.right-part-description-recipe {
	width: 55%;
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
.input-details {
	position: relative;
	display: flex;
	flex-wrap: wrap;
}
.input-details-calories {
	margin-inline-start: auto;
	padding-right: 5px;
}

.select-quantity {
	width: 60px;
	height: 20px;
	padding: none;
	text-align: center;
	justify-content: baseline;
}
.get-time {
	position: relative;
	flex-wrap: wrap;
	/* border: 1px solid black; */
	/* border-radius: 10px; */
	display: inline-flex;
	font-style: italic;
	float: right;
	font-size: 20px;
	height: 100%;
	padding: 1rem;
	width: auto;
}

.select-time-allergy {
	height: 25px;
}

.down-bar {
	width: 100%;
	position: relative;
	margin-top: 1rem;
}
.button-location {
	float: right;
	margin-bottom: 1rem;
	margin-right: 1rem;
}
.showError {
	color: red;
	font-size: 12px;
	font-weight: bold;
}
</style>
