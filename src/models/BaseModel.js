import { notifyConfirm, notifyError } from 'src/utils/notify';
import api from '.';

export default class BaseModel {
	constructor(path) {
		this._path = path;
		this._api = api;
	}

	async getAll(params = {}) {
		try {
			const response = await this._api.get(this._path, { params });
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}

	async getById({ id, params = {} }) {
		try {
			const response = await this._api.get(`${this._path}/${id}`, {
				params,
			});
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}

	async create({ data, confirm = false, message = '' }) {
		if (message || confirm) {
			const isConfirmed = await notifyConfirm(
				message || 'Simpan data ini?',
			);
			if (!isConfirmed) {
				return false;
			}
		}
		try {
			const response = await this._api.post(this._path, data);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}

	async update({ id, data, params = {}, confirm = false, message = '' }) {
		if (message || confirm) {
			const isConfirmed = await notifyConfirm(
				message || 'Update data ini?',
			);

			if (!isConfirmed) {
				return false;
			}
		}
		try {
			const response = await this._api.put(`${this._path}/${id}`, data, {
				params,
			});
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}

	async remove({ id, params = {}, confirm = true, message = '' }) {
		if (message || confirm) {
			const isConfirmed = await notifyConfirm(
				message || '<span style="color: red">Hapus data ini?</span>',
			);

			if (!isConfirmed) {
				return false;
			}
		}
		try {
			const response = await this._api.delete(`${this._path}/${id}`, {
				params,
			});
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}
}
