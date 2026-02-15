import { defineStore } from 'pinia';
export default defineStore('family', {
	state: () => {
		return {
			family: {},
		};
	},
	getters: {
		getFamily: (state) => state.family,
	},
	persist: true,
});
