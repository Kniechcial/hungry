<template>
	<div class="carrot-box">
		<carrotDialog
			class="carrot"
			v-if="isLoading"></carrotDialog>
	</div>

	<div class="card flex justify-content-center">
		<TabMenu
			:model="items"
			class="card flex" />
	</div>
	<ByTags v-if="displayByTags"></ByTags>
	<ByName v-if="displayByName"></ByName>
	<Random v-if="displayRandom"></Random>
	<ByIngredients v-if="displayByIngredients"></ByIngredients>

	<div
		v-if="displayBaseDescription"
		class="base-description">
		<div class="description">
			<h3>Select how you want to search for a recipe</h3>
		</div>
		<p>
			If you want to search by dish name or type of dish, select the first
			option "Name or Tag". However, if you want to search for the dish you are
			interested in by ingredients, select the second option "Ingridients".
		</p>
		<strong>ENJOY YOUR MEAL!</strong>
	</div>
</template>

<script setup>
import { ref, defineComponent } from "vue";
import carrotDialog from "@/components/Reusable/carrotDialog.vue";
import TabMenu from "primevue/tabmenu";
import ByName from "../../components/FindRecipe/ByName/ByName.vue";
import ByIngredients from "../../components/FindRecipe/ByIngredients/ByIngredients.vue";
import ByTags from "../../components/FindRecipe/ByTags/ByTags.vue";
import Random from "../../components/FindRecipe/RandomRecipe/RandomRecipe.vue";

const isLoading = ref(false);
const displayByName = ref(false);
const displayByIngredients = ref(false);
const displayByTags = ref(false);
const displayRandom = ref(false);
const displayBaseDescription = ref(true);

defineComponent({
	components: {
		ByTags,
		ByName,
		ByIngredients,
		Random,
	},
});

const items = ref([
	{
		label: "Name",
		icon: "pi pi-tags",
		command: () => {
			displayByName.value = true;
			displayByIngredients.value = false;
			displayByTags.value = false;
			displayRandom.value = false;
			displayBaseDescription.value = false;
		},
	},
	{
		label: "Ingredients",
		icon: "pi pi-list",
		command: () => {
			displayByName.value = false;
			displayByIngredients.value = true;
			displayByTags.value = false;
			displayRandom.value = false;
			displayBaseDescription.value = false;
		},
	},
	{
		label: "Tags",
		icon: "pi pi-list",
		command: () => {
			displayByName.value = false;
			displayByIngredients.value = false;
			displayByTags.value = true;
			displayRandom.value = false;
			displayBaseDescription.value = false;
		},
	},
	{
		label: "Random",
		icon: "pi pi-list",
		command: () => {
			displayByName.value = false;
			displayByIngredients.value = false;
			displayByTags.value = false;
			displayRandom.value = true;
			displayBaseDescription.value = false;
		},
	},
]);
</script>

<style scoped>
.base-description {
	position: relative;
	padding: 1rem;
	border: 1px solid black;
	color: #261474;
	max-width: 55rem;
	margin-top: 3rem;
	margin-left: auto;
	margin-right: auto;
	border-radius: 10px;
	background-color: #faf8f7;
}
.description {
	font-size: 22px;
	margin-left: auto;
	margin-right: auto;
}
p {
	margin-top: 1rem;
	margin-left: auto;
	margin-right: auto;
}

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
