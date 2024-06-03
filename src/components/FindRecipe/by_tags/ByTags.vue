<template>
	<div class="carrot-box">
		<carrotDialog
			class="carrot"
			v-if="isLoading"></carrotDialog>
	</div>
	<div class="main-box">
		<div class="box-property">
			<div
				v-if="!selectedCategory"
				class="select-category">
				<div>
					<div class="paragraph">
						<strong
							>Select the category you would like to choose tags to describe the
							dish</strong
						>
					</div>
					<div class="category-button-box">
						<button
							class="button-chose"
							v-for="category in tagListStore.categorys"
							:key="category"
							@click="toggleShowCategory(category)">
							{{ category }}
						</button>
					</div>
				</div>
			</div>
			<div
				v-else
				class="get-tags">
				<div>
					<div class="paragraph">
						<strong
							>Select the tags you would like to choose to describe the
							dish</strong
						>
					</div>
				</div>
				<div class="tag-button-box">
					<button
						class="button-chose"
						v-for="(item, index) in filteredTags"
						:key="item"
						@click="getChosedTag(item)">
						{{ item.display_name }}
					</button>
				</div>
				<button
					class="button-chose show-less"
					@click="toggleShow">
					{{ showAll ? "Show less" : "Show more" }}
				</button>
				<button
					class="button-chose show-less"
					@click="toggleShowCategory(null)">
					Show Category
				</button>
			</div>
		</div>
		<div class="get-user-chose">
			<div>
				<div class="paragraph">
					<strong>Your selected tags: </strong>
				</div>
				<div v-if="userChosed.length === 0">
					<p class="description">
						You haven't selected any tag yet. Click on the tag you are
						interested in to add it to your search. You can select a maximum of
						five tags at a time.
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
	</div>
</template>

<script setup>
import { ref } from "vue";
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

const showAll = ref(false);
const showAllCategory = ref(true);
const userChosed = ref([]);
const selectedCategory = ref(null);

//  Categorys List

const toggleShowCategory = (category) => {
	selectedCategory.value = category;
};
const filteredTags = computed(() =>
	tagListStore.fetchedTags.filter(
		(tag) => tag.root_tag_type === selectedCategory.value
	)
);
// Chosed Tag
const getChosedTag = (item) => {
	if (userChosed.value.length < 5) {
		const checkDuplicate = userChosed.value.some(
			(tag) => tag.display_name === item.display_name
		);
		if (!checkDuplicate) {
			userChosed.value.push(item);
			console.log(userChosed.value);
		} else {
			showErrorElementExist();
			console.log("Ten element już istnieje w tabeli.");
		}
	} else {
		showErrorMaxElements();
		console.log("Tabela zawiera już 5 elementów");
	}
};

const deleteSelectedTag = (index) => {
	userChosed.value.splice(index, 1);
};

const toggleShow = () => {
	showAll.value = !showAll.value;
	if (filteredTags.value.length < 5) {
		return filteredTags.value.slice(0, 5);
	}
};
//

// Get Recipe

const BaseRecipeList = () => router.push({ name: "RecipeList" });

const toggleToGetRecipes = () => {
	getRecipe();
};

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

//  Error

const showError = () => {
	toast.add({
		severity: "error",
		summary: "Error Message",
		detail: "Sorry, no results found. Try again ",
		life: 3000,
	});
};
const showErrorElementExist = () => {
	toast.add({
		severity: "error",
		summary: "Error Message",
		detail: "This item already exists in the table.",
		life: 3000,
	});
};
const showErrorMaxElements = () => {
	toast.add({
		severity: "error",
		summary: "Error Message",
		detail: "The table already contains the maximum number of elements",
		life: 3000,
	});
};

//
</script>

<style scoped>
.category-button-box,
.tag-button-box {
	max-height: 20rem;
	overflow: auto;
	margin-bottom: 0.5rem;
}

.tag-button-box {
	max-height: 15rem;
}
.main-box {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
.base-card {
	border: 1px solid;
	border-color: aliceblue;
	border-radius: 10px;
	background-color: #fcffff;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	z-index: 0;
	color: #44424d;
}
.select-category,
.get-user-chose,
.get-tags {
	position: absolute;
	padding: 1rem;
	position: relative;
	border: 1px solid;
	border-color: aliceblue;
	border-radius: 10px;
	background-color: #fcffff;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	z-index: 0;
	color: #44424d;
}

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
	margin-bottom: 1rem;
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
	box-sizing: border-box;
}
.get-tags,
.select-category {
	/* max-height: 28.5rem; */
	max-height: 25rem;
}
.get-user-chose {
	max-height: 25rem;
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
@media (max-width: 1000px) {
	.paragraph {
		font-size: 14px;
	}
	.main-box {
		flex-direction: column;
		display: grid;
		justify-content: center;
	}
	.select-category,
	.get-user-chose,
	.get-tags {
		width: 100%;
		border: 1px solid black;
		justify-content: center;
	}
	.get-user-chose {
		margin: none;
	}
	.box-property {
		width: 100%;
		/* align-items: center; */
	}
	.description {
		font-size: 12px;
	}
	.button-box {
		scale: 0.7;
	}
	.button-chose {
		font-size: 14px;
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
