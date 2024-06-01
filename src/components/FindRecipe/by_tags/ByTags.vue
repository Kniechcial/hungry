<template>
	<div class="carrot-box">
		<carrotDialog
			class="carrot"
			v-if="isLoading"></carrotDialog>
	</div>
	<div class="get-user-chose">
		<div>
			<p>
				<strong class="paragraph">Your selected tags: </strong>
			</p>
			<div v-if="userChosed.length === 0">
				<p class="description">
					You haven't selected any tag yet. Click on the tag you are interested
					in to add it to your search. You can select a maximum of five tags at
					a time.
				</p>
			</div>
		</div>
		<div v-if="userChosed">
			<button
				class="button-chose show-less"
				v-for="(item, index) in userChosed"
				:key="index"
				@click="deleteSelectedTag(index)">
				{{ item.display_name }}
			</button>
		</div>
		<Toast />
		<div class="button-box">
			<div class="card flex justify-content-center">
				<Button
					@click="toggleToGetRecipes()"
					label="Find recipe" />
			</div>
		</div>
	</div>
	<div class="box-property">
		<div class="get-tags">
			<div>
				<strong class="paragraph"
					>Select the tags you would like to choose to describe the dish</strong
				>
			</div>
			<button
				class="button-chose"
				v-for="(item, index) in displayedItems"
				:key="index"
				@click="getChosedTag(item)">
				{{ item.display_name }}
			</button>
			<button
				class="button-chose show-less"
				@click="toggleShow">
				{{ showAll ? "Pokaż mniej" : "Pokaż więcej" }}
			</button>
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from "vue";
import { computed } from "vue";
import Button from "primevue/button";
import { useRecipeStore } from "../../../stores/recipes.js";
import { useTagsListStore } from "../../../stores/tags.js";
import { useRecipeStoreByTags } from "../../../stores/recipesByTags.js";
import Toast from "primevue/toast";
import carrotDialog from "@/components/reusable/carrotDialog.vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

const recipeStore = useRecipeStore();
const tagListStore = useTagsListStore();
const recipeStoreByTags = useRecipeStoreByTags();
const router = useRouter();
const isLoading = ref(false);
const recipesLoading = ref(false);

const toast = useToast();

const numberOfItemsToShow = ref(6);
const showAll = ref(false);
const userChosed = ref([]);

const getChosedTag = (item) => {
	if (userChosed.value.length < 5) {
		const checkDuplicate = userChosed.value.some(
			(tag) => tag.display_name === item.display_name
		);
		if (!checkDuplicate) {
			userChosed.value.push(item);
			console.log(userChosed.value);
		} else {
			console.log("Ten element już istnieje w tabeli.");
		}
	} else {
		console.log("Tabela zawiera już 5 elementów");
	}
};

const deleteSelectedTag = (index) => {
	userChosed.value.splice(index, 1);
};

watch(userChosed);

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

const toggleToGetRecipes = () => {
	getRecipe();
};

//
async function getRecipe() {
	isLoading.value = true;
	const selectedTags = userChosed.value
		.map((tag) => tag.display_name)
		.join(",");
	await recipeStoreByTags.getRecipes(0, 5, selectedTags);
	console.log(recipeStoreByTags.fetchedRecipes);
	recipesLoading.value = false;
	if (recipeStoreByTags.fetchedRecipes.length === 0) {
		showError();
		isLoading.value = !isLoading.value;
	} else {
		BaseRecipeList();
	}
}
//

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
.description {
	font-size: 18px;
	margin-left: auto;
	margin-right: auto;
}
p {
	margin-top: 1rem;
	margin-left: auto;
	margin-right: auto;
}
.paragraph {
	font-size: 22px;
}

.button-box {
	margin-top: 1rem;
	margin-left: 7rem;
}
.carrot {
	position: relative;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 1;
}
.carrot-box {
	position: relative;
	animation: moveUpDown 0.7s infinite alternate;
}

.box-property {
	width: 35%;
	margin: 3% 3%;
	/* border: 1px solid black; */
	box-sizing: border-box;
	/* display: flex; */
}
.get-user-chose {
	float: right;
	width: 30%;
	margin: 3% 5%;
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
root_tag_type
