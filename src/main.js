import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import appHeader from "@/components/shared/appHeader";
import bookmarkListIndex from "@/components/shared/bookmarkList/bookmarkListIndex";
import "@/assets/style.css";
import { appAxios } from "@/utils/appAxios";
import store from "@/store";

const app = createApp(App);
app.component("appHeader", appHeader);
app.component("bookmarkListIndex", bookmarkListIndex);
app.config.globalProperties.$appAxios = appAxios;
app.use(store);
app.use(router);
app.mount("#app");
