<template>
	<footer>
		<img
			class="image-small"
			src="../../assets/icon/carrot-leaves-medium.png"
			alt="carrot" />
		<img
			class="image-medium"
			src="../../assets/icon/carrot-leaves-medium.png"
			alt="carrot" />
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
.image-small {
	width: 100px;
	height: 100px;
	position: absolute;
	top: -100px;
	left: 86%;
	transform: translateX(-50%);
	z-index: 0;
}
.image-medium {
	width: 200px;
	height: 200px;
	position: absolute;
	top: -200px;
	left: 93%;
	transform: translateX(-50%);
	z-index: 0;
}

footer {
	bottom: 0;
	height: 80px;
	line-height: 80px;
	font-size: 20px;
	background-color: rgb(8, 194, 8);
	color: white;
	text-align: center;
	margin-top: 2rem;
	position: relative;
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
.icon-box div {
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
