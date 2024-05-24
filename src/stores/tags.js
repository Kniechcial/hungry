import { ref } from "vue";
import { defineStore } from "pinia";

export const useTagsListStore = defineStore("tagsList", () => {
	const fetchedTags = ref(null);
	async function getTags() {
		const url = `https://tasty.p.rapidapi.com/tags/list`;
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

			fetchedTags.value = responseData.results;
			console.log(fetchedTags.value);
		} catch (error) {
			console.error(error);
		}
	}
	return {
		fetchedTags,
		getTags,
	};
});
