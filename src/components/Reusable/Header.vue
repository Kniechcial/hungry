<template>
	<header
		class="site-header"
		@click="toggleToHomeView()">
		<div class="site-header-overlay"></div>
		<div class="site-header-content">
			<span class="wordmark">Hungry</span>
			<span class="tagline">Recipes, saved and shared.</span>
		</div>
	</header>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const toggleToHomeView = () => {
	router.push({ name: "HomeView" });
};
</script>

<style scoped>
.site-header {
	position: relative;
	height: 180px;
	background-image: url("../../assets/photo/backgroundHeader.jpg");
	background-size: cover;
	background-position: center;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}
.site-header-overlay {
	position: absolute;
	inset: 0;
	background: linear-gradient(
		to bottom,
		rgba(58, 42, 32, 0.45),
		rgba(58, 42, 32, 0.7)
	);
}
.site-header-content {
	position: relative;
	text-align: center;
	color: #fff;
	padding: 0 1rem;
}
.wordmark {
	display: block;
	font-family: var(--font-heading);
	font-weight: 700;
	font-size: clamp(2.5rem, 6vw, 4rem);
	letter-spacing: 0.02em;
	line-height: 1;
}
.tagline {
	display: block;
	margin-top: 0.5rem;
	font-family: var(--font-body);
	font-size: 1rem;
	color: rgba(255, 255, 255, 0.85);
	font-style: italic;
}

@media (max-width: 650px) {
	.site-header {
		height: 140px;
	}
}
</style>
