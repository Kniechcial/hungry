<template>
	<div class="main-bar">
		<div class="menu-slot">
			<Menubar :model="filteredMenuItems" />
		</div>
		<div
			class="avatar-slot"
			ref="avatarContainer">
			<span
				v-if="authStore.user"
				class="avatar-email">
				{{ authStore.user.email }}
			</span>
			<Avatar
				:label="userInitial"
				icon="pi pi-user"
				:class="[
					'user-avatar',
					authStore.user ? 'user-avatar-authed' : 'user-avatar-guest',
				]"
				size="large"
				shape="circle"
				@click="toggleMenu" />
			<Menu
				:model="avatarItems"
				v-if="authStore.user"
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
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const router = useRouter();

const avatarMenu = ref(null);
const avatarContainer = ref(null);

const userInitial = computed(() => {
	const email = authStore.user?.email;
	return email ? email.charAt(0).toUpperCase() : "";
});

const toggleMenu = (event) => {
	if (!authStore.user) {
		navigateToAuthorization();
	} else {
		avatarMenu.value.toggle(event);
	}
};

const navigateToAuthorization = () => {
	router.push({
		name: "Authorization",
		params: { findBy: "login" },
	});
};

const handleClickOutside = (event) => {
	if (avatarContainer.value && !avatarContainer.value.contains(event.target)) {
		avatarMenu.value?.hide?.();
	}
};

onMounted(() => {
	document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
	document.removeEventListener("click", handleClickOutside);
});

const avatarItems = ref([
	{
		label: "Logout",
		icon: "pi pi-sign-out",
		command: () => {
			authStore.logoutUser();
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
		label: "Find a recipe",
		icon: "pi pi-search",
		command: () => {
			router.push({
				name: "FindRecipe",
				params: { findBy: "name" },
			});
		},
	},
	{
		label: "My recipes",
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
	{
		label: "New recipe",
		icon: "pi pi-plus",
		command: () => {
			router.push({ name: "CreateRecipe" });
		},
	},
]);

const filteredMenuItems = computed(() => {
	if (authStore.user) {
		return items.value;
	}
	return items.value.filter((item) =>
		["Home", "Find a recipe"].includes(item.label)
	);
});
</script>

<style scoped>
.main-bar {
	position: sticky;
	top: 0;
	z-index: 100;
	display: flex;
	align-items: stretch;
	background: var(--color-surface);
	border-bottom: 1px solid var(--color-border);
	box-shadow: 0 2px 12px rgba(58, 42, 32, 0.06);
	padding: 0 0.75rem;
}

.menu-slot {
	flex: 1;
	min-width: 0;
}

.menu-slot :deep(.p-menubar) {
	background: transparent !important;
	border: 0 !important;
	padding: 0.5rem 0.25rem !important;
}

.menu-slot :deep(.p-menuitem-text) {
	font-family: var(--font-body);
	font-weight: 600;
	letter-spacing: 0.01em;
}

.avatar-slot {
	display: flex;
	align-items: center;
	gap: 0.75rem;
	padding: 0 0.75rem;
	position: relative;
}

.avatar-email {
	color: var(--color-text-muted);
	font-size: 0.875rem;
	max-width: 14rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.user-avatar {
	cursor: pointer;
	transition: transform 0.15s ease, box-shadow 0.15s ease;
	font-weight: 700;
}

.user-avatar:hover {
	transform: translateY(-1px);
	box-shadow: 0 4px 12px rgba(58, 42, 32, 0.15);
}

.user-avatar-guest {
	background-color: var(--color-surface-alt) !important;
	color: var(--color-text-muted) !important;
	border: 1px solid var(--color-border);
}

.user-avatar-authed {
	background-color: var(--color-primary) !important;
	color: #fff !important;
}

@media (max-width: 720px) {
	.main-bar {
		padding: 0 0.25rem;
	}
	.avatar-email {
		display: none;
	}
	.avatar-slot {
		padding: 0 0.5rem;
	}
	.user-avatar {
		width: 2.4rem !important;
		height: 2.4rem !important;
	}
}
</style>
