import api from '.';
import getToken from './get-token';
import { buildTextError } from 'src/utils/array-object';
import { notifyError } from 'src/utils/notify';

/**
 * @deprecated
 * @param {*} object
 * @returns array
 */
async function getLists_({ loading, lists, key, sort = null, url = '' }) {
	api.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
	loading.value[key] = true;
	const endPoint = url?.length ? url : `lists/${key}`;
	try {
		const { data } = await api.get(endPoint);
		let result = data.lists;
		// abaikan huruf besar dan kecil
		if (sort === 'asc' || sort === true) {
			result.sort((a, b) =>
				a.localeCompare(b, undefined, { sensitivity: 'base' }),
			);
		} else if (sort === 'desc' || sort === false) {
			result.sort((a, b) =>
				b.localeCompare(a, undefined, { sensitivity: 'base' }),
			);
		}

		if (lists) {
			lists.value[key] = result;
		}
		return result;
	} catch (error) {
		const message = error?.response?.data?.message;
		if (message) {
			notifyError(buildTextError(message));
		} else {
			console.log(`Not Found lists: ${key} `, error);
		}
		return false;
	} finally {
		loading.value[key] = false;
	}
}

/**
 * @deprecated
 * @param {*} object
 * @returns array object
 */
async function getListsKey_({ loading, lists, key, sort = null, url = '' }) {
	api.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
	loading.value[key] = true;
	const endPoint = url?.length ? url : `lists/${key}`;
	const snakeCase = key.replace(/-/g, '_');
	try {
		const { data } = await api.get(endPoint);
		let result = data[snakeCase];
		if (sort === 'asc' || sort === true) {
			result.sort((a, b) => {
				return a.val0.localeCompare(b.val0, undefined, {
					sensitivity: 'base',
				});
			});
		} else if (sort === 'desc' || sort === false) {
			result.sort((a, b) => {
				return b.val0.localeCompare(a.val0, undefined, {
					sensitivity: 'base',
				});
			});
		}

		if (lists) {
			lists.value[key] = result;
		}
		return result;
	} catch (error) {
		const message = error?.response?.data?.message;
		if (message) {
			notifyError(buildTextError(message));
		} else {
			console.log(`Not Found lists: ${key} `, error);
		}
		return false;
	} finally {
		loading.value[key] = false;
	}
}

/**
 * @deprecated
 * @param {*} object
 * @returns array object
 */
async function getListsArray_({
	loadingArray,
	loading,
	key,
	sort = null,
	url = '',
}) {
	api.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;

	if (loadingArray) loadingArray.value[key] = true;
	if (loading) loading.value = true;

	const endPoint = url?.length ? url : `lists/${key}`;

	try {
		const { data } = await api.get(endPoint);
		let result = data.lists;
		if (sort === 'asc' || sort === true) {
			result.sort((a, b) =>
				a.localeCompare(b, undefined, { sensitivity: 'base' }),
			);
		} else if (sort === 'desc' || sort === false) {
			result.sort((a, b) =>
				b.localeCompare(a, undefined, { sensitivity: 'base' }),
			);
		}
		return result;
	} catch (error) {
		const message = error?.response?.data?.message;
		if (message) {
			notifyError(buildTextError(message));
		} else {
			console.log(`Not Found lists: ${key} `, error);
		}
		return false;
	} finally {
		if (loadingArray) loadingArray.value[key] = false;
		if (loading) loading.value = false;
	}
}

/**
 * @param {*} object
 * @returns array object
 */
async function getLists({ loadingArray, loading, key, sort = null, url = '' }) {
	api.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;

	if (loadingArray) loadingArray.value[key] = true;
	if (loading) loading.value = true;

	const endPoint = url?.length ? url : `lists/${key}`;
	const snakeCase = key.replace(/-/g, '_');

	try {
		const { data } = await api.get(endPoint);
		let result = data[snakeCase];
		if (sort === 'asc' || sort === true) {
			result.sort((a, b) => {
				return a.val0.localeCompare(b.val0, undefined, {
					sensitivity: 'base',
				});
			});
		} else if (sort === 'desc' || sort === false) {
			result.sort((a, b) => {
				return b.val0.localeCompare(a.val0, undefined, {
					sensitivity: 'base',
				});
			});
		}
		return result;
	} catch (error) {
		const message = error?.response?.data?.message;
		if (message) {
			notifyError(buildTextError(message));
		} else {
			console.log(`Not Found lists: ${key} `, error);
		}
		return false;
	} finally {
		if (loadingArray) loadingArray.value[key] = false;
		if (loading) loading.value = false;
	}
}

function hasObject(array) {
	for (let i = 0; i < array.length; i++) {
		if (typeof array[i] === 'object') {
			return true;
		}
	}
	return false;
}

/**
 * @param {*} object
 * @returns array object
 */
async function getListsCustom({
	loadingArray,
	loading,
	key,
	url,
	params,
	sort = null,
}) {
	api.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;

	if (loadingArray) loadingArray.value[key] = true;
	if (loading) loading.value = true;

	try {
		const { data } = await api.get(url, { params });
		// lists.value[key] = data[key];
		let result = data[key].filter((el) => el != null);
		if (!hasObject(result)) {
			if (sort === 'asc' || sort === true) {
				result.sort((a, b) =>
					a.localeCompare(b, undefined, { sensitivity: 'base' }),
				);
			} else if (sort === 'desc' || sort === false) {
				result.sort((a, b) =>
					b.localeCompare(a, undefined, { sensitivity: 'base' }),
				);
			}
		}
		return result;
	} catch (error) {
		const message = error?.response?.data?.message;
		if (message) {
			notifyError(buildTextError(message));
		} else {
			console.log(`Not Found lists: ${key} `, error);
		}
		return false;
	} finally {
		if (loadingArray) loadingArray.value[key] = false;
		if (loading) loading.value = false;
	}
}

export { getLists_, getListsKey_, getListsArray_, getLists, getListsCustom };
