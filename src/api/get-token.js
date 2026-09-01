import { useAuthStore as auth } from 'stores/auth-store';

/**
 * @deprecated
 */
const getToken = () =>
	auth().getToken && auth().getToken.length > 0
		? auth().getToken
		: 'FAIL TO GET TOKEN';
export default getToken;
