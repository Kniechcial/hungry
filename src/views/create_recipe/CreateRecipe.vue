<template>
	<main class="wizard-page">
		<div class="wizard-header">
			<Steps
				:model="stepItems"
				:active-index="activeIndex"
				:readonly="true" />
		</div>

		<CreateRecipeStepOne
			v-if="step === 1"
			:initial="stepOneData"
			@next="onStepOneNext" />
		<CreateRecipeStepTwo
			v-else
			:initial="stepTwoData"
			:recap="stepOneData"
			:loading="isSaving"
			@back="step = 1"
			@submit="onSubmit" />

		<Toast
			class="w-18rem md:w-4"
			position="top-right" />
	</main>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import Steps from "primevue/steps";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

import CreateRecipeStepOne from "@/components/create_recipe/CreateRecipeStepOne.vue";
import CreateRecipeStepTwo from "@/components/create_recipe/CreateRecipeStepTwo.vue";
import { useAuthStore } from "@/stores/authStore";
import { useRecipesStore } from "@/stores/recipesStore.js";

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();
const recipesStore = useRecipesStore();

const step = ref(1);
const stepOneData = ref(null);
const stepTwoData = ref(null);
const isSaving = ref(false);

const stepItems = [{ label: "Basics" }, { label: "Details" }];
const activeIndex = computed(() => step.value - 1);

const onStepOneNext = (payload) => {
	stepOneData.value = payload;
	step.value = 2;
};

const buildRecipe = () => {
	const tags = [
		...(stepOneData.value.dietTags ?? []),
		...(stepOneData.value.containsTags ?? []),
	].map((display_name) => ({ display_name }));

	return {
		name: stepOneData.value.name,
		image: stepOneData.value.image,
		tags,
		instructions: stepOneData.value.steps.map((step) => ({ step })),
		Time: stepTwoData.value.Time,
		calories: stepTwoData.value.calories,
		ingridients: stepTwoData.value.ingridients,
		createdAt: Date.now(),
	};
};

const onSubmit = async (payload) => {
	stepTwoData.value = payload;
	if (!authStore.user) {
		toast.add({
			severity: "error",
			detail: "You need to be logged in to save a recipe.",
			life: 3000,
		});
		return;
	}
	isSaving.value = true;
	const result = await recipesStore.addRecipe(buildRecipe());
	isSaving.value = false;

	if (result?.success) {
		toast.add({
			severity: "success",
			detail: result.message ?? "Recipe added successfully!",
			life: 2500,
		});
		router.push({
			name: "UserRecipesList",
			query: {
				storeType: "recipes",
				headerMessage: "Your list of delicious recipes. Enjoy!",
			},
		});
	} else {
		toast.add({
			severity: "error",
			detail: result?.message ?? "Could not add the recipe.",
			life: 3000,
		});
	}
};
</script>

<style scoped>
.wizard-page {
	max-width: 46rem;
	margin: 0 auto;
	padding: 1.5rem 1rem 3rem;
}
.wizard-header {
	max-width: 46rem;
	margin: 0 auto;
}
.wizard-header :deep(.p-steps) {
	background: transparent;
}
</style>
