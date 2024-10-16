<template>
	<main>
		<div class="default-box">
			<div
				:class="[
					'about-us-box',
					'first',
					useAuthStore.user ? 'pointer-cursor' : 'default-cursor',
				]"
				@click="useAuthStore.user && navigateToFindByName()">
				<div
					v-if="useAuthStore.user"
					class="lets-go-try">
					Let's go try!
				</div>
				<div
					v-else
					class="disable"></div>
				<div class="about-us-text">
					<p class="head-description">Create a list of your favorite dishes</p>
					<p class="add-description">
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
					<p class="head-description">
						No idea for dinner that's no longer a problem
					</p>
					<p class="add-description">
						Hungry will help you find a recipe for whatever you're craving.
						Pizza, pasta, ramen? Use the built-in search function to find
						exactly what you're in the mood for.
					</p>
				</div>
			</div>
			<div
				:class="[
					'about-us-box',
					'third',
					useAuthStore.user ? 'pointer-cursor' : 'default-cursor',
				]"
				@click="useAuthStore.user && navigateToCreateNewRecipe()">
				<div
					v-if="useAuthStore.user"
					class="lets-go-try">
					Let's go try!
				</div>
				<div
					v-else
					class="disable"></div>
				<div class="about-us-text">
					<p class="head-description">Create your own recipe</p>
					<p class="add-description">
						If you already have a recipe for your favorite dish, you can input
						it and have it on hand whenever you want to use it.
					</p>
				</div>
			</div>
			<div
				@click="navigateToFindByTags()"
				class="about-us-box fourth">
				<div class="lets-go-try">Let's go try!</div>
				<div class="about-us-text">
					<p class="head-description">
						Find a recipe using what you have on hand
					</p>
					<p class="add-description">
						You have ingredients that you'd like to use, but you're not sure how
						to combine them? Use the special component in Hungry to create
						dishes you can prepare with them.
					</p>
				</div>
			</div>
			<div
				@click="navigateToRandomRecipe()"
				class="about-us-box five">
				<div class="lets-go-try">Let's go try!</div>
				<div class="about-us-text">
					<p class="head-description">
						Randomly choose a recipe for a delicious dish
					</p>
					<p class="add-description">
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
import { authStore } from "@/stores/authStore";

const router = useRouter();
const useAuthStore = authStore();

const navigateToFindByName = () => {
	router.push({ name: "FindRecipe", params: { findBy: "name" } });
};
const navigateToFindByTags = () => {
	router.push({
		name: "FindRecipe",
		params: { findBy: "ingredients" },
	});
};
const navigateToRandomRecipe = () => {
	router.push({
		name: "FindRecipe",
		params: { findBy: "random" },
	});
};
const navigateToCreateNewRecipe = () => {
	router.push({
		name: "CreateRecipe",
	});
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

.head-description {
	text-transform: uppercase;
	padding-bottom: 20px;
	font-size: 20px;
	font-weight: bold;
}
.about-us-box .head-description {
	padding-bottom: 20px;
}

.butons-log-in-sing-in {
	margin-inline-start: 80%;
	margin-top: 1rem;
}

.first::before {
	content: "";
	background-image: url("../../assets/photo/pizza.jpg");
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
	background-image: url("../../assets/photo/spagetti.jpg");
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
	background-image: url("../../assets/photo/soup.jpg");
	background-attachment: fixed;
	background-position: center;
	position: absolute;
	top: 0px;
	right: 0px;
	bottom: 0px;
	left: 0px;
	transition: 0.3s filter;
}
.third:hover::before {
	filter: brightness(0.6);
}

.fourth::before {
	content: "";
	background-image: url("../../assets/photo/sushi.jpg");
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
	background-image: url("../../assets/photo/kanapka_z_jajkiem.png");
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

.disable {
	height: 230px;
	width: 150px;
	display: none;
	background-image: url("../../assets/icon/loock.png");
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
	color: blanchedalmond;
}
.about-us-box:hover {
	height: 360px;
}

.first:hover .disable {
	display: flex;
}

.first:hover .lets-go-try {
	display: flex;
}

.second:hover {
	cursor: pointer;
}

.second:hover .lets-go-try {
	display: flex;
}

.third:hover .disable {
	display: flex;
}
.third:hover .lets-go-try {
	display: flex;
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

.pointer-cursor {
	cursor: pointer;
}

.default-cursor {
	cursor: auto;
}

@media (max-width: 1100px) {
	main {
		margin-right: 2rem;
		margin-left: 2rem;
	}
}

@media (max-width: 768px) {
	.image-small {
		display: none;
	}
	.head-description {
		font-size: 14px;
	}
	.image-medium {
		display: none;
	}
	.add-description {
		display: none;
	}
	.disable {
		height: 180px;
		width: 120px;
	}
	.icon-box a {
		display: none;
	}
	.about-us-text {
		height: 45%;
	}
	.about-us-box {
		height: 190px;
	}
	.about-us-box:hover {
		height: 190px;
	}
	.disable {
		background-size: 70%;
		top: calc(2rem - 20%);
	}
	.first .disable {
		display: flex;
	}
	.third .disable {
		display: flex;
	}
}
</style>
