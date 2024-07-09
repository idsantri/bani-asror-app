import axios from 'axios';
import config from '.';

const url =
	process.env.NODE_ENV == 'development'
		? 'http://localhost:8080'
		: config.BASE_API;

/**
 * @deprecated
 */
const api = axios.create({ baseURL: url });

/**
 * @deprecated
 */
const apiTokened = axios.create({ baseURL: url });
const auth = JSON.parse(localStorage.getItem('auth'));
const token = auth ? auth.token : 'FAIL TO GET TOKEN';
apiTokened.defaults.headers.common['Authorization'] = 'Bearer ' + token;
// console.log(token);
export { api, apiTokened };
