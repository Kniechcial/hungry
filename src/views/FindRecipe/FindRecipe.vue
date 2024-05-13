<template>
	<Toast />
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
	<ByIngridients v-if="displayByIngridients"></ByIngridients>
	<ByNameOrTag v-if="displayByNameOrTag"></ByNameOrTag>
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
import ByIngridients from "../../components/FindRecipe/ByIngridients/ByIngridients.vue";
import ByNameOrTag from "../../components/FindRecipe/ByNameTag/ByNameTag.vue";
import { onMounted } from "vue";
import { useRecipeStore } from "../../stores/recipes.js";
import { useTagsListStore } from "../../stores/tags.js";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";

const recipeStore = useRecipeStore();
const tagListStore = useTagsListStore();
const toast = useToast();
const isLoading = ref(false);
const displayByIngridients = ref(false);
const displayByNameOrTag = ref(false);
const displayBaseDescription = ref(true);

defineComponent({
	components: {
		ByIngridients,
		ByNameOrTag,
	},
});

onMounted(() => {
	getTags();
});

async function getTags() {
	await tagListStore.getTags();
	isLoading.value = false;
	if (recipeStore.fetchedRecipes.length === 0) {
		showError();
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

const items = ref([
	{
		label: "Name or tag",
		icon: "pi pi-tags",
		command: () => {
			displayByNameOrTag.value = true;
			displayByIngridients.value = false;
			displayBaseDescription.value = false;
		},
	},
	{
		label: "Ingridients",
		icon: "pi pi-list",
		command: () => {
			displayByNameOrTag.value = false;
			displayByIngridients.value = true;
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
