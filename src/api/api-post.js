import api from '.';
import getToken from './get-token';
import { buildTextError } from 'src/utils/array-object';
import { forceRerender } from 'src/utils/buttons-click';
import { notifyConfirm, notifyError, notifySuccess } from 'src/utils/notify';

async function postData({ endPoint, data, rerender, loading, notify, params }) {
	try {
		api.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
		if (loading && typeof loading.value === 'boolean') loading.value = true;
		const response = await api.post(endPoint, data, { params });
		if (notify) notifySuccess(response.data.message);
		if (rerender) forceRerender();
		return response.data;
	} catch (error) {
		const message = error?.response?.data?.message;
		if (message) {
			notifyError(buildTextError(message));
		} else {
			console.log(`Error during post ${endPoint}`, error);
		}
		return false;
	} finally {
		if (loading && typeof loading.value === 'boolean')
			loading.value = false;
	}
}

async function apiPost({
	endPoint,
	data,
	confirm = false,
	message = 'Simpan data?',
	rerender,
	loading,
	notify = true,
	params,
}) {
	const execute = () =>
		postData({
			endPoint,
			data,
			rerender,
			loading,
			notify,
			params,
		});

	if (confirm) {
		const dialog = await notifyConfirm(message, true);
		return dialog ? await execute() : false;
	} else {
		return execute();
	}
}

export default apiPost;
