import { notifyError } from 'src/utils/notify';
import api from '.';

class UserCurrent {
	constructor() {
		this.path = 'user';
		this.api = api;
	}

	async getProfile() {
		try {
			const response = await this.api.get(`${this.path}`);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}

	async updateProfile(data) {
		try {
			const response = await this.api.put(`${this.path}`, data);
			return response.data;
		} catch (error) {
			console.log(error);
			notifyError(error.response.data.message);
			return false;
		}
	}
}
export default new UserCurrent();
