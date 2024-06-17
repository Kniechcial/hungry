<template>
	<footer class="bg-green-500">
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
	position: absolute;
	width: 100px;
	height: 100px;
	top: -100px;
	right: 7%;
	margin-right: 0.5rem;
	transform: translateX(-50%);
	z-index: 0;
}
.image-medium {
	position: absolute;
	width: 200px;
	height: 200px;
	top: -200px;
	right: -5%;
	overflow: hidden;
	transform: translateX(-50%);
	z-index: 0;
}

footer {
	position: relative;
	bottom: 0;
	height: 80px;
	line-height: 80px;
	font-size: 20px;
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

@media (max-width: 1500px) {
	.image-small {
		display: none;
	}
	footer {
		font-size: 18px;
	}

	.icon-box a {
		font-size: 18px;
	}

	.icon-box div {
		font-size: 18px;
	}

	.icon-box a:hover {
		font-size: 22px;
	}
}
@media (max-width: 1150px) {
	.image-medium {
		display: none;
	}
}
@media (max-width: 650px) {
	.icon-box a {
		display: none;
	}
}
</style>
