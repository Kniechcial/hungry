import { createRouter, createWebHistory } from "vue-router";

import CreateRecipeStepTwo from "../components/create_recipe/CreateRecipeStepTwo.vue";

import BaseDescription from "@/components/FindRecipe/base_descrtiption/BaseDescription.vue";
import ByIngredients from "@/components/FindRecipe/by_ingredients/ByIngredients.vue";
import ByName from "../components/FindRecipe/by_name/ByName.vue";
import ByTags from "@/components/FindRecipe/by_tags/ByTags.vue";
import RandomRecipe from "../components/FindRecipe/random_recipe/RandomRecipe.vue";
import RecipeDetails from "../components/FindRecipe/recipe_details/RecipeDetails.vue";
import RecipeList from "../components/FindRecipe/recipe_details/RecipeList.vue";

import TopBarMenu from "../components/Reusable/NavigateMainBar.vue";

import LogIn from "../components/User/LogIn/LogIn.vue";
import SingIn from "../components/User/CreateNewUser/SingIn.vue";
import UserPanel from "../components/User/UserPanel/UserPanel.vue";
import EditPassword from "../components/User/CreateNewUser/EditPassword.vue";
import RestorePassword from "../components/User/LogIn/RestorePassword.vue";
import ConfirmRerstorePassword from "../components/User/LogIn/ConfirmRestorePassword.vue";

import BaseRecipeView from "../views/base_recipe/baseRecipe.vue";
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
			path: "/LogIn",
			name: "LogIn",
			component: LogIn,
		},
		{
			path: "/UserPanel",
			name: "UserPanel",
			component: UserPanel,
		},
		{
			path: "/CreateNewRecipe",
			name: "CreateNewRecipe",
			component: CreateNewRecipe,
		},
		{
			path: "/TopBarMenu",
			name: "TopBarMenu",
			component: TopBarMenu,
		},
		{
			path: "/singIn",
			name: "singIn",
			component: SingIn,
		},
		{
			path: "/editPassword",
			name: "editPassword",
			component: EditPassword,
		},
		{
			path: "/restorePassword",
			name: "restorePassword",
			component: RestorePassword,
		},
		{
			path: "/",
			name: "HomeView",
			component: HomeView,
		},
		{
			path: "/confirmRestorePassword",
			name: "confirmRestorePassword",
			component: ConfirmRerstorePassword,
		},
		{
			path: "/baserecipe",
			name: "baserecipe",
			component: BaseRecipeView,
		},
		{
			path: "/CreateRecipeStepTwo",
			name: "CreateRecipeStepTwo",
			component: CreateRecipeStepTwo,
		},
		{
			path: "/RecipeDetails",
			name: "RecipeDetails",
			component: RecipeDetails,
		},
		{
			path: "/RecipeList",
			name: "RecipeList",
			component: RecipeList,
		},
		{
			path: "/FindRecipe/ByName",
			name: "ByName",
			component: ByName,
		},
		{
			path: "/FindRecipe/ByTags",
			name: "ByTags",
			component: ByTags,
		},
		{
			path: "/FindRecipe/RandomRecipe",
			name: "RandomRecipe",
			component: RandomRecipe,
		},
		{
			path: "/FindRecipe/ByIngredients",
			name: "ByIngredients",
			component: ByIngredients,
		},
		{
			path: "/FindRecipe/BaseDescription",
			name: "BaseDescription",
			component: BaseDescription,
		},
		{
			path: "/FindRecipe/:findBy",
			name: "FindRecipe",
			component: FindRecipe,
		},
	],
});

export default router;
