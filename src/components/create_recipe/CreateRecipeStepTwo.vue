<template>
	<div class="wizard-card">
		<h2 class="section-title">Numbers & ingredients</h2>

		<div class="row-two">
			<div class="field">
				<label
					class="field-label"
					for="time"
					>Preparation time</label
				>
				<InputNumber
					id="time"
					v-model="time"
					:min="1"
					suffix=" min"
					class="w-full"
					@input="clearError('time')" />
				<span
					class="show-error"
					v-if="errors.time"
					>Enter a valid preparation time.</span
				>
			</div>

			<div class="field">
				<div class="field-label">Add calorie info?</div>
				<SelectButton
					v-model="hasCalories"
					:options="[
						{ label: 'No', value: false },
						{ label: 'Yes', value: true },
					]"
					option-label="label"
					option-value="value" />
			</div>
		</div>

		<div
			v-if="hasCalories"
			class="calorie-grid">
			<div class="field">
				<label
					class="field-label"
					for="calTotal"
					>Total</label
				>
				<InputNumber
					id="calTotal"
					v-model="calorieTotal"
					:min="0"
					suffix=" kcal"
					class="w-full" />
			</div>
			<div class="field">
				<label
					class="field-label"
					for="calFat"
					>Fat</label
				>
				<InputNumber
					id="calFat"
					v-model="calorieFat"
					:min="0"
					suffix=" kcal"
					class="w-full" />
			</div>
			<div class="field">
				<label
					class="field-label"
					for="calSugar"
					>Sugar</label
				>
				<InputNumber
					id="calSugar"
					v-model="calorieSugar"
					:min="0"
					suffix=" kcal"
					class="w-full" />
			</div>
			<div class="field">
				<label
					class="field-label"
					for="calCarbs"
					>Carbohydrates</label
				>
				<InputNumber
					id="calCarbs"
					v-model="calorieCarbs"
					:min="0"
					suffix=" kcal"
					class="w-full" />
			</div>
		</div>
		<span
			class="show-error"
			v-if="errors.calories"
			>Fill in all calorie values or turn calorie info off.</span
		>

		<div class="field">
			<div class="field-label">Ingredients</div>
			<div class="ingredient-input-row">
				<InputText
					v-model="ingredientDraftName"
					placeholder="Name"
					class="ingredient-name"
					@keydown.enter.prevent="addIngredient" />
				<InputNumber
					v-model="ingredientDraftValue"
					:min="0"
					placeholder="Amount"
					class="ingredient-value" />
				<Dropdown
					v-model="ingredientDraftUnit"
					:options="unitOptions"
					placeholder="Unit"
					class="ingredient-unit" />
				<Button
					label="Add"
					icon="pi pi-plus"
					@click="addIngredient" />
			</div>
			<div
				v-if="ingredients.length"
				class="ingredient-list">
				<span
					v-for="(item, index) in ingredients"
					:key="index"
					class="ingredient-pill"
					@click="removeIngredient(index)"
					role="button"
					:title="`Remove ${item.name}`">
					{{ item.name }}
					<strong>{{ item.value }}</strong>
					<span class="ingredient-unit-text">{{ item.unit }}</span>
					<i class="pi pi-times ingredient-remove"></i>
				</span>
			</div>
			<span
				class="show-error"
				v-if="errors.ingredients"
				>Add at least one ingredient.</span
			>
		</div>

		<div
			v-if="recap"
			class="recap">
			<div class="recap-title">Recipe so far</div>
			<div class="recap-row">
				<strong>Name:</strong>
				<span>{{ recap.name }}</span>
			</div>
			<div
				v-if="recap.dietTags?.length || recap.containsTags?.length"
				class="recap-row">
				<strong>Tags:</strong>
				<span>{{ recapTags }}</span>
			</div>
			<div class="recap-row">
				<strong>Steps:</strong>
				<span>{{ recap.steps?.length ?? 0 }}</span>
			</div>
		</div>

		<div class="wizard-actions">
			<Button
				label="Back"
				icon="pi pi-arrow-left"
				severity="secondary"
				outlined
				@click="$emit('back')" />
			<Button
				label="Add recipe"
				icon="pi pi-check"
				:loading="loading"
				@click="onSubmit" />
		</div>
	</div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Dropdown from "primevue/dropdown";
import SelectButton from "primevue/selectbutton";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";

const props = defineProps({
	initial: { type: Object, default: () => null },
	recap: { type: Object, default: () => null },
	loading: { type: Boolean, default: false },
});
const emit = defineEmits(["back", "submit"]);
const toast = useToast();

const time = ref(props.initial?.Time ?? null);
const hasCalories = ref(props.initial?.hasCalories ?? false);
const calorieTotal = ref(props.initial?.calories?.calories ?? null);
const calorieFat = ref(props.initial?.calories?.fat ?? null);
const calorieSugar = ref(props.initial?.calories?.sugar ?? null);
const calorieCarbs = ref(props.initial?.calories?.carbohydrates ?? null);

const unitOptions = ["pcs", "g", "kg", "ml", "l", "tbsp", "tsp", "cup"];
const ingredients = ref(
	(props.initial?.ingridients ?? []).map((item) => ({ ...item }))
);
const ingredientDraftName = ref("");
const ingredientDraftValue = ref(null);
const ingredientDraftUnit = ref(null);

const errors = reactive({
	time: false,
	calories: false,
	ingredients: false,
});

const clearError = (key) => {
	errors[key] = false;
};

const recapTags = computed(() =>
	[...(props.recap?.dietTags ?? []), ...(props.recap?.containsTags ?? [])].join(
		", "
	)
);

const addIngredient = () => {
	const name = ingredientDraftName.value.trim();
	if (!name || ingredientDraftValue.value == null || !ingredientDraftUnit.value) {
		toast.add({
			severity: "warn",
			detail: "Fill name, amount and unit before adding.",
			life: 2500,
		});
		return;
	}
	const duplicate = ingredients.value.some(
		(item) => item.name.toLowerCase() === name.toLowerCase()
	);
	if (duplicate) {
		toast.add({
			severity: "warn",
			detail: "This ingredient is already on the list.",
			life: 2500,
		});
		return;
	}
	ingredients.value.push({
		name,
		value: ingredientDraftValue.value,
		unit: ingredientDraftUnit.value,
	});
	ingredientDraftName.value = "";
	ingredientDraftValue.value = null;
	ingredientDraftUnit.value = null;
	errors.ingredients = false;
};

const removeIngredient = (index) => {
	ingredients.value.splice(index, 1);
};

const validate = () => {
	errors.time = !time.value || time.value <= 0;
	errors.ingredients = ingredients.value.length === 0;
	if (hasCalories.value) {
		errors.calories =
			calorieTotal.value == null ||
			calorieFat.value == null ||
			calorieSugar.value == null ||
			calorieCarbs.value == null;
	} else {
		errors.calories = false;
	}
	return !errors.time && !errors.ingredients && !errors.calories;
};

const buildCalories = () => {
	if (hasCalories.value) {
		return {
			calories: calorieTotal.value,
			fat: calorieFat.value,
			sugar: calorieSugar.value,
			carbohydrates: calorieCarbs.value,
		};
	}
	return {
		calories: null,
		fat: null,
		sugar: null,
		carbohydrates: null,
	};
};

const onSubmit = () => {
	if (!validate()) {
		toast.add({
			severity: "error",
			detail: "Please complete the highlighted fields.",
			life: 3000,
		});
		return;
	}
	emit("submit", {
		Time: time.value,
		hasCalories: hasCalories.value,
		calories: buildCalories(),
		ingridients: ingredients.value.map((item) => ({ ...item })),
	});
};
</script>

<style scoped>
.wizard-card {
	background: var(--color-surface);
	color: var(--color-text);
	border-radius: var(--radius-card);
	box-shadow: var(--shadow-card);
	padding: 2rem;
	max-width: 46rem;
	margin: 2rem auto;
}
.section-title {
	margin: 0 0 1.5rem;
	font-family: var(--font-heading);
	font-weight: 600;
}
.row-two {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1.5rem;
}
.field {
	margin-bottom: 1.25rem;
}
.field-label {
	display: block;
	font-weight: 600;
	margin-bottom: 0.5rem;
}
.w-full {
	width: 100%;
}
.calorie-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;
	background: var(--color-surface-alt);
	border-radius: 12px;
	padding: 1rem;
	margin-bottom: 1rem;
}
.calorie-grid .field {
	margin-bottom: 0;
}
.ingredient-input-row {
	display: grid;
	grid-template-columns: 2fr 1fr 1fr auto;
	gap: 0.5rem;
	align-items: center;
}
.ingredient-list {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin-top: 0.75rem;
}
.ingredient-pill {
	display: inline-flex;
	align-items: center;
	gap: 0.4rem;
	background: var(--color-surface-alt);
	color: var(--color-text);
	padding: 0.4rem 0.75rem;
	border-radius: 999px;
	border: 1px solid var(--color-border);
	cursor: pointer;
	transition: background 0.15s;
}
.ingredient-pill:hover {
	background: var(--color-border);
}
.ingredient-unit-text {
	color: var(--color-text-muted);
}
.ingredient-remove {
	color: var(--color-danger);
	font-size: 0.8rem;
	margin-left: 0.25rem;
}
.recap {
	background: var(--color-surface-alt);
	border-radius: 12px;
	padding: 1rem 1.25rem;
	margin-bottom: 1.25rem;
}
.recap-title {
	font-family: var(--font-heading);
	font-weight: 600;
	margin-bottom: 0.5rem;
}
.recap-row {
	display: flex;
	gap: 0.5rem;
	font-size: 0.9375rem;
	padding: 0.15rem 0;
}
.wizard-actions {
	display: flex;
	justify-content: flex-end;
	gap: 0.75rem;
}
.show-error {
	display: block;
	color: var(--color-danger);
	font-size: 0.8125rem;
	font-weight: 600;
	margin-top: 0.375rem;
}

@media (max-width: 650px) {
	.wizard-card {
		padding: 1.25rem;
		margin: 1rem;
	}
	.row-two,
	.calorie-grid,
	.ingredient-input-row {
		grid-template-columns: 1fr;
	}
}
</style>
