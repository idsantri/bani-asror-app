import Auth from "../layouts/AuthLayout.vue";
import Dashboard from "../layouts/MainLayout.vue";
const routes = [
  {
    path: "/logout",
    name: "Logout",
    component: () => import("../pages/auth/LogoutPage.vue"),
    meta: { title: "Logout" }
  },
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

  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    children: [
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
        // children: [
        //   {
        //     path: "profile",
        //     name: "FamiliesProfile",
        //     component: () => import("../pages/families/FamilyIndex.vue"),
        //     meta: { title: "Halaman Keluarga" }
        //   },
        //   {
        //     path: "children",
        //     name: "FamiliesChildren",
        //     component: () => import("../pages/families/FamilyIndex.vue"),
        //     meta: { title: "Halaman Keluarga" }
        //   }
        // ]
      },

      {
        path: "users",
        name: "Users",
        component: () => import("../pages/users/UserIndex.vue"),
        meta: { title: "Halaman Users" }
      }
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
