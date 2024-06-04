<template>
	<div class="carrot-box">
		<carrotDialog
			class="carrot"
			v-if="isLoading"></carrotDialog>
	</div>

	<div class="card flex justify-content-center">
		<TabMenu
			:model="items"
			class="card flex" />
	</div>
	<component :is="currentComponent"></component>
</template>

<script setup>
import { ref, defineComponent } from "vue";
import carrotDialog from "@/components/reusable/carrotDialog.vue";
import TabMenu from "primevue/tabmenu";
import BaseDescription from "@/components/find_recipe/base_descrtiption/BaseDescription.vue";
import ByIngredients from "../../components/find_recipe/by_ingredients/ByIngredients.vue";
import ByName from "../../components/find_recipe/by_name/ByName.vue";
import ByTags from "../../components/find_recipe/by_tags/ByTags.vue";
import Random from "../../components/find_recipe/random_recipe/RandomRecipe.vue";

const isLoading = ref(false);

//

import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { computed } from "vue";
const router = useRouter();
const route = useRoute();
const findBy = ref(route.params.findBy);
const newFindBy = ref(null);
const currentComponent = computed(() => {
	switch (findBy.value) {
		case "name":
			return ByName;
		case "ingredients":
			return ByIngredients;
		case "random":
			return Random;
		case "tags":
			return ByTags;
		case "base-description":
			return BaseDescription;
		default:
			return null;
	}
});
const changeComponent = (newFindBy) => {
	findBy.value = newFindBy;
	router.push(`/find-recipe/${newFindBy}`);
};

//

defineComponent({
	components: {
		ByTags,
		ByName,
		ByIngredients,
		Random,
	},
});

const items = ref([
	{
		label: "Name",
		icon: "pi pi-tags",
		command: () => {
			newFindBy.value = "name";
			changeComponent(newFindBy.value);
		},
	},
	{
		label: "Ingredients",
		icon: "pi pi-list",
		command: () => {
			newFindBy.value = "ingredients";
			changeComponent(newFindBy.value);
		},
	},
	{
		label: "Tags",
		icon: "pi pi-list",
		command: () => {
			newFindBy.value = "tags";
			changeComponent(newFindBy.value);
		},
	},
	{
		label: "Random",
		icon: "pi pi-list",
		command: () => {
			newFindBy.value = "random";
			changeComponent(newFindBy.value);
		},
	},
]);
</script>

<style scoped>
.button-box {
	margin-left: 7rem;
}
.carrot {
	position: relative;
	left: 60%;
	transform: translate(-50%, -50%);
	z-index: 1;
}
.carrot-box {
	position: relative;
	animation: moveUpDown 0.7s infinite alternate;
}

@keyframes moveUpDown {
	from {
		top: 0;
	}
	to {
		top: 20px;
	}
}
</style>
