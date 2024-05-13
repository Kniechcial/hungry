<template>
	<div class="carrot-box">
		<carrotDialog
			class="carrot"
			v-if="isLoading"></carrotDialog>
	</div>
	<!-- <div class="content">
		<div class="card flex justify-content-center p-3">
			<MultiSelect
				v-model="selectedTags"
				:options="tagListStore.fetchedTags"
				filter
				optionValue="name"
				optionLabel="display_name"
				placeholder="Select Tags..."
				:maxSelectedLabels="3"
				class="w-full md:w-20rem" />
		</div>
	</div> -->
	<div class="box-property">
		<div>
			<p>Get Your Tags:</p>
			<div class="get-tags">
				<button
					class="button-chose"
					v-for="(item, index) in displayedItems"
					:key="index">
					{{ item.display_name }}
				</button>
				<button
					class="button-chose show-less"
					@click="toggleShow">
					{{ showAll ? "Pokaż mniej" : "Pokaż więcej" }}
				</button>
			</div>
		</div>
		<div>
			<p>Get Your Ingridients:</p>
			<div class="get-ingridients">
				<p class="secect-property">Obiekt 1</p>
				<p class="secect-property">Obiekt 2</p>
				<p class="secect-property">Obiekt 3</p>
				<p class="secect-property">Obiekt 1</p>
				<p class="secect-property">Obiekt 2</p>
				<p class="secect-property">Obiekt 3</p>
			</div>
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
import { computed } from "vue";
import Button from "primevue/button";
// import { useRecipeStore } from "../../../stores/recipes.js";
import { useTagsListStore } from "../../../stores/tags.js";
import Toast from "primevue/toast";
import carrotDialog from "@/components/Reusable/carrotDialog.vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

// const recipeStore = useRecipeStore();
const tagListStore = useTagsListStore();
const router = useRouter();
const isLoading = ref(false);
const recipesLoading = ref(false);
// const selectedTags = ref();
const toast = useToast();

const numberOfItemsToShow = ref(6);
const showAll = ref(false);

const toggleShow = () => {
	showAll.value = !showAll.value;
	if (!showAll.value) {
		numberOfItemsToShow.value = 6;
	}
};

const displayedItems = computed(() => {
	return tagListStore.fetchedTags.filter((item, index) => {
		return showAll.value || index < numberOfItemsToShow.value;
	});
});

const showMoreTags = () => {
	numberOfItemsToShow.value = numberOfItemsToShow.value = Infinity;
};

const BaseRecipeList = () => router.push({ name: "RecipeList" });

async function getRecipe() {
	isLoading.value = true;
	await recipeStore.getRecipes(0, 2, selectedTags.value);
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
</script>

<style scoped>
/* .content {
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
} */

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

.box-property {
	display: flex;
	justify-content: space-between;
}
.get-tags {
	order: 1;
	margin-left: 10%;
	margin-right: 50%;
}

.get-tags,
.get-ingridients {
	display: flex;
	flex-wrap: wrap;
	padding: 1rem;
	border-radius: 10px;
	/* border: 1px solid black; */
}
.get-ingridients {
	order: 2;
	margin-right: 10%;
}

.button-chose {
	font-size: 16px;
	font-weight: 200;
	letter-spacing: 1px;
	padding: 0.7rem;
	margin: 0.4rem;
	outline: 0;
	border: 1px solid black;
	cursor: pointer;
	position: relative;
	background-color: rgba(0, 0, 0, 0);
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
}
.button-chose:after {
	content: "";
	background-color: #ffe54c;
	width: 100%;
	z-index: -1;
	position: absolute;
	height: 100%;
	top: 7px;
	left: 7px;
	transition: 0.2s;
}

.show-less:after {
	background-color: #3dd1e7;
}
.button-chose:hover:after {
	top: 0px;
	left: 0px;
}
@media (min-width: 768px) {
	.button-chose {
		padding: 13px 50px 13px;
	}
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
