import api from '.';

class Auth {
	constructor() {
		this.path = 'auth';
		this.api = api;
	}

	async register(data) {
		const response = await this.api.post(`${this.path}/register`, data);
		return response.data;
	}

	async login(data) {
		const response = await this.api.post(`${this.path}/login`, data);
		return response.data;
	}

	async logout() {
		const response = await this.api.post(`${this.path}/logout`);
		return response.data;
	}

	async forgotPassword(data) {
		const response = await this.api.post(
			`${this.path}/password/forgot`,
			data,
		);
		return response.data;
	}

	async resetPassword(data) {
		const response = await this.api.post(
			`${this.path}/password/reset`,
			data,
		);
		return response.data;
	}

	async resendEmail(data) {
		const response = await this.api.post(`${this.path}/email/resend`, data);
		return response.data;
	}
}
export default new Auth();
