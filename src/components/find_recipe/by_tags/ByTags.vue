<template>
	<div class="tags-page">
		<div class="panel">
			<div v-if="!selectedCategory">
				<h3 class="panel-title">Pick a category</h3>
				<p class="panel-hint">
					Choose a category, then narrow it down with specific tags. You can pick
					up to five.
				</p>
				<div class="pill-row scrollable">
					<button
						class="pill"
						v-for="item in tastyStore.categorys"
						:key="item"
						@click="toggleShowCategory(item)">
						{{ formatTagName(item) }}
					</button>
				</div>
			</div>
			<div v-else>
				<div class="panel-header">
					<h3 class="panel-title">Tags in {{ formatTagName(selectedCategory) }}</h3>
					<button
						class="text-button"
						@click="toggleShowCategory(null)">
						<i class="pi pi-arrow-left"></i>
						All categories
					</button>
				</div>
				<div class="pill-row scrollable">
					<template
						v-for="(item, index) in filteredTags"
						:key="index">
						<button
							v-if="showAllCategory || index < 8"
							class="pill"
							@click="getChosedTag(item)">
							{{ item.display_name }}
						</button>
					</template>
				</div>
				<button
					v-if="filteredTags.length > 8"
					class="text-button"
					@click="toggleShow">
					{{ showAllCategory ? "Show less" : `Show ${filteredTags.length - 8} more` }}
				</button>
			</div>
		</div>

		<div class="panel">
			<h3 class="panel-title">Your tags</h3>
			<p
				v-if="userChosed.length === 0"
				class="panel-hint">
				Nothing selected yet. Pick tags on the left — click a pill to remove it.
			</p>
			<div
				v-else
				class="chip-list">
				<span
					v-for="(item, index) in userChosed"
					:key="index"
					class="chip"
					role="button"
					@click="deleteSelectedTag(index)"
					:title="`Remove ${item.display_name}`">
					{{ item.display_name }}
					<i class="pi pi-times chip-remove"></i>
				</span>
			</div>
			<div class="panel-actions">
				<span class="chip-count">{{ userChosed.length }} / 5</span>
				<Button
					:disabled="disabledBUttonFindRecipe"
					@click="toggleToGetRecipes()"
					label="Find recipes"
					icon="pi pi-search" />
			</div>
		</div>
	</div>
	<div
		v-if="isLoadingLoader"
		class="loader">
		<CarrotLoader></CarrotLoader>
	</div>
	<Toast
		class="w-18rem md:w-4"
		position="top-right" />
</template>

<script setup>
import { ref, computed } from "vue";
import Button from "primevue/button";
import Toast from "primevue/toast";
import { useTastyStore } from "../../../stores/tasty.js";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import CarrotLoader from "../../Reusable/CarrotLoader.vue";

const tastyStore = useTastyStore();
const toast = useToast();
const router = useRouter();

const userChosed = ref([]);
const selectedCategory = ref(null);
const foodName = ref(null);
const showAllCategory = ref(false);
const isLoadingLoader = ref(false);

const formatTagName = (name) => {
	const clean = name.replaceAll("_", " ");
	return clean.charAt(0).toUpperCase() + clean.slice(1);
};

const toggleShowCategory = (category) => {
	selectedCategory.value = category;
	showAllCategory.value = false;
};

const filteredTags = computed(() =>
	tastyStore.fetchedTags.filter(
		(tag) => tag.root_tag_type === selectedCategory.value
	)
);

const getChosedTag = (item) => {
	if (userChosed.value.length >= 5) {
		showError("You already have five tags");
		return;
	}
	const duplicate = userChosed.value.some(
		(tag) => tag.display_name === item.display_name
	);
	if (duplicate) {
		showError("That tag is already selected");
	} else {
		userChosed.value.push(item);
	}
};

const deleteSelectedTag = (index) => {
	userChosed.value.splice(index, 1);
};

const disabledBUttonFindRecipe = computed(
	() => userChosed.value.length === 0
);

const toggleShow = () => {
	showAllCategory.value = !showAllCategory.value;
};

const NavigateToBaseRecipeList = () =>
	router.push({
		name: "RecipeList",
		query: {
			storeType: "tasty",
			foodName: foodName.value,
			buttonType: true,
		},
	});

const toggleToGetRecipes = () => {
	getRecipe();
};

async function getRecipe() {
	isLoadingLoader.value = true;
	const selectedTags = userChosed.value
		.map((tag) => tag.display_name)
		.join(",");

	await tastyStore.getRecipes(0, 100, selectedTags);
	foodName.value = selectedTags;
	isLoadingLoader.value = false;
	if (tastyStore.fetchedRecipes.length === 0) {
		showError();
	} else {
		NavigateToBaseRecipeList();
	}
}

const showError = (message) => {
	toast.add({
		severity: "warn",
		detail: message || "Sorry, no results found. Try again.",
		life: 3000,
	});
};
</script>

<style scoped>
.tags-page {
	max-width: 60rem;
	margin: 2rem auto;
	padding: 0 1rem;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: 1.25rem;
}

.panel {
	background: var(--color-surface);
	color: var(--color-text);
	border-radius: var(--radius-card);
	box-shadow: var(--shadow-card);
	padding: 1.5rem;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

.panel-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 0.75rem;
	flex-wrap: wrap;
}

.panel-title {
	font-family: var(--font-heading);
	font-weight: 600;
	font-size: 1.25rem;
	margin: 0;
}

.panel-hint {
	color: var(--color-text-muted);
	margin: 0;
	line-height: 1.5;
}

.pill-row {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
}
.scrollable {
	max-height: 16rem;
	overflow-y: auto;
	padding-right: 0.25rem;
}

.pill {
	padding: 0.5rem 0.9rem;
	background: var(--color-surface-alt);
	color: var(--color-text);
	border: 1px solid var(--color-border);
	border-radius: 999px;
	font-family: var(--font-body);
	font-size: 0.9375rem;
	cursor: pointer;
	transition: background 0.15s, transform 0.15s, border-color 0.15s;
}
.pill:hover {
	background: var(--color-accent);
	border-color: var(--color-accent);
	color: var(--color-text);
	transform: translateY(-1px);
}

.text-button {
	align-self: flex-start;
	background: none;
	border: 0;
	padding: 0.25rem 0;
	color: var(--color-primary);
	font-weight: 600;
	font-family: var(--font-body);
	font-size: 0.9375rem;
	cursor: pointer;
	display: inline-flex;
	align-items: center;
	gap: 0.35rem;
}
.text-button:hover {
	color: var(--color-primary-hover);
}

.chip-list {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin-top: 0.25rem;
}
.chip {
	display: inline-flex;
	align-items: center;
	gap: 0.4rem;
	padding: 0.4rem 0.85rem;
	background: var(--color-surface-alt);
	border: 1px solid var(--color-border);
	border-radius: 999px;
	color: var(--color-text);
	font-weight: 500;
	cursor: pointer;
	transition: background 0.15s, transform 0.15s;
}
.chip:hover {
	background: var(--color-border);
	transform: translateY(-1px);
}
.chip-remove {
	font-size: 0.75rem;
	color: var(--color-danger);
}

.panel-actions {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: auto;
	padding-top: 0.75rem;
	gap: 0.75rem;
}
.chip-count {
	color: var(--color-text-muted);
	font-size: 0.875rem;
	font-weight: 600;
}

@media (max-width: 640px) {
	.tags-page {
		grid-template-columns: 1fr;
	}
	.panel {
		padding: 1.25rem;
	}
}
</style>
