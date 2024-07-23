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
import { auth } from "@/fireBase.js";

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
}

onMounted(async () => {
	// Jeśli userDetails są wprowadzone, czyli użytkownik wprowadził dane to ta funkcja sprawdza czy są poprawne  i jeśli są to przypisuje je do user a jeśli ich nie ma to user ma null.
	auth.onAuthStateChanged(async (userDetails) => {
		if (userDetails) {
			authStore.userDetails = user;
		} else {
			user = null;
		}
	});
});
</script>
<style>
body {
	min-height: 87vh;
	box-sizing: border-box;
	margin: 0;
}
</style>
