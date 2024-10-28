import { createRouter, createWebHistory } from "vue-router";

import BaseDescription from "../components/find_recipe/random_recipe/RandomRecipe.vue";
import ByIngredients from "../components/find_recipe/by_ingredients/ByIngredients.vue";
import ByName from "../components/find_recipe/by_name/ByName.vue";
import ByTags from "@/components/find_recipe/by_tags/ByTags.vue";
import RandomRecipe from "../components/find_recipe/random_recipe/RandomRecipe.vue";
import RecipeDetails from "../components/find_recipe/recipe_details/RecipeDetails.vue";
import RecipeList from "../components/find_recipe/recipe_details/RecipeList.vue";

import TopBarMenu from "../components/Reusable/NavigateMainBar.vue";

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
			path: "/top-bar-menu",
			name: "TopBarMenu",
			component: TopBarMenu,
		},
		{
			path: "/user-recipes-list",
			name: "UserRecipesList",
			component: UserRecipesList,
		},

		{
			path: "/recipe-details",
			name: "RecipeDetails",
			component: RecipeDetails,
		},
		{
			path: "/recipe-list",
			name: "RecipeList",
			component: RecipeList,
		},
		{
			path: "/find-recipe/by-name",
			name: "ByName",
			component: ByName,
		},
		{
			path: "/find-recipe/by-tags",
			name: "ByTags",
			component: ByTags,
		},
		{
			path: "/find-recipe/random-recipe",
			name: "RandomRecipe",
			component: RandomRecipe,
		},
		{
			path: "/find-recipe/by-ingredients",
			name: "ByIngredients",
			component: ByIngredients,
		},
		{
			path: "/find-recipe/base-description",
			name: "BaseDescription",
			component: BaseDescription,
		},
		{
			path: "/find-recipe/:findBy",
			name: "FindRecipe",
			component: FindRecipe,
		},
		{
			path: "/create-recipe",
			name: "CreateRecipe",
			component: CreateRecipe,
		},
		{
			path: "/authorization/:findBy",
			name: "Authorization",
			meta: { requiresUnAuth: true },
			component: Authorization,
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
