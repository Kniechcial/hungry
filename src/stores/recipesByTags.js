import { ref } from "vue";
import { defineStore } from "pinia";

export const useRecipeStoreByTags = defineStore("recipe", () => {
	const fetchedRecipes = ref(null);
	async function getRecipes(from, size, q0, q1, q2, q3, q4) {
		const url = `https://tasty.p.rapidapi.com/recipes/list?from=${from}&size=${size}&q=${q0},${q1},${q2},${q3},${q4}`;
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
			const modifiedRecipes = [];
			for (const recipe of result.results) {
				// const { name, instructions, nutrition } = recipe;
				// modifyRecipes.push({ name, instructions, nutrition });
				const modifiedRecipe = {
					name: recipe.name,
					instructions: [],
					calories: recipe.nutrition,
					Time: recipe.cook_time_minutes,
					image: recipe.thumbnail_url,
					ingridients: [],
				};
				// modifiedRecipe["name"] = recipe.name;

				for (const instruction of recipe.instructions) {
					const modifiedInstruction = {};
					modifiedInstruction["step"] = instruction.display_text;
					modifiedRecipe.instructions.push(modifiedInstruction);
				}
				const sections = recipe.sections;
				sections.forEach(function (section) {
					section.components.forEach(function (item) {
						// Ta funkcja pozwala korzystać z obiektów wewnątrz components.
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
		} catch (error) {
			console.error(error);
		}
	}

	return {
		fetchedRecipes,
		getRecipes,
	};
});
