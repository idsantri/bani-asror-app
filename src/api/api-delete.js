import api from '.';
import getToken from './get-token';
import { buildTextError } from 'src/utils/array-object';
import { forceRerender } from 'src/utils/buttons-click';
import { notifyError, notifySuccess, notifyConfirm } from 'src/utils/notify';

async function deleteData({ endPoint, loading, notify, rerender, params }) {
	api.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
	try {
		if (loading && typeof loading.value === 'boolean') loading.value = true;
		const response = await api.delete(endPoint, { params });
		if (notify) notifySuccess(response.data.message);
		if (rerender) forceRerender();
		return true;
	} catch (error) {
		const message = error?.response?.data?.message;
		if (message) {
			notifyError(buildTextError(message));
		} else {
			console.log(`Error during delete ${endPoint}`, error);
		}
		return false;
	} finally {
		if (loading && typeof loading.value === 'boolean')
			loading.value = false;
	}
}

async function apiDelete({
	endPoint,
	message = '<span style="color: red">Hapus data ini?</span>',
	rerender,
	params,
	loading,
	notify = true,
}) {
	const dialog = await notifyConfirm(message, true);
	return dialog
		? await deleteData({ endPoint, loading, notify, rerender, params })
		: false;
}

export default apiDelete;
