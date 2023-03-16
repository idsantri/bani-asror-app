import Auth from "../layouts/AuthLayout.vue";
import Dashboard from "../layouts/MainLayout.vue";
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
      },
      {
        path: "logout",
        name: "Logout",
        component: () => import("../pages/auth/LogoutPage.vue"),
        meta: { title: "Logout" }
      }
    ]
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    children: [
      {
        path: "search",
        name: "Search",
        component: () => import("../pages/search/SearchMember.vue"),
        meta: { title: "Cari Anggota" }
        // beforeEnter: (to, from, next) => {
        // 	console.log('from ', from);
        // 	console.log('to ', to);
        // 	next();
        // },
      },
      {
        path: "members/:id",
        name: "Members",
        component: () => import("../pages/members/MemberIndex.vue"),
        meta: { title: "Halaman Anggota" }
      },
      {
        path: "families/:id",
        name: "Families",
        component: () => import("../pages/families/FamilyIndex.vue"),
        meta: { title: "Halaman Keluarga" }
      }
      // {
      //   path: "profile",
      //   name: "Profile",
      //   component: () => import("./components/pages/profile"),
      //   meta: { title: "Halaman Profil" }
      // },
      // {
      //   path: "about",
      //   name: "About",
      //   component: () => import("./components/pages/about"),
      //   meta: { title: "Tentang Kami" }
      // }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("src/pages/error/ErrorNotFound.vue")
  }
];

export default routes;
