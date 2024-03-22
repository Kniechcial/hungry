<template>
	<div class="butons-log-in-sing-in">
		<div class="card relative inline-block ml-5 cursor-pointer">
			<Button
				label="Załóż konto"
				@click="panelSingIn()" />
		</div>

		<div class="card relative inline-block mr-5 ml-5 cursor-pointer">
			<Toast />
			<Button @click="panelLogIn()" label="Zaloguj" type:="submit"/>
		</div>
	</div>
	<main>
		<h2>Witaj</h2>
		<div class="about-us-hello">
			<p>
				Chcielibyśmy Cię powitać na naszej inspirującej platformie kulinarnej,
				gdzie pasja do gotowania staje się wspólną przygodą! Tutaj nie tylko
				znajdziesz przepisy na smakowite dania, ale również masz szansę
				podzielić się swoimi kulinarnymi arcydziełami. Bez względu na to, czy
				jesteś doświadczonym kucharzem czy nowicjuszem w kuchennych sztukach,
				nasza społeczność otwiera przed Tobą drzwi do świata aromatycznych
				smaków i kreatywności kulinarnej. Wprowadź swój autorski przepis, odkryj
				nowe pomysły na obiady. Gotowi na kulinarne przygody? Zanurz się w
				świecie smaków na naszej platformie już teraz!
			</p>
		</div>
		<div class="test">
			<div class="about-us-box first">
				<div class="about-us-bg"></div>
				<div class="about-us-text">
					<h3>Stwórz listę swoich ulubionych potraw</h3>
					<p>
						Dzięki tej stronie jesteś w stanie stworzyć listę swoich ulubionych
						potraw. Edytować jej składniki, dodawać kaloryczność, pochawalić się
						zdjęciem swojego dania oraz wiele więcej.
					</p>
				</div>
			</div>
		</div>

		<div class="about-us-box second">
			<div class="about-us-bg"></div>
			<div class="about-us-text">
				<h3>Nie masz pomysłu na obiad? To już nie problem</h3>
				<p>
					Hungry pozwoli Ci znaleźć przepis na to na co właśnie masz ochotę.
					Pizza, pasta, ramen? Skorzystaj z gotowych przepisów używając
					wbudowanej funkcji wyszukiwania tego na co wałśnie masz ochotę.
				</p>
			</div>
		</div>
		<div class="about-us-box third">
			<div class="about-us-bg"></div>
			<div class="about-us-text">
				<h3>Stwórz własny przepis</h3>
				<p>
					Jeśli masz już gotowy przepis na ulubioną potrawę możesz go wprowadzić
					i mieć pod ręką zawsze kiedy będziesz chciał z niego skorzystać.
				</p>
			</div>
		</div>
		<div class="about-us-box fourth">
			<div class="about-us-bg"></div>
			<div class="about-us-text">
				<h3>Znajdź przepis z tego co akurat masz pod ręką</h3>
				<p>
					Masz w lodówce składniki, które chciał byś wykorzystać, ale nie wiesz
					jak je połączyć? Skorzystaj z przeglądarki podając składniki jakich
					chcesz użyć, a Hungry stworzy dla Ciebie listę potraw jakie możesz z
					nich przygotować.
				</p>
			</div>
		</div>
	</main>
</template>
<script setup>
import Button from "primevue/button";
import { useRouter } from "vue-router";
const router = useRouter();
const panelSingIn = () => router.push({ name: "singIn" });
const panelLogIn = () => router.push({ name: "LogInView" });
</script>

<style scoped>
main {
	margin: 50px auto;
	/* width: 1200px; */
	max-width: 65rem;
}

main h2 {
	margin-top: -5rem;
	margin-bottom: 30px;
	text-transform: uppercase;
	text-align: center;
	color: #261474;
}

.about-us-box {
	position: relative;
	/* display: flex; */
	align-content: center;
	height: 300px;
	margin: 40px 0;
	background-attachment: fixed;
	background-position: center;
	border-top-left-radius: 50px;
	border-bottom-right-radius: 50px;
	overflow: hidden;
	/* cursor: pointer; */
}

.about-us-hello {
	position: relative;
	margin: 1rem;
	padding: 1rem;
	border: 1px solid black;
	color: #261474;
	font-size: 20px;
	margin-left: auto;
	margin-right: auto;
	text-indent: 20px;
	border-radius: 10px;
	background-color: #faf8f7;
}
.about-us-text {
	position: absolute;
	bottom: 20px;
	padding: 20px 40px;
	text-align: center;
	color: white;
}

.about-us-text {
	position: absolute;
	bottom: 0;
	height: 45%;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.8);
}

.about-us-box h3 {
	text-transform: uppercase;
	padding-bottom: 20px;
}

.butons-log-in-sing-in {
	/* position: fixed; */
	margin-inline-start: 80%;
	margin-top: 1rem;
}
.first {
	background-image: url("../../assets/icon/bg/pizza.jpg");
}

.second {
	background-image: url("../../assets/icon/bg/spagetti.jpg");
}

.third {
	background-image: url("../../assets/icon/bg/sushi.jpg");
}

.fourth {
	background-image: url("../../assets/icon/bg/soup.jpg");
}
.test :hover {
	cursor: pointer;
}
</style>
