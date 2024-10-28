<template>
	<header>
		<div
			class="header-img"
			@click="toggleToHomeView()">
			<div class="header-bg"></div>
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
@import url("https://fonts.googleapis.com/css2?family=Bungee&family=Comfortaa:wght@500&family=Nunito:wght@300;400&family=Open+Sans:wght@400;600&family=Raleway:wght@100;400;700&family=Titillium+Web:wght@200&display=swap");

.header-img {
	position: relative;
	height: 150px;
	background-image: url("../../assets/photo/backgroundHeader.jpg");
	background-size: cover;
	background-position: 0 100%;
	cursor: pointer;
}
.header-bg {
	position: absolute;
	height: 100%;
	width: 100%;
}
</style>
