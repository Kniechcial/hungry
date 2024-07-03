<template>
	<body>
		<Header></Header>
		<NavigateMainBar></NavigateMainBar>
		<router-view></router-view>
	</body>
	<Footer></Footer>
</template>

<script setup>
import Header from "./components/reusable/Header.vue";
import Footer from "./components/reusable/Footer.vue";
import NavigateMainBar from "./components/reusable/NavigateMainBar.vue";

import { onMounted } from "vue";
import { tastyStore } from "./stores/tasty.js";
import { tastyTagsListStore } from "./stores/tasty.js";
import { useToast } from "primevue/usetoast";
import { authStore } from "./stores/authStore";

const toast = useToast();

const useAuthStore = authStore();
const useTastyStore = tastyStore();
const useTastyTagsListStore = tastyTagsListStore();

onMounted(() => {
	getTags();
	useAuthStore.init();
});

async function getTags() {
	await useTastyTagsListStore.getTags();
	if (!useTastyStore.fetchedRecipes) {
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
	box-sizing: border-box;
	margin: 0;
}
</style>
