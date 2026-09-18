import { notifyError } from 'src/utils/notify';
import { api } from 'src/boot/axios';

class Article {
	_path = 'settings/article-introduction';

	constructor() {
		this._api = api;
	}

	async get() {
		try {
			const response = await this._api.get(`${this._path}`);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}

	async update(data) {
		try {
			const response = await this._api.put(`${this._path}`, data);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}
}

export default new Article();
