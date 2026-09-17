import { notifyConfirm, notifyError } from 'src/utils/notify';
import { api } from 'src/boot/axios';

class Child {
	_path = 'children';

	constructor() {
		this._api = api;
	}

	async updateUrut(id, urut) {
		try {
			const response = await this._api.put(`${this._path}/${id}/short`, {
				urut,
			});
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}

	async remove(id) {
		const isConfirmed = await notifyConfirm(
			'<span style="color: red">Hapus yang bersangkutan dari daftar anak?</span>',
		);

		if (!isConfirmed) {
			return false;
		}

		try {
			const response = await this._api.delete(`${this._path}/${id}`);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}
}

export default new Child();
