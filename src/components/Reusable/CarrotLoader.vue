<template>
	<div class="loader-container">
		<div class="image-style">
			<img
				class="carrot-img"
				src="../../assets/icon/carrot.png"
				alt="carrot" />
			<p class="loading-text">Loading...</p>
		</div>
	</div>
</template>

<style scoped>
.loader-container {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(255, 255, 255, 0.8);
	z-index: 9999;
}

.image-style {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.carrot-img {
	width: 300px;
	animation: moveUpDown 0.5s ease-in-out infinite alternate;
}

.loading-text {
	font-size: 1.2rem;
	margin-top: 30px;
	color: #333;
}

@keyframes moveUpDown {
	from {
		transform: translateY(0);
	}
	to {
		transform: translateY(20px);
	}
}

@media (max-width: 650px) {
	.loader-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.carrot-img {
		width: 160px;
	}

	.loading-text {
		font-size: 1rem;
	}
}
</style>
