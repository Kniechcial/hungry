<template>
	<div class="card flex justify-content-center">
		<TabMenu
			:model="items"
			class="card flex scale"
			v-model:activeIndex="indexId" />
	</div>
	<component
		:is="currentComponent"
		@setLoading="setLoading"></component>
</template>

<script setup>
import { ref, computed } from "vue";
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import TabMenu from "primevue/tabmenu";
import SingIn from "../../components/user/create_new_user/SingIn.vue";
import LogIn from "../../components/user/log_in/LogIn.vue";

const router = useRouter();
const route = useRoute();
const findBy = ref(route.params.findBy);
const indexId = ref(0);
const isLoading = ref(false);
const newFindBy = ref(null);

const setLoading = () => {
	isLoading.value = !isLoading.value;
};

const currentComponent = computed(() => {
	switch (findBy.value) {
		case "register":
			indexId.value = 0;
			return SingIn;
		case "login":
			indexId.value = 1;
			return LogIn;
		default:
			return null;
	}
});

const changeComponent = (newFindBy) => {
	findBy.value = newFindBy;
	router.push(`/authorization/${findBy}`);
	console.log(findBy.value);
};

defineComponent({
	components: {
		SingIn,
		LogIn,
	},
});

const items = ref([
	{
		label: "Register",
		command: () => {
			newFindBy.value = "register";
			changeComponent(newFindBy.value);
		},
	},
	{
		label: "Login",
		command: () => {
			newFindBy.value = "login";
			changeComponent(newFindBy.value);
		},
	},
]);
</script>

<style scoped>
.button-box {
	margin-left: 7rem;
}
</style>
