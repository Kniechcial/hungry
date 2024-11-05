<!-- <template>
	<div class="content">
		<img
			class="tools"
			src="../../assets/icon/working tools.png"
			alt="tools" />
	</div>
	<p class="text">I'm working on it. Feature coming soon :)</p>
</template>

<script></script>

<style scoped>
.content {
	padding: 5rem;
	width: 25rem;
	height: 25rem;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: auto;
	margin-top: 20px;
	position: relative;
}

.tools {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.text {
	margin-top: 10px;
	font-size: 20px;
	color: #666;
	text-align: center;
}
</style> -->
<template>
	<div>
		<p>Chcesz zobaczyć aplikację Hungry?</p>
		<button
			ref="noButton"
			id="No-button"
			@mouseover="buttonMove(noButton)"
			:style="{
				top: buttonPosition.top + 'px',
				left: buttonPosition.left + 'px',
			}">
			No :(
		</button>
		<button id="Yes-button">Yes :)</button>
	</div>
</template>

<script setup>
import { ref } from "vue";

const noButton = ref(null);
const buttonPosition = ref({ top: 50, left: 50 });

const getRandomNumber = (number) => {
	return Math.floor(Math.random() * (number + 1));
};

const buttonMove = (element) => {
	const newTop = getRandomNumber(window.innerHeight - element.offsetHeight);
	const newLeft = getRandomNumber(window.innerWidth - element.offsetWidth);

	// Zmiana koloru na czerwony podczas ruchu
	element.style.backgroundColor = "red";

	buttonPosition.value.top = newTop;
	buttonPosition.value.left = newLeft;

	setTimeout(() => {
		element.style.backgroundColor = "yellow";
	}, 500);
};
</script>

<style scoped>
* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
	user-select: none;
}

body {
	background-color: rgb(31, 31, 31);
	color: white; /* Kolor tekstu w body */
}

#No-button {
	position: absolute; /* Pozycjonowanie absolutne dla przemieszczania */
	top: 50px; /* Początkowa pozycja */
	left: 50px; /* Początkowa pozycja */
	background-color: rgb(4, 196, 4); /* Początkowy kolor */
	color: white; /* Kolor tekstu */
	padding: 10px 20px; /* Wewnętrzne wypełnienie */
	border: none; /* Bez obramowania */
	border-radius: 5px; /* Zaokrąglone rogi */
	cursor: pointer; /* Kursor w postaci wskaźnika */
	transition: background-color 0.5s, top 1s, left 1s; /* Przejścia dla kolorów i pozycji (prędkość ruchu zmniejszona) */
}
</style>
