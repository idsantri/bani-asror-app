import { notifyError } from 'src/utils/notify';
import { api } from 'src/boot/axios';

class Report {
	constructor() {
		this.path = 'reports';
		this.api = api;
	}

	async create(data) {
		try {
			const response = await this.api.post(`${this.path}`, data);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}

	async markAsDone(id) {
		try {
			const response = await this.api.put(`${this.path}/${id}`, {
				is_responded: true,
			});
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}

	async getIntroduction() {
		try {
			const response = await this.api.get(`${this.path}/introduction`);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}

	async acceptIntroduction(data) {
		try {
			const response = await this.api.put(
				`${this.path}/introduction`,
				data,
			);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}

	async getCountResponded() {
		try {
			const response = await this.api.get(`${this.path}/count/1`);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}

	async getCountNotResponded() {
		try {
			const response = await this.api.get(`${this.path}/count/0`);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}
}

export default new Report();
