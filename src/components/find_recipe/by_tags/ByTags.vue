<template>
	<div class="main-box">
		<div class="left-box box-content">
			<div v-if="!selectedCategory">
				<strong class="paragraph"
					>Select the category you would like to choose tags to describe the
					dish</strong
				>
				<div class="category-box">
					<button
						class="button-chose"
						v-for="item in useTastyStore.categorys"
						:key="item"
						@click="toggleShowCategory(item)">
						{{ formatTagName(item) }}
					</button>
				</div>
			</div>
			<div v-else>
				<strong class="paragraph"
					>Select the tags you would like to choose to describe the dish</strong
				>
				<div class="tag-box">
					<span
						v-for="(item, index) in filteredTags"
						:key="index">
						<button
							v-if="showAll || (!showAll && index < 5)"
							class="button-chose"
							@click="getChosedTag(item)">
							{{ item.display_name }}
						</button>
					</span>
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
		<div class="right-box box-content">
			<div>
				<strong class="paragraph">Your selected tags: </strong>
				<div v-if="userChosed.length === 0">
					<p class="description">
						You haven't selected any tag yet. Click on the tag you are
						interested in to add it to your search. You can select a maximum of
						five tags at a time.
					</p>
				</div>
			</div>
			<div v-if="userChosed">
				<div>
					<button
						class="button-chose show-less"
						v-for="(item, index) in userChosed"
						:key="index"
						@click="deleteSelectedTag(index)">
						{{ item.display_name }}
					</button>
				</div>
			</div>
			<Toast />
			<div class="button-box">
				<div class="card flex justify-content-center">
					<Button
						:disabled="disabledBUttonFindRecipe"
						@click="toggleToGetRecipes()"
						label="Find recipe" />
				</div>
			</div>
		</div>
	</div>
	<div
		v-if="isLoading"
		class="loader">
		<CarrotLoader></CarrotLoader>
	</div>
	<Toast />
</template>

<script setup>
import { ref, computed } from "vue";
import Button from "primevue/button";
import Toast from "primevue/toast";
import { tastyStore } from "../../../stores/tasty.js";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import CarrotLoader from "@/components/reusable/CarrotLoader.vue";

const isLoading = ref(false);
const useTastyStore = tastyStore();
const router = useRouter();
const toast = useToast();

const numberOfItemsToShow = ref(6);
const showAll = ref(false);
const showAllCategory = ref(true);
const userChosed = ref([]);
const selectedCategory = ref(null);
const foodName = ref(null);

const formatTagName = (name) => {
	let nameA = name.replaceAll("_", " ");
	let nameB = nameA.charAt(0).toUpperCase() + nameA.slice(1);
	return nameB;
};

// Category List
const toggleShowCategory = (category) => {
	selectedCategory.value = category;
	showAll.value = false;
};

const filteredTags = computed(() =>
	useTastyStore.fetchedTags.filter(
		(tag) => tag.root_tag_type === selectedCategory.value
	)
);

// Chosen Tag
const getChosedTag = (item) => {
	if (userChosed.value.length < 5) {
		const checkDuplicate = userChosed.value.some(
			(tag) => tag.display_name === item.display_name
		);
		if (!checkDuplicate) {
			userChosed.value.push(item);
			console.log(userChosed.value);
		} else {
			showError("That tag is already chose");
			console.log("Ten element już istnieje w tabeli.");
		}
	} else {
		console.log("Tabela zawiera już 5 elementów");
		showError("You have already five tags");
	}
};

const deleteSelectedTag = (index) => {
	userChosed.value.splice(index, 1);
};
const disabledBUttonFindRecipe = computed(() => {
	return userChosed.value.length === 0;
});

const toggleShow = () => {
	showAll.value = !showAll.value;
};

const displayedItems = computed(() => {
	return useTastyStore.fetchedTags.filter((item, index) => {
		return showAll.value || index < numberOfItemsToShow.value;
	});
});

const BaseRecipeList = () =>
	router.push({
		name: "RecipeList",
		query: {
			storeType: "tasty",
			foodName: foodName,
		},
	});

const toggleToGetRecipes = () => {
	getRecipe();
};

async function getRecipe() {
	isLoading.value = true;

	const selectedTags = userChosed.value
		.map((tag) => tag.display_name)
		.join(",");

	await useTastyStore.getRecipes(0, 100, selectedTags);
	foodName.value = selectedTags;
	console.log(useTastyStore.fetchedRecipes);
	isLoading.value = false;
	if (useTastyStore.fetchedRecipes.length === 0) {
		showError();
	} else {
		BaseRecipeList();
	}
}

const showError = (message) => {
	toast.add({
		severity: "error",
		summary: "Error Message",
		detail: message || "Sorry, no results found. Try again",
		life: 3000,
	});
};
</script>

<style scoped>
.main-box {
	display: flex;
	justify-content: space-between;
	margin: 0 2rem;
	flex-wrap: wrap;
}

.box-content {
	position: relative;
	padding: 1rem;
	border: 1px solid;
	border-color: aliceblue;
	border-radius: 10px;
	background-color: #fcffff;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	z-index: 0;
	color: #44424d;
}

.left-box {
	height: 24rem;
	width: 37%;
	margin-top: 2rem;
	z-index: 1;
	max-width: 37%;
}
.right-box {
	height: 24rem;
	width: 37%;
	margin-top: 2rem;
	max-width: 37%;
}

.category-box {
	margin: 2rem 1rem;
	max-height: 14rem;
	overflow: auto;
}
.tag-box {
	margin: 2rem 1rem;
	max-height: 12rem;
	overflow: auto;
}

p {
	margin-top: 1rem;
	margin-left: auto;
	margin-right: auto;
}
.paragraph {
	font-size: 22px;
	width: 100%;
	margin: 0;
	box-sizing: border-box;
}

.button-box {
	margin-top: 1rem;
	margin-left: 7rem;
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
@media (max-width: 1250px) {
	.main-box {
		flex-direction: column;
		align-items: center;
		margin: 0 1rem;
	}
	.left-box,
	.right-box {
		width: 100%;
		max-width: 65%;
		margin: 1rem 0;
	}
}
@media (max-width: 1000px) {
	.left-box,
	.right-box {
		width: 100%;
		max-width: 65%;
		margin: 1rem 0;
	}
	.description {
		font-size: 14px;
	}
	.paragraph {
		font-size: 16px;
	}
}
@media (max-width: 650px) {
	.left-box,
	.right-box {
		width: 100%;
		max-width: none;
		margin: 1rem 0;
	}
}
</style>
