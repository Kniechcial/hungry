import { ref } from "vue";
import { defineStore } from "pinia";

export const useIngridientsListStore = defineStore("ingridientsList", () => {
	const fetchedIngridients = ref(null);
	async function getIngridients() {
		const url = "https://tasty.p.rapidapi.com/recipes/get-more-info?id=8138";
		const options = {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": "3ada471c34mshdbee7bcbd2861dep1bddaajsn8e32b406c05b",
				"X-RapidAPI-Host": "tasty.p.rapidapi.com",
			},
		};

		try {
			const response = await fetch(url, options);
			const responseData = await response.json();

			fetchedIngridients.value = responseData;
			console.log(fetchedIngridients.value);
		} catch (error) {
			console.error(error);
		}
	}
	return {
		fetchedIngridients,
		getIngridients,
	};
});
