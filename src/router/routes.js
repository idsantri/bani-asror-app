import Auth from '../layouts/AuthLayout.vue';
import Dashboard from '../layouts/MainLayout.vue';
const routes = [
	{
		path: '/logout',
		name: 'Logout',
		component: () => import('../pages/auth/LogoutPage.vue'),
		meta: { title: 'Logout' },
	},
	{
		path: '/',
		name: 'Auth',
		component: Auth,
		children: [
			{
				path: 'register',
				name: 'Register',
				component: () => import('../pages/auth/RegisterPage.vue'),
				meta: { title: 'Registrasi' },
			},
			{
				path: 'login',
				name: 'Login',
				component: () => import('../pages/auth/LoginPage.vue'),
				meta: { title: 'Login' },
			},
			{
				path: 'forgot',
				name: 'Forgot',
				component: () => import('../pages/auth/ForgotPage.vue'),
				meta: { title: 'Lupa Password' },
			},
			{
				path: 'reset',
				name: 'Reset',
				component: () => import('../pages/auth/ResetPage.vue'),
				meta: { title: 'Ganti Password' },
			},
		],
	},

	{
		path: '/',
		name: 'Dashboard',
		component: Dashboard,
		children: [
			//MEMBERS
			{
				path: 'members/:id',
				redirect: { name: 'Member Profile' },
				// name: "Member",
				// component: () => import("../pages/members/MemberIndex.vue"),
				// meta: { title: "Halaman Anggota" },
			},
			{
				path: 'members/:id/profile',
				name: 'Member Profile',
				component: () => import('../pages/members/MemberIndex.vue'),
				meta: { title: 'Halaman Anggota (Profil)' },
			},
			{
				path: 'members/:id/families',
				name: 'Member Families',
				component: () => import('../pages/members/MemberIndex.vue'),
				meta: { title: 'Halaman Anggota (Keluarga)' },
			},
			{
				path: 'members/:id/children',
				name: 'Member Children',
				component: () => import('../pages/members/MemberIndex.vue'),
				meta: { title: 'Halaman Anggota (Anak)' },
			},

			//FAMILIES
			{
				path: 'families/:id',
				redirect: { name: 'Family Profile' },
				// name: "Family",
				// component: () => import("../pages/families/FamilyIndex.vue"),
				// meta: { title: "Halaman Keluarga" }
			},
			{
				path: 'families/:id/profile',
				name: 'Family Profile',
				component: () => import('../pages/families/FamilyIndex.vue'),
				meta: { title: 'Halaman Keluarga (Profil)' },
			},
			{
				path: 'families/:id/children',
				name: 'Family Children',
				component: () => import('../pages/families/FamilyIndex.vue'),
				meta: { title: 'Halaman Keluarga (Anak)' },
			},

			{
				path: 'home',
				name: 'Home',
				component: () => import('../pages/home/HomeIndex.vue'),
				meta: { title: 'Beranda' },
			},
			{
				path: 'users',
				name: 'Users',
				component: () => import('../pages/users/UserIndex.vue'),
				meta: { title: 'Halaman Users' },
			},
			{
				path: 'profile',
				name: 'Profile',
				component: () => import('../pages/profile/ProfileIndex.vue'),
				meta: { title: 'Halaman Profil' },
			},
			{
				path: 'reports',
				name: 'Reports',
				component: () =>
					import('../pages/reports/IntroductionIndex.vue'),
				meta: { title: 'Halaman Laporan' },
			},
			{
				path: 'about',
				name: 'About',
				component: () => import('../pages/about/AboutIndex.vue'),
				meta: { title: 'About' },
			},
		],
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import('src/pages/error/ErrorNotFound.vue'),
	},
];

export default routes;
