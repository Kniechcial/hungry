<template>
	<footer>
		<p>
			@2024 Niechciał Karol Hungry
			<span class="icon-box">
				<a href="https://www.instagram.com/"
					><i class="fa-brands fa-instagram"></i
				></a>
				<a href="https://twitter.com/"><i class="fa-brands fa-twitter"></i></a>
			</span>
		</p>
	</footer>
</template>
<style scoped>
footer {
	bottom: 0;
	height: 80px;
	line-height: 80px;
	font-size: 20px;
	background-color: rgb(8, 194, 8);
	color: white;
	text-align: center;
	margin-top: 2rem;
}

.icon-box {
	margin-left: 20px;
}

.icon-box a {
	margin: 0 5px;
	font-size: 20px;
	color: white;
	transition: color 0.5s;
}

.icon-box a:hover {
	font-size: 25px;
	color: black;
}
</style>
