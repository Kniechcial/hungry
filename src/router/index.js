import { createRouter, createWebHistory } from "vue-router";

import CreateRecipeStepTwo from "../components/create_recipe/CreateRecipeStepTwo.vue";

import BaseDescription from "../components/find_recipe/random_recipe/RandomRecipe.vue";
import ByIngredients from "../components/find_recipe/by_ingredients/ByIngredients.vue";
import ByName from "../components/find_recipe/by_name/ByName.vue";
import ByTags from "@/components/find_recipe/by_tags/ByTags.vue";
import RandomRecipe from "../components/find_recipe/random_recipe/RandomRecipe.vue";
import RecipeDetails from "../components/find_recipe/recipe_details/RecipeDetails.vue";
import RecipeList from "../components/find_recipe/recipe_details/RecipeList.vue";

import TopBarMenu from "../components/reusable/NavigateMainBar.vue";

import LogIn from "../components/user/log_in/LogIn.vue";
import SingIn from "../components/user/create_new_user/SingIn.vue";
import UserPanel from "../components/user/user_panel/UserPanel.vue";
import EditPassword from "../components/user/create_new_user/EditPassword.vue";
import RestorePassword from "../components/user/log_in/RestorePassword.vue";
import ConfirmRerstorePassword from "../components/user/log_in/ConfirmRestorePassword.vue";

import CreateNewRecipe from "../views/create_recipe/CreateNewRecipeView.vue";
import FindRecipe from "../views/find_recipe/FindRecipe.vue";
import HomeView from "../views/home/HomeView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "HomeView",
			component: HomeView,
		},
		{
			path: "/log-in",
			name: "LogIn",
			component: LogIn,
		},
		{
			path: "/user-panel",
			name: "UserPanel",
			component: UserPanel,
		},
		{
			path: "/create-new-recipe",
			name: "CreateNewRecipe",
			component: CreateNewRecipe,
		},
		{
			path: "/top-bar-menu",
			name: "TopBarMenu",
			component: TopBarMenu,
		},
		{
			path: "/sing-in",
			name: "singIn",
			component: SingIn,
		},
		{
			path: "/edit-password",
			name: "editPassword",
			component: EditPassword,
		},
		{
			path: "/restore-password",
			name: "restorePassword",
			component: RestorePassword,
		},
		{
			path: "/confirm-restore-password",
			name: "confirmRestorePassword",
			component: ConfirmRerstorePassword,
		},

		{
			path: "/create-recipe-step-two",
			name: "CreateRecipeStepTwo",
			component: CreateRecipeStepTwo,
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
	],
});

export default router;
