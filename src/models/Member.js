import BaseModel from './BaseModel';

class Member extends BaseModel {
	constructor() {
		super('members');
	}

	async createAsChild(payload, familyId) {
		const data = { ...payload, family_id: familyId, as: 'child' };
		return await this.create({ data });
	}

	async createAsHusband(payload, familyId) {
		const data = { ...payload, family_id: familyId, as: 'husband' };
		return await this.create({ data });
	}

	async createAsWife(payload, familyId) {
		const data = { ...payload, family_id: familyId, as: 'wife' };
		return await this.create({ data });
	}

	async getFamilies(memberId) {
		try {
			const response = await this._api.get(
				`${this._path}/${memberId}/families`,
			);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}
	async getChildren(memberId) {
		try {
			const response = await this._api.get(
				`${this._path}/${memberId}/children`,
			);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}

	async getParent(memberId) {
		try {
			const response = await this._api.get(
				`${this._path}/${memberId}/parent`,
			);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}

	async getSiblings(memberId) {
		try {
			const response = await this._api.get(
				`${this._path}/${memberId}/siblings`,
			);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}
}

export default new Member();
