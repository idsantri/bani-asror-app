import axios from 'axios';
import { useAuthStore } from 'src/stores/auth-store';
import { notifyError } from 'src/utils/notify';
import { routerInstance } from 'src/router/index';
import ax from 'src/api';
const api = axios.create({
	baseURL: ax.defaults.baseURL,
	// withCredentials: true, // no need to send cookies, stateless
});

const authStore = useAuthStore();

api.interceptors.request.use((config) => {
	const token = authStore.getToken;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	config.headers['X-Timezone'] = timezone;
	return config;
});

// response
api.interceptors.response.use(
	(response) => {
		// console.log('🚀 ~ response:', response);
		return response;
	},
	(error) => {
		// Tangani kesalahan jaringan atau koneksi di sini
		if (!error.response) {
			// Kesalahan tidak ada respons (seperti jaringan terputus)
			// console.log('e', error);
			notifyError('Tidak dapat terhubung ke server');
		} else {
			//  'code' => 'TOKEN_EXPIRED',
			if (error?.response?.data?.data?.code == 'TOKEN_EXPIRED') {
				notifyError(
					error?.response?.data?.message ||
						'Masa berlaku token telah habis.',
				);
				authStore.logout();
				setTimeout(() => {
					routerInstance.push({ name: 'Login' });
				}, 2500);
				return;
			} else {
				// Teruskan kesalahan lain ke blok catch berikutnya
				return Promise.reject(error);
			}
		}
	},
);

export default api;
