<template>
	<div class="wizard-card">
		<h2 class="section-title">Basics & method</h2>

		<div class="field">
			<label
				class="field-label"
				for="dishName"
				>Dish name</label
			>
			<InputText
				id="dishName"
				v-model.trim="name"
				placeholder="e.g. Roasted tomato pasta"
				class="w-full"
				@input="clearError('name')" />
			<span
				class="show-error"
				v-if="errors.name"
				>Dish name cannot be empty.</span
			>
		</div>

		<div class="field">
			<label
				class="field-label"
				for="imageUrl"
				>Photo link</label
			>
			<InputText
				id="imageUrl"
				v-model.trim="imageUrl"
				placeholder="https://…"
				class="w-full"
				@input="clearError('image')" />
			<span
				class="show-error"
				v-if="errors.image"
				>Paste a valid image link (http/https).</span
			>
			<div
				v-if="isValidUrl(imageUrl)"
				class="image-preview">
				<img
					:src="imageUrl"
					alt="Recipe photo preview"
					@error="onImageError = true" />
			</div>
		</div>

		<div class="field">
			<div class="field-label">This recipe is</div>
			<div class="checkbox-row">
				<label
					v-for="tag in dietOptions"
					:key="tag"
					class="checkbox-item">
					<Checkbox
						v-model="dietTags"
						:input-id="`diet-${tag}`"
						:value="tag" />
					<span>{{ tag }}</span>
				</label>
			</div>

			<div class="field-label field-label-secondary">Contains</div>
			<div class="checkbox-row">
				<label
					v-for="tag in containsOptions"
					:key="tag.value"
					class="checkbox-item">
					<Checkbox
						v-model="containsTags"
						:input-id="`contains-${tag.value}`"
						:value="tag.value" />
					<span>{{ tag.label }}</span>
				</label>
			</div>
			<p class="field-hint">
				Marking allergens keeps the recipe from being labelled "free" of them.
			</p>
		</div>

		<div class="field">
			<label
				class="field-label"
				for="stepInput"
				>Preparation steps</label
			>
			<div class="step-input-row">
				<Textarea
					id="stepInput"
					v-model="stepDraft"
					auto-resize
					rows="2"
					placeholder="Describe one step, then click Add step."
					class="step-textarea" />
				<Button
					label="Add step"
					icon="pi pi-plus"
					@click="addStep" />
			</div>
			<ol
				v-if="steps.length"
				class="step-list">
				<li
					v-for="(step, index) in steps"
					:key="index">
					<span class="step-text">{{ step }}</span>
					<Button
						icon="pi pi-times"
						text
						rounded
						aria-label="Remove step"
						@click="removeStep(index)" />
				</li>
			</ol>
			<span
				class="show-error"
				v-if="errors.steps"
				>Add at least one preparation step.</span
			>
		</div>

		<div class="wizard-actions">
			<Button
				label="Next"
				icon="pi pi-arrow-right"
				icon-pos="right"
				@click="onNext" />
		</div>
	</div>
</template>

<script setup>
import { ref, reactive } from "vue";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";

const props = defineProps({
	initial: { type: Object, default: () => null },
});
const emit = defineEmits(["next"]);
const toast = useToast();

const name = ref(props.initial?.name ?? "");
const imageUrl = ref(props.initial?.image ?? "");
const dietTags = ref([...(props.initial?.dietTags ?? [])]);
const containsTags = ref([...(props.initial?.containsTags ?? [])]);
const steps = ref([...(props.initial?.steps ?? [])]);
const stepDraft = ref("");

const dietOptions = ["Gluten-Free", "Dairy-Free", "Vegetarian", "Vegan"];
const containsOptions = [
	{ value: "Fish", label: "Fish / seafood / shellfish" },
	{ value: "Tree nuts", label: "Tree nuts / peanuts" },
];

const errors = reactive({
	name: false,
	image: false,
	steps: false,
});

const clearError = (key) => {
	errors[key] = false;
};

const isValidUrl = (value) => /^https?:\/\/\S+/i.test(value);

const addStep = () => {
	const value = stepDraft.value.trim();
	if (!value) {
		toast.add({
			severity: "warn",
			detail: "Step text cannot be empty.",
			life: 2500,
		});
		return;
	}
	steps.value.push(value);
	stepDraft.value = "";
	errors.steps = false;
};

const removeStep = (index) => {
	steps.value.splice(index, 1);
};

const validate = () => {
	errors.name = name.value.length === 0;
	errors.image = !isValidUrl(imageUrl.value);
	errors.steps = steps.value.length === 0;
	return !errors.name && !errors.image && !errors.steps;
};

const onNext = () => {
	if (!validate()) {
		toast.add({
			severity: "error",
			detail: "Please complete the highlighted fields.",
			life: 3000,
		});
		return;
	}
	emit("next", {
		name: name.value,
		image: imageUrl.value,
		dietTags: [...dietTags.value],
		containsTags: [...containsTags.value],
		steps: [...steps.value],
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
.field {
	margin-bottom: 1.5rem;
}
.field-label {
	display: block;
	font-weight: 600;
	margin-bottom: 0.5rem;
}
.field-label-secondary {
	margin-top: 1rem;
}
.field-hint {
	color: var(--color-text-muted);
	font-size: 0.875rem;
	margin: 0.5rem 0 0;
}
.w-full {
	width: 100%;
}
.image-preview {
	margin-top: 0.75rem;
	border: 1px solid var(--color-border);
	border-radius: 12px;
	overflow: hidden;
	max-height: 240px;
	display: flex;
	justify-content: center;
	background: var(--color-surface-alt);
}
.image-preview img {
	max-width: 100%;
	max-height: 240px;
	object-fit: cover;
}
.checkbox-row {
	display: flex;
	flex-wrap: wrap;
	gap: 0.75rem 1.5rem;
}
.checkbox-item {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	cursor: pointer;
}
.step-input-row {
	display: flex;
	gap: 0.75rem;
	align-items: flex-start;
}
.step-textarea {
	flex: 1;
}
.step-list {
	margin: 1rem 0 0;
	padding-left: 1.25rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}
.step-list li {
	display: flex;
	gap: 0.75rem;
	align-items: flex-start;
}
.step-text {
	flex: 1;
	background: var(--color-surface-alt);
	padding: 0.5rem 0.75rem;
	border-radius: 8px;
}
.wizard-actions {
	display: flex;
	justify-content: flex-end;
	gap: 0.75rem;
	margin-top: 1rem;
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
	.step-input-row {
		flex-direction: column;
	}
}
</style>
