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
				<a
					href="https://www.instagram.com/traveler_karol/profilecard/?igsh=eGZkZ3AwcnRkaWd3"
					><i class="fa-brands fa-instagram"></i
				></a>
				<a href="https://github.com/Kniechcial"
					><i class="fa-brands fa-github"></i
				></a>
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
	right: 250px;
	margin-right: 0.5rem;
	z-index: 0;
}
.image-medium {
	position: absolute;
	width: 200px;
	height: 200px;
	top: -200px;
	right: 50px;
	overflow: hidden;
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
	margin: 0 10px;
	color: white;
	display: inline-block;
}

.icon-box a:hover i {
	transform: scale(2);
	color: black;
}

.icon-box i {
	font-size: 20px;
	transition: transform 0.3s, color 0.3s;
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
	.footer {
		scale: 0.8;
	}
}
</style>
