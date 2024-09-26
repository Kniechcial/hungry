<template>
	<div class="mainBar">
		<div class="card firstObject">
			<Menubar :model="filteredItems" />
		</div>
		<div
			class="avatar-container"
			@click="navigateToAuthorization()">
			<span
				v-if="useAuthStore.user"
				class="avatar-text">
				{{ useAuthStore.user.email }}</span
			>
			<Avatar
				icon="pi pi-user"
				:class="
					useAuthStore.user ? 'avatar-design-enable' : 'avatar-design-disable'
				"
				size="large"
				shape="circle" />
		</div>
	</div>
</template>
<script setup>
import { ref, computed } from "vue";
import Avatar from "primevue/avatar";
import Menubar from "primevue/menubar";
import { useRouter } from "vue-router";
import { authStore } from "@/stores/authStore";

const useAuthStore = authStore();

const navigateToAuthorization = () => {
	router.push({
		name: "Authorization",
		params: { findBy: "register" },
	});
};

const router = useRouter();
const items = ref([
	{
		label: "Home",
		icon: "pi pi-home",
		command: () => {
			router.push({ name: "HomeView" });
		},
	},
	{
		label: "Recipes",
		icon: "pi pi-sitemap",
		items: [
			{
				label: "My Recipes List",
				icon: "pi pi-book",
				command: () => {
					router.push({
						name: "RecipeList",
						query: {
							storeType: "recipes",
							headerMessage: "Your list of delicious recipes. Enjoy!",
						},
					});
				},
			},
			{
				label: "Add Recipe",
				icon: "pi pi-file-import",
				command: () => {
					router.push({ name: "CreateNewRecipe" });
				},
			},
			{
				label: "Edit Recipe",
				icon: "pi pi-file-edit",
				// command: () => {
				// 	router.push({ name: "newRecipe" });
				// },
			},
			{
				label: "Delete Recipe",
				icon: "pi pi-eraser",
				// command: () => {
				// 	router.push({ name: "newRecipe" });
				// },
			},
		],
	},
	{
		label: "Find New Recipe",
		icon: "pi pi-search",
		command: () => {
			router.push({
				name: "FindRecipe",
				params: { findBy: "base-description" },
			});
		},
	},
	{
		label: "Setting",
		icon: "pi pi-cog",
		command: () => {
			router.push({ name: "user-panel" });
		},
	},
	{
		label: "",
		class: "",
		icon: "pi pi-sign-out",
		command: () => {
			useAuthStore.logoutUser();
		},
	},
]);

const filteredItems = computed(() => {
	if (useAuthStore.user) {
		return items.value;
	}
	return items.value.filter(
		(item) => item.label === "Home" || item.label === "Find New Recipe"
	);
});
</script>
<style>
.mainBar {
	position: relative;
	display: flex;
}
.firstObject {
	position: relative;
	flex-grow: 1;
}

.avatar-container {
	position: absolute;
	z-index: 1;
	right: 1rem;
	top: 50%;
	transform: translateY(-50%);
	display: flex;
	align-items: center;
}

.avatar-text {
	margin-right: 0.5rem;
}

.avatar-design-disable {
	background-color: rgb(204, 206, 204);
	cursor: pointer;
}

.avatar-design-enable {
	background-color: rgb(132, 242, 132);
	cursor: pointer;
}
</style>
