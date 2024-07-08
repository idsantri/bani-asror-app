import api from '.';
import getToken from './get-token';
import { buildTextError } from 'src/utils/array-object';
import { notifyError, notifySuccess } from 'src/utils/notify';

async function apiGet({ endPoint, loading, params, notify = false }) {
	api.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
	try {
		if (loading && typeof loading.value === 'boolean') loading.value = true;
		const { data } = await api.get(endPoint, { params });
		if (notify) notifySuccess(data.message);
		return data;
	} catch (error) {
		const message = error?.response?.data?.message;
		if (message) {
			notifyError(buildTextError(message));
		} else {
			console.log(`Error during get ${endPoint}`, error);
		}
		return false;
	} finally {
		if (loading && typeof loading.value === 'boolean')
			loading.value = false;
	}
}

export default apiGet;
