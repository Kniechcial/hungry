<template>
	<main>
		<div class="default-box">
			<div class="about-us-box first">
				<div class="about-us-text">
					<h3>Stwórz listę swoich ulubionych potraw</h3>
					<p>
						Dzięki tej stronie jesteś w stanie stworzyć listę swoich ulubionych
						potraw. Edytować jej składniki, dodawać kaloryczność, pochawalić się
						zdjęciem swojego dania oraz wiele więcej.
					</p>
					<div class="next-btn">
						<Button
							@click="getRecipe()"
							label="Next" />
					</div>
				</div>
			</div>

			<div class="about-us-box second">
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
				<div class="about-us-text">
					<h3>Stwórz własny przepis</h3>
					<p>
						Jeśli masz już gotowy przepis na ulubioną potrawę możesz go
						wprowadzić i mieć pod ręką zawsze kiedy będziesz chciał z niego
						skorzystać.
					</p>
				</div>
			</div>
			<div class="about-us-box fourth">
				<div class="about-us-text">
					<h3>Znajdź przepis z tego co akurat masz pod ręką</h3>
					<p>
						Masz w lodówce składniki, które chciał byś wykorzystać, ale nie
						wiesz jak je połączyć? Skorzystaj z przeglądarki podając składniki
						jakich chcesz użyć, a Hungry stworzy dla Ciebie listę potraw jakie
						możesz z nich przygotować.
					</p>
				</div>
			</div>
		</div>
	</main>
</template>
<script setup>
import { useRouter } from "vue-router";
import Button from "primevue/button";
const router = useRouter();
// const panelSingIn = () => router.push({ name: "singIn" });
// const panelLogIn = () => router.push({ name: "LogInView" });
</script>

<style scoped>
main {
	margin: 50px auto;
	max-width: 65rem;
}
.default-box {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.about-us-box {
	display: flex;
	height: 300px;
	background-attachment: fixed;
	background-position: center;
	border-top-left-radius: 50px;
	border-bottom-right-radius: 50px;
	overflow: hidden;
	box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
		rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;

	transition: filter 0.3s, transform 0.3s;
	z-index: 0;
}
.about-us-text {
	padding: 20px 40px;
	text-align: center;
	color: white;
}

.about-us-text {
	margin-top: auto;
	z-index: 1;
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
.lock {
	background-image: url("../../assets/icon/bg/loock.png");
}

.about-us-box:hover {
	filter: brightness(0.6);
	transform: scale(1.05);
	cursor: pointer;
}
.next-btn {
	position: absolute;
	top: 7rem;
	left: 50%;
	transform: translateX(-50%);
	padding: 10px 20px;
	/* color: #333;
	border: 2px solid #333; */
	/* border-radius: 5px; */
	/* font-size: 16px; */
	cursor: pointer;
	opacity: 0;
	transition: opacity 0.3s ease;
	z-index: 2;
}
.about-us-box:hover .next-btn {
	opacity: 1;
}
</style>
