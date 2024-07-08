// import { baseUrl } from 'boot/axios';
import axios from 'axios';
import config from 'src/config';
import { notifyError } from 'src/utils/notify';

const url =
	process.env.NODE_ENV == 'development'
		? 'http://localhost:8080'
		: config.BASE_API;

const baseUrl = axios.create({ baseURL: url });
baseUrl.defaults.withCredentials = true;

const api = baseUrl;
// Tambahkan interceptor untuk menangani kesalahan
api.interceptors.response.use(
	(response) => response,
	(error) => {
		// Tangani kesalahan jaringan atau koneksi di sini
		if (!error.response) {
			// Kesalahan tidak ada respons (seperti jaringan terputus)
			// console.log('e', error);
			notifyError('Tidak dapat terhubung ke server');
		} else {
			// Teruskan kesalahan lain ke blok catch berikutnya
			return Promise.reject(error);
		}
	},
);
export default api;
