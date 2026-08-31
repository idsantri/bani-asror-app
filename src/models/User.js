import BaseModel from './BaseModel';

class User extends BaseModel {
	constructor() {
		super('users');
	}
}
export default new User();
