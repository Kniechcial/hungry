import { createRouter, createWebHistory } from "vue-router";

import RecipeList from "../components/find_recipe/recipe_details/RecipeList.vue";
import UserRecipesList from "@/components/user/UserRecipesList.vue";
import CreateRecipe from "../views/create_recipe/CreateRecipe.vue";
import Authorization from "@/views/authorization/Authorization.vue";
import FindRecipe from "../views/find_recipe/FindRecipe.vue";
import HomeView from "../views/Home/HomeView.vue";

import { getCurrentUser } from "@/fireBase";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "HomeView",
			component: HomeView,
		},
		{
			path: "/user-recipes-list",
			name: "UserRecipesList",
			meta: { requiresAuth: true },
			component: UserRecipesList,
		},
		{
			path: "/recipe-list",
			name: "RecipeList",
			component: RecipeList,
		},
		{
			path: "/find-recipe/:findBy",
			name: "FindRecipe",
			component: FindRecipe,
		},
		{
			path: "/create-recipe",
			name: "CreateRecipe",
			meta: { requiresAuth: true },
			component: CreateRecipe,
		},
		{
			path: "/authorization/register",
			name: "Register",
			meta: { requiresUnAuth: true },
			component: Authorization,
		},
		{
			path: "/authorization/login",
			name: "Login",
			meta: { requiresUnAuth: true },
			component: Authorization,
		},
		{
			path: "/authorization/:findBy",
			name: "Authorization",
			meta: { requiresUnAuth: true },
			component: Authorization,
		},
	],
});

router.beforeEach(async (to, from, next) => {
	const user = await getCurrentUser();
	if (to.meta.requiresUnAuth && user) {
		next("/");
	} else if (to.meta.requiresAuth && !user) {
		next("/authorization/login");
	} else {
		next();
	}
});

export default router;
