import BaseModel from './BaseModel';

class Member extends BaseModel {
	constructor() {
		super('members');
	}
}

export default new Member();
