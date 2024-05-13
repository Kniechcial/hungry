import { ref } from "vue";
import { defineStore } from "pinia";

export const useTagsListStore = defineStore("tagsList", () => {
	const fetchedTags = ref(null);
	async function getTags() {
		const url = `https://tasty.p.rapidapi.com/tags/list`;
		const options = {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": "63d16e91a9msh80a19d032bea021p17ca6cjsnc680b1561233",
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
