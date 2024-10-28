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


import { onMounted } from "vue";
import { useTastyStore } from "./stores/tasty.js";
import { useAuthStore } from "./stores/authStore";
import { auth } from "@/fireBase.js";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const tastyStore = useTastyStore();
const router = useRouter();

async function getTags() {
	await tastyStore.getTags();
}

onMounted(async () => {
	auth.onAuthStateChanged(async (userDetails) => {
		if (userDetails) {
			authStore.user = {
				email: userDetails.email,
				password: userDetails.password,
				uid: userDetails.uid,
			};
			router.push({ name: "HomeView" });
		} else {
			authStore.user = null;
		}
	});
	getTags();
});
</script>
<style>
* {
	box-sizing: border-box;
}
body {
	min-height: 87vh;
	width: 100%;
	margin: 0;
	--sb-track-color: #777777;
	--sb-thumb-color: #22c55e;
	--sb-size: 13px;
}

body::-webkit-scrollbar {
	width: var(--sb-size);
}

body::-webkit-scrollbar-track {
	background: var(--sb-track-color);
	border-radius: 9px;
}

body::-webkit-scrollbar-thumb {
	background: var(--sb-thumb-color);
	border-radius: 9px;
}

@supports not selector(::-webkit-scrollbar) {
	body {
		scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
		scrollbar-width: thin;
	}
}
</style>
