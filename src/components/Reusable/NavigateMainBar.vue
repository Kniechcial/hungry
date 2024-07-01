<template>
	<div class="mainBar">
		<div class="card firstObject">
			<Menubar :model="items" />
		</div>
		<div
			class="avatar"
			@click="navigateToAuthorization()">
			<Avatar
				icon="pi pi-user"
				class="avatar-design"
				size="large"
				shape="circle" />
		</div>
	</div>
</template>
<script setup>
import { ref } from "vue";

import Avatar from "primevue/avatar";

import Menubar from "primevue/menubar";
import { useRouter } from "vue-router";

const navigateToAuthorization = () => {
	router.push({
		name: "Authorization",
		params: { findBy: "register" },
	});
};

const router = useRouter();
const items = ref([
	// {
	// 	label: "Autorisation",
	// 	command: () => {
	// 		router.push({
	// 			name: "Authorization",
	// 			params: { findBy: "register" },
	// 		});
	// 	},
	// },
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
					router.push({ name: "myRecipe" });
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
]);
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
.avatar {
	position: absolute;
	z-index: 1;
	right: 1rem;
	top: 50%;
	transform: translateY(-50%);
}
.avatar-design {
	background-color: rgb(204, 206, 204);
	cursor: pointer;
}
</style>
