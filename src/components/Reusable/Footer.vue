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
		<div class="icon-box">
			<div class="image-style small">
				<img
					src="../../assets/icon/carrot-leaves.png"
					alt="carrot" />
			</div>
		</div>
		<div class="icon-box">
			<div class="image-style medium">
				<img
					src="../../assets/icon/carrot-leaves-medium.png"
					alt="carrot" />
			</div>
		</div>
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

.image-style {
	position: absolute;
	height: 100px;
	width: 100px;
	z-index: -1;
}
.small {
	scale: 0.2;
	left: 78%;
	bottom: -122vh;
}
.medium {
	scale: 0.4;
	left: 83%;
	bottom: -110vh;
}
</style>
