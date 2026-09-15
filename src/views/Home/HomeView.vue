<template>
	<main class="home">
		<section class="hero">
			<h1 class="hero-title">Cook something you'll love tonight.</h1>
			<p class="hero-subtitle">
				Browse thousands of recipes, keep favourites in your own book, or make one
				of your own.
			</p>
		</section>

		<section class="cards">
			<article
				v-for="card in cards"
				:key="card.key"
				class="card"
				:class="{ 'card-locked': card.requiresAuth && !authStore.user }"
				@click="onCardClick(card)">
				<div
					class="card-media"
					:style="{ backgroundImage: `url(${card.image})` }">
					<span
						v-if="card.requiresAuth && !authStore.user"
						class="card-lock">
						<i class="pi pi-lock"></i>
						Log in to unlock
					</span>
				</div>
				<div class="card-body">
					<h2 class="card-title">{{ card.title }}</h2>
					<p class="card-text">{{ card.text }}</p>
					<span class="card-cta">
						{{ card.cta }}
						<i class="pi pi-arrow-right"></i>
					</span>
				</div>
			</article>
		</section>
	</main>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useRecipesStore } from "@/stores/recipesStore";

import pizzaImg from "@/assets/photo/pizza.jpg";
import spagettiImg from "@/assets/photo/spagetti.jpg";
import soupImg from "@/assets/photo/soup.jpg";
import sushiImg from "@/assets/photo/sushi.jpg";
import sandwichImg from "@/assets/photo/kanapka_z_jajkiem.png";

const router = useRouter();
const authStore = useAuthStore();
const recipesStore = useRecipesStore();

const cards = [
	{
		key: "list",
		title: "Your favourites, in one place",
		text: "Build a personal recipe book. Save the dishes you love and come back to them any time.",
		cta: "Open my book",
		image: pizzaImg,
		requiresAuth: true,
		go: () =>
			router.push({
				name: "UserRecipesList",
				query: {
					storeType: "recipes",
					headerMessage: "Your list of delicious recipes. Enjoy!",
				},
			}),
	},
	{
		key: "search",
		title: "Search by dish or ingredient",
		text: "Pizza, pasta, ramen — find exactly what you're in the mood for.",
		cta: "Find a recipe",
		image: spagettiImg,
		requiresAuth: false,
		go: () => router.push({ name: "FindRecipe", params: { findBy: "name" } }),
	},
	{
		key: "create",
		title: "Write your own recipe",
		text: "Have a favourite of your own? Save it here and it's always one click away.",
		cta: "Create recipe",
		image: soupImg,
		requiresAuth: true,
		go: () => router.push({ name: "CreateRecipe" }),
	},
	{
		key: "ingredients",
		title: "Use what you already have",
		text: "Type the ingredients in your fridge and let Hungry pick the dishes you can cook.",
		cta: "Search by ingredients",
		image: sushiImg,
		requiresAuth: false,
		go: () =>
			router.push({ name: "FindRecipe", params: { findBy: "ingredients" } }),
	},
	{
		key: "random",
		title: "Not sure? Roll the dice.",
		text: "One click and Hungry serves you a random recipe worth trying.",
		cta: "Surprise me",
		image: sandwichImg,
		requiresAuth: false,
		go: () => router.push({ name: "FindRecipe", params: { findBy: "random" } }),
	},
];

const onCardClick = (card) => {
	if (card.requiresAuth && !authStore.user) {
		router.push({
			name: "Authorization",
			params: { findBy: "login" },
		});
		return;
	}
	card.go();
};

onMounted(() => {
	if (authStore.user) {
		recipesStore.getRecipe();
	}
});
</script>

<style scoped>
.home {
	max-width: 68rem;
	margin: 0 auto;
	padding: 2.5rem 1.25rem 3rem;
}
.hero {
	text-align: center;
	max-width: 42rem;
	margin: 0 auto 2.5rem;
}
.hero-title {
	font-family: var(--font-heading);
	font-weight: 600;
	font-size: clamp(2rem, 4vw, 2.75rem);
	line-height: 1.15;
	margin: 0 0 0.75rem;
	color: var(--color-text);
}
.hero-subtitle {
	color: var(--color-text-muted);
	font-size: 1.0625rem;
	margin: 0;
}
.cards {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: 1.25rem;
}
.card {
	display: flex;
	flex-direction: column;
	background: var(--color-surface);
	border-radius: var(--radius-card);
	box-shadow: var(--shadow-card);
	overflow: hidden;
	cursor: pointer;
	transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card:hover {
	transform: translateY(-4px);
	box-shadow: 0 12px 32px rgba(58, 42, 32, 0.18);
}
.card-locked {
	opacity: 0.85;
}
.card-media {
	position: relative;
	height: 180px;
	background-size: cover;
	background-position: center;
}
.card-lock {
	position: absolute;
	inset: auto 0.75rem 0.75rem auto;
	display: inline-flex;
	align-items: center;
	gap: 0.4rem;
	background: rgba(58, 42, 32, 0.85);
	color: #fff;
	font-size: 0.8125rem;
	font-weight: 600;
	padding: 0.35rem 0.7rem;
	border-radius: 999px;
}
.card-body {
	padding: 1.25rem 1.25rem 1.5rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	flex: 1;
}
.card-title {
	font-family: var(--font-heading);
	font-weight: 600;
	font-size: 1.25rem;
	margin: 0;
}
.card-text {
	color: var(--color-text-muted);
	margin: 0;
	flex: 1;
	line-height: 1.5;
}
.card-cta {
	display: inline-flex;
	align-items: center;
	gap: 0.4rem;
	color: var(--color-primary);
	font-weight: 600;
	margin-top: 0.5rem;
}

@media (max-width: 640px) {
	.home {
		padding: 1.5rem 1rem 2rem;
	}
	.hero {
		margin-bottom: 1.5rem;
	}
}
</style>
