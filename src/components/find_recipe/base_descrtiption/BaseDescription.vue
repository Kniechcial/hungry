<template>
	<div class="description-component">
		<div class="description">
			<h3>Select how you want to search for a recipe</h3>
		</div>
		<p>
			If you want to search by dish name or type of dish, select the first
			option "Name or Tag". However, if you want to search for the dish you are
			interested in by ingredients, select the second option "Ingridients".
		</p>
		<strong>ENJOY YOUR MEAL!</strong>
	</div>
</template>

<style scoped>
.description-component {
	position: relative;
	padding: 1rem;
	border: 1px solid;
	border-color: aliceblue;
	max-width: 55rem;
	margin-top: 4rem;
	margin-left: auto;
	margin-right: auto;
	border-radius: 10px;
	background-color: #fcffff;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	color: #44424d;
}
.description {
	font-size: 22px;
	margin-left: auto;
	margin-right: auto;
}
p {
	margin-top: 1rem;
	margin-left: auto;
	margin-right: auto;
}
@media (max-width: 900px) {
	.description-component {
		margin-top: 1rem;
		margin-left: 1rem;
		margin-right: 1rem;
	}
	.description {
		font-size: 15px;
	}
	.p {
		font-size: 14px;
	}
}
</style>
