import { notifyConfirm, notifyError } from 'src/utils/notify';
import BaseModel from './BaseModel';

class Family extends BaseModel {
	constructor() {
		super('families');
	}

	async getChildren(familyId) {
		try {
			const response = await this._api.get(
				`${this._path}/${familyId}/children`,
			);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}

	async addChild(familyId, data) {
		try {
			const response = await this._api.post(
				`${this._path}/${familyId}/children`,
				data,
			);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}

	/**
	 * Hapus pasangan dari keluarga
	 *
	 * @param {*} familyId
	 * @param {husband | wife} spouse
	 * @returns {Promise}
	 */
	async removeSpouse(familyId, spouse) {
		let pasangan;
		if (spouse.toLowerCase() === 'husband') pasangan = 'suami';
		if (spouse.toLowerCase() === 'wife') pasangan = 'istri';

		const isConfirmed = await notifyConfirm(
			`<span style="color: red">Hapus ${pasangan} dari keluarga ini?</span>`,
		);

		if (!isConfirmed) {
			return false;
		}

		try {
			const response = await this._api.delete(
				`${this._path}/${familyId}/${spouse}`,
			);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}
}

export default new Family();
