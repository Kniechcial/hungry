<template>
	<div class="mainBar">
		<div class="card firstObject">
			<Menubar :model="items" />
		</div>
		<div class="avatar">
			<Avatar
				:model="userItems"
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
const router = useRouter();
const userItems = ref([
	{
		label: "Home",
		icon: "pi pi-home",
		command: () => {
			router.push({ name: "MainView" });
		},
	},
	{
		label: "BaseRecipeList",
		icon: "pi pi-book",
		command: () => {
			router.push({ name: "BaseRecipeList" });
		},
	},
]);
const items = ref([
	{
		label: "Home",
		icon: "pi pi-home",
		command: () => {
			router.push({ name: "MainView" });
		},
	},
	{
		label: "BaseRecipeList",
		icon: "pi pi-book",
		command: () => {
			router.push({ name: "BaseRecipeList" });
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
					router.push({ name: "addRecipe" });
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
		items: [
			{
				label: "By Name",
				icon: "pi pi-angle-right",
				command: () => {
					router.push({ name: "recipe" });
				},
			},
			{
				label: "By Ingridients",
				icon: "pi pi-angle-right",
				// command: () => {
				// 	router.push({ name: "newRecipe" });
				// },
			},
			{
				label: "By Tags",
				icon: "pi pi-angle-right",
				// command: () => {
				// 	router.push({ name: "newRecipe" });
				// },
			},
		],
	},
	{
		label: "Setting",
		icon: "pi pi-cog",
		command: () => {
			router.push({ name: "user" });
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
	background-color: lightgreen;
	cursor: pointer;
}
</style>
