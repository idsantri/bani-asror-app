import { defineStore } from 'pinia';
export default defineStore('search', {
	state: () => {
		return {
			title: 'Anggota',
			familyId: null,
			isHusband: false,
			isWife: false,
			isChild: false,
		};
	},
	getters: {
		getTitle: (state) => state.title,
		getFamilyId: (state) => state.familyId,
		getIsHusband: (state) => state.isHusband,
		getIsWife: (state) => state.isWife,
		getIsChild: (state) => state.isChild,
	},
});
