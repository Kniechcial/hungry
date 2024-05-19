<template>
	<body>
		<Header></Header>
		<NavigateMainBar></NavigateMainBar>
		<router-view></router-view>
	</body>
	<Footer></Footer>
</template>

<script setup>
import Header from "./components/Reusable/Header.vue";
import Footer from "./components/Reusable/Footer.vue";
import NavigateMainBar from "./components/Reusable/NavigateMainBar.vue";

components: {
	Header, Footer, NavigateMainBar;
}

import { onMounted } from "vue";
import { useRecipeStore } from "./stores/recipes";
import { useTagsListStore } from "./stores/tags";

const recipeStore = useRecipeStore();
const tagListStore = useTagsListStore();

onMounted(() => {
	getTags();
});

async function getTags() {
	await tagListStore.getTags();
	isLoading.value = false;
	if (recipeStore.fetchedRecipes.length === 0) {
		showError();
	}
}
</script>
<style>
body {
	min-height: 87vh;
}
</style>
