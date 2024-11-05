<template>
	<div>
		<p>Chcesz zobaczyć aplikację Hungry?</p>
	</div>
	<button id="No-button">No :(</button>
	<button id="Yes-button">Yes :)</button>
</template>

<script setup>
const noButton = document.getElementById("No-button");
const yesButton = document.getElementById("Yes-button");

const getRandomNumber = (number) => {
	return Math.floor(Math.random() * (number + 1));
};

const buttonMove = (element) => {
	const top = getRandomNumber(window.innerHeight - element.offsetHeight);
	const left = getRandomNumber(window.innerWidth - element.offsetWidth);

	// Zmiana koloru na czerwony podczas ruchu
	element.style.backgroundColor = "red";

	// Zmiana pozycji przycisku
	element.style.top = top + "px";
	element.style.left = left + "px";

	// Przywracanie koloru na zielony po 0.5 sekundy
	setTimeout(() => {
		element.style.backgroundColor = "green";
	}, 500);
};

// Dodawanie nasłuchiwacza zdarzeń tylko raz
noButton.addEventListener("mouseover", () => buttonMove(noButton));
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
}

#No-button {
	position: absolute; /* Pozycjonowanie absolutne dla przemieszczania */
	top: 50px; /* Początkowa pozycja */
	left: 50px; /* Początkowa pozycja */
	background-color: green; /* Początkowy kolor */
	color: white; /* Kolor tekstu */
	padding: 10px 20px; /* Wewnętrzne wypełnienie */
	border: none; /* Bez obramowania */
	border-radius: 5px; /* Zaokrąglone rogi */
	cursor: pointer; /* Kursor w postaci wskaźnika */
	transition: background-color 0.5s, top 0.5s, left 0.5s; /* Przejścia dla kolorów i pozycji */
}
</style>
