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
import { authStore } from "./stores/authStore";
import { auth } from "@/fireBase.js";
import { useRouter } from "vue-router";

const useAuthStore = authStore();
const useTastyStore = tastyStore();
const router = useRouter();

async function getTags() {
	await useTastyStore.getTags();
}

onMounted(async () => {
	// Jeśli userDetails są wprowadzone, czyli użytkownik wprowadził dane to ta funkcja sprawdza czy są poprawne  i jeśli są to przypisuje je do user a jeśli ich nie ma to user ma null.
	auth.onAuthStateChanged(async (userDetails) => {
		if (userDetails) {
			useAuthStore.user = {
				email: userDetails.email,
				password: userDetails.password,
				uid: userDetails.uid,
			};
			router.push({ name: "HomeView" });
		} else {
			useAuthStore.user = null;
		}
	});
	getTags();
});
</script>
<style>
body {
	min-height: 87vh;
	box-sizing: border-box;
	margin: 0;
}
</style>
