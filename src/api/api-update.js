import api from '.';
import getToken from './get-token';
import { buildTextError } from 'src/utils/array-object';
import { forceRerender } from 'src/utils/buttons-click';
import { notifyError, notifySuccess, notifyConfirm } from 'src/utils/notify';

async function updateData({
	endPoint,
	data,
	rerender,
	loading,
	notify,
	params,
}) {
	try {
		api.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
		if (loading && typeof loading.value === 'boolean') loading.value = true;
		const response = await api.put(endPoint, data, { params });
		if (notify) notifySuccess(response.data.message);
		if (rerender) forceRerender();
		return response.data;
	} catch (error) {
		const message = error?.response?.data?.message;
		if (message) {
			notifyError(buildTextError(message));
		} else {
			console.log(`Error during update ${endPoint}`, error);
		}
		return false;
	} finally {
		if (loading && typeof loading.value === 'boolean')
			loading.value = false;
	}
}

async function apiUpdate({
	endPoint,
	data,
	confirm = true,
	message = '<span style="color:\'red\'">Update data ini?</span>',
	rerender,
	loading,
	notify = true,
	params,
}) {
	if (confirm) {
		const dialog = await notifyConfirm(message, true);
		return dialog
			? await updateData({
					endPoint,
					data,
					rerender,
					loading,
					notify,
					params,
				})
			: false;
	} else {
		return updateData({
			endPoint,
			data,
			rerender,
			loading,
			notify,
			params,
		});
	}
}

export default apiUpdate;
