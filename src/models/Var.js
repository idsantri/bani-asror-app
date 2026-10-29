import BaseModel from './BaseModel';

class Var extends BaseModel {
	constructor() {
		super('vars');
	}

	async getTextHome() {
		return await this.getById({ id: 'text-home' });
	}

	async getTextAbout() {
		return await this.getById({ id: 'text-about' });
	}

	async getTextAdminGuide() {
		return await this.getById({ id: 'text-admin-guide' });
	}

	async updateTextHome(text = '') {
		return await this.update({ id: 'text-home', data: { val: text } });
	}

	async updateTextAbout(text = '') {
		return await this.update({ id: 'text-about', data: { val: text } });
	}

	async updateTextAdminGuide(text = '') {
		return await this.update({
			id: 'text-admin-guide',
			data: { val: text },
		});
	}
}

export default new Var();
