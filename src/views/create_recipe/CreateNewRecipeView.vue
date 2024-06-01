<template>
	<div class="top-bar">
		<div class="Welcome">
			<h3>Stwórz przepis swojego ulubionego dania</h3>
		</div>
		<p>
			W tym oknie możesz stworzyć swój przepis na ulubioną potrawę.Dodanie
			przepisu składa się z dwóch etapów. Pierwszy jest podanie nazwy dania,
			składników, tagów, podanie linku do zdjęcia, opisu przygotowania potrawy
			oraz oznaczenie czy chcemy dodać kaloryczność. Wprowadzenie nazwy dania,
			wybór składników oraz podanie opisu jest niezbędne do stworzenia potrawy.
			Bez podania tych informacji danie nie zostanie dodane. Drugim etapem jest
			wybranie ilości poszczególnych składników oraz wprowadzenie kaloryczności
			dania.
		</p>
	</div>
	<CreateRecipeStepOne></CreateRecipeStepOne>
</template>
<script>
import CreateRecipeStepOne from "../../components/create_recipe/CreateRecipeStepOne.vue";
export default {
	components: { CreateRecipeStepOne: CreateRecipeStepOne },
};
</script>

<style scoped>
.top-bar {
	position: relative;
	margin: 1rem;
	padding: 1rem;
	border: 1px solid black;
	color: #261474;
	max-width: 65rem;
	margin-left: auto;
	margin-right: auto;
	border-radius: 10px;
	background-color: #faf8f7;
}
.Welcome {
	font-size: 20px;
	margin-left: auto;
	margin-right: auto;
}
p {
	margin-top: 1rem;
	margin-left: auto;
	margin-right: auto;
}
</style>
