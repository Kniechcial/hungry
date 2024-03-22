import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("users", () => {
	const usersBaseStore = ref([]);

	return {
		usersBaseStore,
	};
});
