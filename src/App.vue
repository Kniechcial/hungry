<template>
	<body>
		<Header></Header>
		<NavigateMainBar></NavigateMainBar>
		<router-view></router-view>
	</body>
	<Footer></Footer>
</template>

<script setup>
import Header from "./components/Reusable/Header.vue";
import Footer from "./components/Reusable/Footer.vue";
import NavigateMainBar from "./components/Reusable/NavigateMainBar.vue";

components: {
	Header, Footer, NavigateMainBar;
}
</script>
<style>
body {
	min-height: 87vh;
}
</style>
