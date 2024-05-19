<template>
	<main>
		<div class="default-box">
			<div class="about-us-box first">
				<div class="disable"></div>
				<div class="about-us-text">
					<h3>Create a list of your favorite dishes</h3>
					<p>
						Thanks to this website, you are able to create a list of your
						favorite dishes. Edit their ingredients, add calories, showcase a
						photo of your dish, and much more!
					</p>
				</div>
			</div>
			<div
				@click="navigateToFindByName()"
				class="about-us-box second">
				<div class="lets-go-try">Let's go try!</div>
				<div class="about-us-text">
					<h3>
						If you don't have an idea for dinner? That's no longer a problem
					</h3>
					<p>
						Hungry will help you find a recipe for whatever you're craving right
						now. Pizza, pasta, ramen? Use the built-in search function to find
						exactly what you're in the mood for
					</p>
				</div>
			</div>
			<div class="about-us-box third">
				<div class="disable"></div>
				<div class="about-us-text">
					<h3>Create your own recipe</h3>
					<p>
						If you already have a recipe for your favorite dish, you can input
						it and have it on hand whenever you want to use it
					</p>
				</div>
			</div>
			<div
				@click="navigateToFindByTags()"
				class="about-us-box fourth">
				<div class="lets-go-try">Let's go try!</div>
				<div class="about-us-text">
					<h3>Find a recipe using what you have on hand</h3>
					<p>
						"Do you have ingredients in your fridge that you'd like to use, but
						you're not sure how to combine them? Use the browser by providing
						the ingredients you want to use, and Hungry will create a list of
						dishes you can prepare with them
					</p>
				</div>
			</div>
			<div
				@click="navigateToRandomRecipe()"
				class="about-us-box five">
				<div class="lets-go-try">Let's go try!</div>
				<div class="about-us-text">
					<h3>Randomly choose a recipe for a delicious dish</h3>
					<p>
						You don't have any idea for a dish? Longer than that is no longer a
						problem. Just click and draw a recipe for a delicious dish."
					</p>
				</div>
			</div>
		</div>
	</main>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const navigateToFindByName = () => {
	router.push({ name: "ByName" });
};
const navigateToFindByTags = () => {
	router.push({ name: "ByTags" });
};
const navigateToRandomRecipe = () => {
	router.push({ name: "RandomRecipe" });
};
</script>
<style scoped>
main {
	margin: 50px auto;
	max-width: 65rem;
}
.default-box {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.about-us-text {
	padding: 20px 40px;
	text-align: center;
	color: white;
}

.about-us-text {
	margin-top: auto;
	z-index: 1;
	height: 45%;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.8);
}

.about-us-box h3 {
	text-transform: uppercase;
	padding-bottom: 20px;
}

.butons-log-in-sing-in {
	margin-inline-start: 80%;
	margin-top: 1rem;
}

.first::before {
	content: "";
	background-image: url("../../assets/icon/bg/pizza.jpg");
	background-attachment: fixed;
	background-position: center;
	position: absolute;
	top: 0px;
	right: 0px;
	bottom: 0px;
	left: 0px;
	transition: 0.3s filter;
}
.first:hover::before {
	filter: brightness(0.6);
}

.second::before {
	content: "";
	background-image: url("../../assets/icon/bg/spagetti.jpg");
	background-attachment: fixed;
	background-position: center;
	position: absolute;
	top: 0px;
	right: 0px;
	bottom: 0px;
	left: 0px;
	transition: 0.3s filter;
	cursor: pointer;
}

.third::before {
	content: "";
	background-image: url("../../assets/icon/bg/soup.jpg");
	background-attachment: fixed;
	background-position: center;
	position: absolute;
	top: 0px;
	right: 0px;
	bottom: 0px;
	left: 0px;
	transition: 0.3s filter;
	cursor: auto;
}
.third:hover::before {
	filter: brightness(0.6);
	cursor: auto;
}

.fourth::before {
	content: "";
	background-image: url("../../assets/icon/bg/sushi.jpg");
	background-attachment: fixed;
	background-position: center;
	position: absolute;
	top: 0px;
	right: 0px;
	bottom: 0px;
	left: 0px;
	transition: 0.3s filter;
	cursor: pointer;
}

.five::before {
	content: "";
	background-image: url("../../assets/icon/bg/kanapka_z_jajkiem.png");
	background-attachment: fixed;
	background-position: center;
	position: absolute;
	top: 0px;
	right: 0px;
	bottom: 0px;
	left: 0px;
	transition: 0.3s filter;
	cursor: pointer;
}

.about-us-box {
	position: relative;
	display: flex;
	height: 300px;
	background-attachment: fixed;
	background-position: center;
	border-top-left-radius: 50px;
	border-bottom-right-radius: 50px;
	overflow: hidden;
	box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
		rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
	transition: 0.3s all;
}
.about-us-box:hover {
	height: 360px;
}

.disable {
	height: 230px;
	width: 150px;
	display: none;
	background-image: url("../../assets/icon/bg/loock.png");
	background-position: center;
	position: absolute;
	top: 2rem;
	left: 50%;
	transform: translateX(-50%);
	z-index: 1;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
}

.lets-go-try {
	position: absolute;
	display: none;
	margin-top: 4rem;
	left: 50%;
	z-index: 1;
	transform: translateX(-50%);
	font-size: 50px;
	font-weight: bold;
	font-style: italic;
}

.first:hover .disable {
	display: flex;
	cursor: auto;
}

.second:hover {
	cursor: pointer;
}

.second:hover .lets-go-try {
	display: flex;
}

.third:hover .disable {
	display: flex;
	cursor: auto;
}

.fourth:hover {
	cursor: pointer;
}

.fourth:hover .lets-go-try {
	display: flex;
}
.five:hover {
	cursor: pointer;
}

.five:hover .lets-go-try {
	display: flex;
}
</style>
