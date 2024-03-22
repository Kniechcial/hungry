import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useIdeasStore = defineStore("idea", () => {
	const idea = ref();
	async function getIdea() {
		const response = await fetch("https://www.boredapi.com/api/activity");
		const responsData = await response.json();

		idea.value = responsData;
	}
	async function getRecipes(from, size, q) {
		const url = `https://tasty.p.rapidapi.com/recipes/list?from=${from}&size=${size}&q=${q}`;
		const options = {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": "63d16e91a9msh80a19d032bea021p17ca6cjsnc680b1561233",
				"X-RapidAPI-Host": "tasty.p.rapidapi.com",
			},
		};

		try {
			const response = await fetch(url, options);
			const result = await response.json();
			const modifyRecipes = [];
			for (const recipe of result.results) {
				console.log(recipe);
				const { name, instructions, nutrition } = recipe;
				modifyRecipes.push({ name, instructions, nutrition });
			}
			// console.log(result);
			console.log(modifyRecipes);
		} catch (error) {
			console.error(error);
		}
	}

	return {
		getIdea,
		idea,
		getRecipes,
	};
});
