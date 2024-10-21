import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const tastyStore = defineStore("recipe", () => {
	const fetchedRecipes = ref([]);
	async function getRecipes(from, size, q) {
		const url = `https://tasty.p.rapidapi.com/recipes/list?from=${from}&size=${size}&q=${q}`;
		const options = {
			method: "GET",
			headers: {
				"x-rapidapi-key": "21c1821ffcmsha7990fd4d3e010bp1099d7jsn3580fc4e61de",
				"x-rapidapi-host": "tasty.p.rapidapi.com",
			},
		};

		try {
			const response = await fetch(url, options);
			const result = await response.json();
			const modifiedRecipes = [];
			for (const recipe of result.results) {
				const modifiedRecipe = {
					name: recipe.name,
					instructions: [],
					calories: recipe.nutrition,
					Time: recipe.cook_time_minutes,
					image: recipe.thumbnail_url,
					ingridients: [],
					tags: [],
				};
				for (const tag of recipe.tags) {
					const modifiedTags = {};
					modifiedTags["display_name"] = tag.display_name;
					modifiedRecipe.tags.push(modifiedTags);
				}
				for (const instruction of recipe.instructions) {
					const modifiedInstruction = {};
					modifiedInstruction["step"] = instruction.display_text;
					modifiedRecipe.instructions.push(modifiedInstruction);
				}
				const sections = recipe.sections;
				sections.forEach(function (section) {
					section.components.forEach(function (item) {
						const skladnik = {};
						if (item.ingredient.hasOwnProperty("name")) {
							skladnik["name"] = item.ingredient.name;
							modifiedRecipe.ingridients.push(skladnik);
						}
						const measurements = item.measurements;
						measurements.forEach(function (measurement, index) {
							if (index === 0) {
								if (measurement.hasOwnProperty("quantity")) {
									skladnik["value"] = measurement.quantity;
								}
								measurements.forEach(function (units) {
									if (units.unit.hasOwnProperty("abbreviation")) {
										skladnik["unit"] = units.unit.abbreviation;
									}
								});
							}
						});
					});
				});
				modifiedRecipes.push(modifiedRecipe);
			}
			console.log(result);
			fetchedRecipes.value = modifiedRecipes;
			console.log("Pierwsze wywołania Funkcji GetRecipe");
		} catch (error) {
			console.error(error);
		}
	}
	const fetchedTags = ref(null);
	async function getTags() {
		const url_tag_list = `https://tasty.p.rapidapi.com/tags/list`;
		const options = {
			method: "GET",
			headers: {
				"x-rapidapi-key": "21c1821ffcmsha7990fd4d3e010bp1099d7jsn3580fc4e61de",
				"x-rapidapi-host": "tasty.p.rapidapi.com",
			},
		};

		try {
			const response = await fetch(url_tag_list, options);
			const responseData = await response.json();

			fetchedTags.value = responseData.results;
			console.log(fetchedTags.value);
		} catch (error) {
			console.error(error);
		}
	}
	const categorys = computed(() =>
		fetchedTags.value
			? new Set(fetchedTags.value.map((tag) => tag.root_tag_type))
			: null
	);

	return {
		fetchedRecipes,
		getRecipes,
		fetchedTags,
		getTags,
		categorys,
	};
});
