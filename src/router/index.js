import store from "@/store";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    name: "Home",
    path: "/",
    component: () => import("@/views/homeComp"),
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("@/views/loginComp"),
  },
  {
    name: "register",
    path: "/register",
    component: () => import("@/views/registerComp"),
  },
  {
    name: "newBookmark",
    path: "/new",
    component: () => import("@/views/newBookmark"),
  },
  {
    name: "Favorites",
    path: "/favorites",
    component: () => import("@/views/userAccount"),
  },
  {
    name: "Likes",
    path: "/likes",
    component: () => import("@/views/userAccount"),
  },
  {
    name: "Settings",
    path: "/settings",
    component: () => import("@/views/userAccount"),
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

router.beforeEach((to, _, next) => {
  const authRequiredRoutes = ["Home"];
  const authNotRequiredRoutes = ["Login", "register"];
  const _isAuthenticated = store.getters._isAuthenticated;
  if ((authNotRequiredRoutes.indexOf(to.name) > -1) & _isAuthenticated) next(false);
  if (authRequiredRoutes.indexOf(to.name) > -1) {
    if (_isAuthenticated) next();
    else next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
