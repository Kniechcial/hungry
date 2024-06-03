<template>
	<body>
		<div class="content">
			<div><h2 class="menu-head">Twoje konto:</h2></div>
			<div class="menu">
				<div class="card flex">
					<PanelMenu
						:model="items"
						class="w-full md:w-20rem" />
				</div>
			</div>
		</div>
	</body>
</template>

<script setup>
import { ref } from "vue";
// import Button from "primevue/button";
import PanelMenu from "primevue/panelmenu";
const value = ref(null);
import { useRouter } from "vue-router";
const router = useRouter();

const items = ref([
	{
		label: "Konto",
		icon: "pi pi-user",
		items: [
			{
				label: "Zmień hasło",
				icon: "pi pi-wrench",
				command: () => {
					router.push({ name: "editPassword" });
				},
			},
			{
				label: "Usuń konto",
				icon: "pi pi-trash",
			},
		],
	},
	{
		label: "Przepisy",
		icon: "pi pi-box",
		items: [
			{
				label: "Moje przepisy",
				icon: "pi pi-list",
			},
			{
				label: "Dodaj nowy przepis",
				icon: "pi pi-pencil",
			},
			{
				label: "Edytuj przepis",
				icon: "pi pi-file-edit",
			},
			{
				label: "Usuń przepis",
				icon: "pi pi-trash",
			},
		],
	},
	{
		label: "Moje menu",
		icon: "pi pi-book",
	},
	{
		label: "Wyloguj się",
		icon: "pi pi-sign-out",
	},
]);
</script>

<style scoped>
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}
.content {
	margin-top: 4rem;
}
.menu {
	margin-left: 2rem;
	height: 33rem;
	width: 15rem;
	font-size: 1.3rem;
	font-weight: 600;
}
.menu-head {
	margin-left: 1rem;
	color: black;
}
</style>
