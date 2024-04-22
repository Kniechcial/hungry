<template>
	<div class="carrot-box">
		<carrotDialog
			class="carrot"
			v-if="isLoading"></carrotDialog>
	</div>
	<div class="content">
		<div class="card flex justify-content-center">
			<div class="flex flex-column gap-2">
				<label for="recipe">Dish name</label>
				<InputText
					id="recipe"
					v-model="foodName"
					:feedback="false"
					aria-describedby="recipe-help" />
				<small id="recipe-help">Enter name dish to find recipe.</small>
			</div>
		</div>
		<div class="card flex justify-content-center p-3">
			<MultiSelect
				v-model="selectedTags"
				:options="Tags"
				filter
				optionLabel="name"
				placeholder="Select Tags..."
				:maxSelectedLabels="3"
				class="w-full md:w-20rem" />
		</div>
	</div>
	<Toast />
	<div class="button-box">
		<div class="card flex justify-content-center">
			<Button
				@click="getRecipe()"
				label="Find recipe" />
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useRecipeStore } from "../../../stores/recipes.js";
import carrotDialog from "@/components/Reusable/carrotDialog.vue";
import { useRouter } from "vue-router";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import MultiSelect from "primevue/multiselect";

const recipeStore = useRecipeStore();
const router = useRouter();
const foodName = ref(null);
const isLoading = ref(false);
const recipesLoading = ref(false);
const toast = useToast();

const BaseRecipeList = () => router.push({ name: "RecipeList" });

async function getRecipe() {
	isLoading.value = true;
	await recipeStore.getRecipes(0, 2, foodName.value);
	console.log(recipeStore.fetchedRecipes);
	recipesLoading.value = false;
	if (recipeStore.fetchedRecipes.length === 0) {
		showError();
		isLoading.value = !isLoading.value;
	} else {
		BaseRecipeList();
	}
}

const showError = () => {
	toast.add({
		severity: "error",
		summary: "Error Message",
		detail: "Sorry, no results found. Try again ",
		life: 3000,
	});
};

const selectedTags = ref();
const Tags = ref([
	{ name: "British" },
	{ name: "chicken soup" },
	{ name: "London" },
	{ name: "Istanbul" },
	{ name: "Paris" },
]);
</script>

<style scoped>
.content {
	position: relative;
	border: 1px solid black;
	border-radius: 10px;
	background-color: #faf8f7;
	padding: 1rem;
	margin-top: 10rem;
	width: max-content;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 22px;
	box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
}
.button-box {
	margin-left: 7rem;
}
.carrot {
	position: relative;
	left: 60%;
	transform: translate(-50%, -50%);
	z-index: 1;
}
.carrot-box {
	position: relative;
	animation: moveUpDown 0.7s infinite alternate;
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
