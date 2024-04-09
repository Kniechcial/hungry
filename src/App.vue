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
</script>
<style>
body {
	min-height: 87vh;
}
</style>
