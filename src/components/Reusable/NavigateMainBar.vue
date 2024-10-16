<template>
	<div class="mainBar">
		<div class="card firstObject">
			<Menubar :model="filteredItems" />
		</div>
		<div
			class="avatar-container"
			ref="avatarContainer">
			<span
				v-if="useAuthStore.user"
				class="avatar-text">
				{{ useAuthStore.user.email }}
			</span>
			<Avatar
				icon="pi pi-user"
				:class="
					useAuthStore.user ? 'avatar-design-enable' : 'avatar-design-disable'
				"
				size="large"
				shape="circle"
				@click="toggleMenu" />
			<Menu
				:model="avatarItems"
				v-if="useAuthStore.user"
				ref="avatarMenu"
				popup
				:baseZIndex="1000" />
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import Avatar from "primevue/avatar";
import Menubar from "primevue/menubar";
import Menu from "primevue/menu";
import { useRouter } from "vue-router";
import { authStore } from "@/stores/authStore";

const useAuthStore = authStore();
const router = useRouter();

const showMenu = ref(false);
const avatarMenu = ref(null);
const avatarContainer = ref(null);

const toggleMenu = (event) => {
	if (!useAuthStore.user) {
		navigateToAuthorization();
	} else {
		avatarMenu.value.toggle(event);
	}
};

const navigateToAuthorization = () => {
	router.push({
		name: "Authorization",
		params: { findBy: "register" },
	});
};
const handleClickOutside = (event) => {
	if (avatarContainer.value && !avatarContainer.value.contains(event.target)) {
		showMenu.value = false;
	}
};

onMounted(() => {
	document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
	document.removeEventListener("click", handleClickOutside);
});

const avatarItems = ref([
	// {
	// 	label: "Setting",
	// 	icon: "pi pi-user",
	// 	command: () => {
	// 		router.push({ name: "user-panel" });
	// 	},
	// },
	{
		label: "Logout",
		icon: "pi pi-sign-out",
		command: () => {
			useAuthStore.logoutUser();
			router.push({
				name: "Authorization",
				params: { findBy: "login" },
			});
		},
	},
]);

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
						name: "UserRecipesList",
						query: {
							storeType: "recipes",
							headerMessage: "Your list of delicious recipes. Enjoy!",
						},
					});
				},
			},
			// {
			// 	label: "Add Recipe",
			// 	icon: "pi pi-file-import",
			// 	command: () => {
			// 		router.push({ name: "CreateNewRecipe" });
			// 	},
			// },
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

<style scoped>
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
	padding: 1rem;
	right: 1rem;
	top: 50%;
	transform: translateY(-50%);
	display: flex;
	align-items: center;
}

.avatar-design-disable {
	background-color: rgb(204, 206, 204);
	cursor: pointer;
}

.avatar-design-enable {
	background-color: rgb(132, 242, 132);
	cursor: pointer;
}
.avatar-text {
	margin-right: 0.75rem;
	font-style: italic;
}

@media (max-width: 650px) {
	.avatar-container {
		padding-right: 0.5rem;
		right: 0rem;
	}
	.avatar-text {
		margin-right: 0.5rem;
	}
	.p-avatar.p-avatar-lg {
		width: 2.3rem;
		height: 2.3rem;
	}
}
</style>
