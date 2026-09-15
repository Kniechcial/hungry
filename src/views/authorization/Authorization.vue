<template>
	<div class="auth-page">
		<div class="auth-tabs">
			<TabMenu
				:model="items"
				v-model:active-index="indexId" />
		</div>
		<component :is="currentComponent"></component>
	</div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import TabMenu from "primevue/tabmenu";
import SingIn from "@/components/user/create_new_user/SingIn.vue";
import LogIn from "@/components/user/log_in/LogIn.vue";

const router = useRouter();
const route = useRoute();

const items = [
	{
		label: "Register",
		command: () => changeComponent("register"),
	},
	{
		label: "Login",
		command: () => changeComponent("login"),
	},
];

const initial = route.params.findBy === "register" ? "register" : "login";
const findBy = ref(initial);
const indexId = ref(initial === "register" ? 0 : 1);

const changeComponent = (next) => {
	findBy.value = next;
	indexId.value = next === "register" ? 0 : 1;
	router.push(`/authorization/${next}`);
};

watch(
	() => route.params.findBy,
	(value) => {
		if (value === "register" || value === "login") {
			findBy.value = value;
			indexId.value = value === "register" ? 0 : 1;
		}
	}
);

const currentComponent = computed(() => (findBy.value === "register" ? SingIn : LogIn));
</script>

<style scoped>
.auth-page {
	max-width: 32rem;
	margin: 2rem auto 0;
	padding: 0 1rem;
}
.auth-tabs {
	display: flex;
	justify-content: center;
}
.auth-tabs :deep(.p-tabmenu) {
	background: transparent;
}
</style>
