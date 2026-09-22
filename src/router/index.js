import { route } from 'quasar/wrappers';
import {
	createRouter,
	createMemoryHistory,
	createWebHistory,
	createWebHashHistory,
} from 'vue-router';
import routes from './routes';
import { nextTick } from 'vue';
import { useAuthStore } from '../stores/auth-store';
import constanta from 'src/config/constanta';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

let routerInstance = null;
export default route(function (/* { store, ssrContext } */) {
	const createHistory = process.env.SERVER
		? createMemoryHistory
		: process.env.VUE_ROUTER_MODE === 'history'
			? createWebHistory
			: createWebHashHistory;

	const Router = createRouter({
		scrollBehavior: () => ({ left: 0, top: 0 }),
		routes,

		// Leave this as is and make changes in quasar.conf.js instead!
		// quasar.conf.js -> build -> vueRouterMode
		// quasar.conf.js -> build -> publicPath
		history: createHistory(
			process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE,
		),
	});

	Router.beforeEach((to) => {
		// redirect root ke /home
		if (to.fullPath === '/') {
			return '/home';
		}

		const store = useAuthStore();
		const authRoutes = ['Register', 'Login', 'Forgot', 'Reset'];
		const toAuthRoutes = authRoutes.includes(to.name);
		const isAuthenticated = store.getToken?.length > 0;

		// belum login & mengakses halaman terproteksi
		if (!toAuthRoutes && !isAuthenticated) {
			return { name: 'Login', query: { redirect: to.fullPath } };
		}

		// sudah login tapi mengakses halaman auth
		if (toAuthRoutes && isAuthenticated) {
			return '/home';
		}

		// lanjutkan navigasi
		return true;
	});

	const DEFAULT_TITLE = constanta.APP_NAME_2;
	Router.afterEach((to) => {
		nextTick(() => {
			document.title = to.meta.title
				? DEFAULT_TITLE + ' — ' + to.meta.title
				: DEFAULT_TITLE;
		});
	});

	routerInstance = Router;
	return Router;
});
export { routerInstance };
