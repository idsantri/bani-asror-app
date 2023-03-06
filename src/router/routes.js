import Auth from "../layouts/AuthLayout.vue";

const routes = [
  {
    path: "/",
    name: "Auth",
    component: Auth,
    children: [
      {
        path: "register",
        name: "Register",
        component: () => import("../pages/auth/RegisterPage.vue"),
        meta: { title: "Registrasi" }
      },
      {
        path: "login",
        name: "Login",
        component: () => import("../pages/auth/LoginPage.vue"),
        meta: { title: "Login" }
      },
      {
        path: "forgot",
        name: "Forgot",
        component: () => import("../pages/auth/ForgotPage.vue"),
        meta: { title: "Lupa Password" }
      },
      {
        path: "reset",
        name: "Reset",
        component: () => import("../pages/auth/ResetPage.vue"),
        meta: { title: "Ganti Password" }
      }
    ]
  },
  // {
  //   path: "/",
  //   name: "Dashboard",
  //   component: Dashboard,
  //   children: [
  //     {
  //       path: "home",
  //       name: "Home",
  //       component: () => import("./components/pages/home")
  //       // beforeEnter: (to, from, next) => {
  //       // 	console.log('from ', from);
  //       // 	console.log('to ', to);
  //       // 	next();
  //       // },
  //     },
  //     {
  //       path: "members/:id",
  //       name: "Members",
  //       component: () => import("./components/pages/members"),
  //       meta: { title: "Halaman Anggota" }
  //     },
  //     {
  //       path: "families/:id",
  //       name: "Families",
  //       component: () => import("./components/pages/families"),
  //       meta: { title: "Halaman Keluarga" }
  //     },
  //     {
  //       path: "profile",
  //       name: "Profile",
  //       component: () => import("./components/pages/profile"),
  //       meta: { title: "Halaman Profil" }
  //     },
  //     {
  //       path: "about",
  //       name: "About",
  //       component: () => import("./components/pages/about"),
  //       meta: { title: "Tentang Kami" }
  //     }
  //   ]
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("src/pages/error/ErrorNotFound.vue")
  }
];

export default routes;
