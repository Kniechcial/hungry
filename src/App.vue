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
:root {
	--color-bg: #fbf3ea;
	--color-surface: #ffffff;
	--color-surface-alt: #f3e9dc;
	--color-text: #3a2a20;
	--color-text-muted: #7a6a5d;
	--color-primary: #c1502e;
	--color-primary-hover: #a13f22;
	--color-secondary: #6b7a4f;
	--color-accent: #e0a537;
	--color-danger: #9e3b34;
	--color-border: #e6d9c8;
	--shadow-card: 0 8px 24px rgba(58, 42, 32, 0.12);
	--radius-card: 16px;
	--font-heading: "Fraunces", Georgia, serif;
	--font-body: "Karla", -apple-system, BlinkMacSystemFont, sans-serif;
}

* {
	box-sizing: border-box;
}
body {
	min-height: 87vh;
	width: 100%;
	margin: 0;
	background-color: var(--color-bg);
	color: var(--color-text);
	font-family: var(--font-body);
	--sb-track-color: var(--color-surface-alt);
	--sb-thumb-color: var(--color-primary);
	--sb-size: 13px;
}

h1,
h2,
h3 {
	font-family: var(--font-heading);
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

/* PrimeVue theme overrides — lara-light-amber ships compiled hex values,
   not CSS vars, so these target its actual component selectors directly. */
.p-button {
	background: var(--color-primary) !important;
	border-color: var(--color-primary) !important;
}
.p-button:not(:disabled):hover {
	background: var(--color-primary-hover) !important;
	border-color: var(--color-primary-hover) !important;
}
.p-button.p-button-outlined,
.p-button.p-button-text {
	background: transparent !important;
	color: var(--color-primary) !important;
}
.p-inputtext:enabled:focus,
.p-multiselect:not(.p-disabled).p-focus,
.p-dropdown:not(.p-disabled).p-focus {
	border-color: var(--color-primary) !important;
	box-shadow: 0 0 0 0.2rem rgba(193, 80, 46, 0.25) !important;
}
.p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-highlight .p-menuitem-link {
	border-color: var(--color-primary) !important;
	color: var(--color-primary) !important;
}
.p-tabmenu
	.p-tabmenu-nav
	.p-tabmenuitem:not(.p-highlight):not(.p-disabled):hover
	.p-menuitem-link {
	color: var(--color-primary) !important;
}
.p-menubar {
	background: var(--color-surface) !important;
	border-color: var(--color-border) !important;
	font-family: var(--font-body);
}
.p-menubar .p-menuitem.p-highlight > .p-menuitem-content .p-menuitem-link,
.p-menubar
	.p-menuitem.p-highlight
	> .p-menuitem-content
	.p-menuitem-link
	.p-menuitem-icon,
.p-menubar
	.p-menuitem:not(.p-highlight):not(.p-disabled)
	> .p-menuitem-content:hover
	.p-menuitem-link {
	color: var(--color-primary) !important;
}
.p-dialog .p-dialog-header {
	background: var(--color-surface) !important;
	color: var(--color-text) !important;
}
.p-checkbox .p-checkbox-box.p-highlight,
.p-radiobutton .p-radiobutton-box.p-highlight {
	background: var(--color-primary) !important;
	border-color: var(--color-primary) !important;
}
</style>
