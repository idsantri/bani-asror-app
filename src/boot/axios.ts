// file: src/boot/axios.ts
import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { useAuthStore } from 'src/stores/auth-store';
import { routerInstance } from 'src/router';
import { notifyError } from 'src/utils/notify';
import config from 'src/config';
import { App } from 'vue/dist/vue.js';

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$axios: AxiosInstance;
		$api: AxiosInstance;
	}
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const url =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:8080'
		: config.BASE_API;

/**
 * Later on you can access $api in any component like this:
 * this.$api
 * this.$api.get('/user')
 *
 * OR by importing it directly in your script:
 * import { api } from 'src/boot/axios'
 *
 * OR by injecting it in the setup() function of your component:
 * import { inject } from 'vue'
 * const api = inject('api')
 */
const api = axios.create({ baseURL: url });

api.interceptors.request.use((cfg) => {
	const authStore = useAuthStore();
	if (authStore.token) {
		cfg.headers.Authorization = `Bearer ${authStore.token}`;
	}
	cfg.headers['X-Timezone'] =
		Intl.DateTimeFormat().resolvedOptions().timeZone;
	return cfg;
});

api.interceptors.response.use(
	(res) => res,
	(err) => {
		if (!err.response) {
			notifyError('Tidak dapat terhubung ke server');
		} else if (err?.response?.data?.data?.code === 'TOKEN_EXPIRED') {
			notifyError(
				err?.response?.data?.message ||
					'Masa berlaku token telah habis.',
			);
			const authStore = useAuthStore();
			authStore.logout();
			setTimeout(() => routerInstance.push({ name: 'Login' }), 2500);
		} else {
			return Promise.reject(err);
		}
	},
);

export default boot(({ app }: { app: App }) => {
	// for use inside Vue files (Options API) through this.$axios and this.$api

	app.config.globalProperties.$axios = axios;
	// ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
	//       so you won't necessarily have to import axios in each vue file

	app.config.globalProperties.$api = api;
	// ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
	//       so you can easily perform requests against your app's API

	app.provide('api', api);
});

export { api };
