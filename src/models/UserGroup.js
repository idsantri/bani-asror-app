import { notifyConfirm, notifyError } from 'src/utils/notify';
import BaseModel from './BaseModel';

class UserGroup extends BaseModel {
	constructor() {
		super('user-groups');
	}
	async getByGroup(group) {
		try {
			const response = await this._api.get(`${this._path}/${group}`);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}

	async addToGroup({ userId, group, message = '' }) {
		const isConfirmed = await notifyConfirm(message);
		if (!isConfirmed) return false;

		try {
			const response = await this._api.put(
				`${this._path}/users/${userId}`,
				{
					group,
				},
			);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}
	async removeFromGroup({ userId, group, message = '' }) {
		const isConfirmed = await notifyConfirm(message);
		if (!isConfirmed) return false;

		try {
			const response = await this._api.delete(
				`${this._path}/users/${userId}/${group}`,
			);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}
}
export default new UserGroup();
