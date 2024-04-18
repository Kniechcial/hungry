import { createRouter, createWebHistory } from "vue-router";

import CreateRecipeStepTwo from "../components/CreateRecipe/CreateRecipeStepTwo.vue";
import ByNameTag from "../components/FindRecipe/ByNameTag.vue";
import RecipeList from "../components/FindRecipe/RecipeList.vue";
import TopBarMenu from "../components/Reusable/NavigateMainBar.vue";
import LogIn from "../components/User/LogIn/LogIn.vue";
import SingIn from "../components/User/CreateNewUser/SingIn.vue";
import UserPanel from "../components/User/UserPanel/UserPanel.vue";
import EditPassword from "../components/User/CreateNewUser/EditPassword.vue";
import RestorePassword from "../components/User/LogIn/RestorePassword.vue";
import ConfirmRerstorePassword from "../components/User/LogIn/ConfirmRestorePassword.vue";

import BaseRecipeView from "../views/BaseRecipe/baseRecipe.vue";
import CreateNewRecipe from "../views/CreateRecipe/CreateNewRecipeView.vue";
import HomeView from "../views/Home/HomeView.vue";

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
			path: "/ByNameTag",
			name: "ByNameTag",
			component: ByNameTag,
		},
		{
			path: "/RecipeList",
			name: "RecipeList",
			component: RecipeList,
		},
	],
});

export default router;
