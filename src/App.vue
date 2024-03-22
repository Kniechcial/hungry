<template>
	<body>
		<header-view></header-view>
		<top-bar-menu></top-bar-menu>
		<router-view></router-view>
	</body>
	<footer><footer-view></footer-view></footer>
</template>

<script setup>
import HeaderView from "./views/BaseView/headerView.vue";
import FooterView from "./views/BaseView/footerView.vue";
import TopBarMenu from "./views/BaseView/topBarMenu.vue";

components: {
	HeaderView, FooterView, TopBarMenu;
}

const recipes = [
	{
		id: 1,
		name: "Pomidorowa",
		allergy: ["laktoza", "gluten"],
		tags: ["kurczak", "makraon", "zupa", "obiad"],
		ingridiens: [
			"pomidory",
			"śmietana",
			"sól",
			"makaron",
			"woda",
			"koncentrat pomidorowy",
		],
		descroiption: [
			"Zagotuj wodę",
			"Dodaj sól i pomidory",
			"Gotuj 15 min",
			"Dodaj śmietanę i makaron",
		],
		time: "30 min",
		calories: ["19", "24", "135"],
	},
	{
		id: 2,
		name: "Ogórkowa",
		allergy: ["laktoza", "gluten"],
		tags: ["kurczak", "makraon", "zupa", "obiad"],
		ingridiens: [
			"pomidory",
			"śmietana",
			"sól",
			"makaron",
			"woda",
			"koncentrat pomidorowy",
		],
		descroiption: [
			"Zagotuj wodę",
			"Dodaj sól i pomidory",
			"Gotuj 15 min",
			"Dodaj śmietanę i makaron",
		],
		time: "30 min",
		calories: ["19", "24", "135"],
	},
];
</script>
<style></style>
