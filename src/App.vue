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
import { useToast } from "primevue/usetoast";

const toast = useToast();

const recipeStore = useRecipeStore();
const tagListStore = useTagsListStore();

onMounted(() => {
	getTags();
});

async function getTags() {
	await tagListStore.getTags();
	if (!recipeStore.fetchedRecipes) {
		showError();
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
<style>
body {
	min-height: 87vh;
}
</style>
