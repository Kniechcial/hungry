import { createRouter, createWebHistory } from "vue-router";

import LogInView from "../views/userView/LogInView.vue";
import TestView from "../views/RecipeView/TestView.vue";
import UserPanelView from "../views/userView/UserPanelView.vue";
import RecipeView from "../views/RecipeView/RecipeView.vue";
import TopBarMenu from "../views/BaseView/topBarMenu.vue";
import SingIn from "../views/userView/SingInView.vue";
import EditPassword from "../views/userView/EditPasswordView.vue";
import RestorePassword from "../views/userView/RestorePasswordView.vue";
import ConfirmPassword from "../views/userView/confirmPasswordView.vue";
import MainView from "../views/BaseView/mainView.vue";
import ConfirmRerstorePassword from "../views/userView/confirmRestorePassword.vue";
import BaseRecipeView from "../views/BaseView/base-recipe-view/baseRecipe.vue";
import BaseRecipeList from "../views/BaseView/base-recipe-view/base-recipe-list.vue";
import AddRecipe from "../views/RecipeView/addRecipe.vue";
import NewRecipe2 from "../views/RecipeView/New-recipe/NewRecipe-2.vue";
import getTag from "../components/tag/getTag.vue";
import RecipeList from "../views/BaseView/recipeList.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "MainView",
			component: MainView,
		},
		{
			path: "/LogInView",
			name: "LogInView",
			component: LogInView,
		},
		{
			path: "/test",
			name: "test",
			component: TestView,
		},
		{
			path: "/user",
			name: "user",
			component: UserPanelView,
		},
		{
			path: "/addRecipe",
			name: "addRecipe",
			component: AddRecipe,
		},
		{
			path: "/TopBarMenu",
			name: "TopBarMenu",
			component: TopBarMenu,
		},
		{
			path: "/recipe",
			name: "recipe",
			component: RecipeView,
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
			path: "/confirmpassword",
			name: "confirmpassword",
			component: ConfirmPassword,
		},
		{
			path: "/mainView",
			name: "mainView",
			component: MainView,
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
			path: "/newRecipe2",
			name: "newRecipe2",
			component: NewRecipe2,
		},
		{
			path: "/RecipeList",
			name: "RecipeList",
			component: RecipeList,
		},
		{
			path: "/BaseRecipeList",
			name: "BaseRecipeList",
			component: BaseRecipeList,
		},
		{
			path: "/getTag",
			name: "getTag",
			component: getTag,
		},
	],
});

export default router;
