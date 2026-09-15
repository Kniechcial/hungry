<template>
	<div class="description-component">
		<h3 class="description-title">Pick a way to find your next recipe</h3>
		<p>
			Search by dish name, add the ingredients sitting in your fridge, browse by
			tag, or roll the dice for a surprise. Whatever you pick, we'll take you
			straight to the results.
		</p>
		<strong class="cta">Enjoy your meal!</strong>
	</div>
</template>

<style scoped>
.description-component {
	max-width: 42rem;
	margin: 2rem auto;
	padding: 2rem;
	border-radius: var(--radius-card);
	background-color: var(--color-surface);
	box-shadow: var(--shadow-card);
	color: var(--color-text);
	text-align: center;
}
.description-title {
	font-family: var(--font-heading);
	font-weight: 600;
	font-size: 1.5rem;
	margin: 0 0 1rem;
}
p {
	margin: 0 0 1.25rem;
	color: var(--color-text-muted);
	line-height: 1.55;
}
.cta {
	color: var(--color-primary);
	letter-spacing: 0.02em;
}

@media (max-width: 900px) {
	.description-component {
		margin: 1rem;
		padding: 1.5rem;
	}
	.description-title {
		font-size: 1.25rem;
	}
}
</style>
