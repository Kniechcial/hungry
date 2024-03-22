import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";

import "primevue/resources/themes/lara-light-green/theme.css";
import "/node_modules/primeflex/primeflex.css";
import "primeicons/primeicons.css";
import ToastService from "primevue/toastservice";

import App from "./App.vue";
import router from "./router/index";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.mount("#app");
