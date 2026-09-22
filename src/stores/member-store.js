import { defineStore } from 'pinia';
import Member from 'src/models/Member';

function wildcardMatch(text, pattern) {
	// escape karakter regex spesial, lalu ubah * menjadi .*
	const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const regexStr = escaped.replace(/\\\*/g, '.*').replace(/\\\?/g, '.');
	return new RegExp(regexStr, 'i').test(text);
}

export const useMemberStore = defineStore('members-store', {
	state: () => ({
		member: {},
		members: [],
		filter: '',
		loading: false,
	}),

	getters: {
		filteredMembers: (state) => {
			if (state.filter) {
				if (!state.members?.length) return state.members;
				const pattern = state.filter.trim();
				return state.members.filter((member) =>
					wildcardMatch(member.nama ?? '', pattern),
				);
			}
			return state.members;
		},
	},

	actions: {
		safeParse(val) {
			try {
				const arr = JSON.parse(val ?? '[]');
				return Array.isArray(arr) ? arr : [];
			} catch {
				return [];
			}
		},

		async loadMembers() {
			try {
				this.loading = true;
				const response = await Member.getAll();
				if (response) {
					const data = response.data.members.map((i) => {
						i.spouse_json = this.safeParse(i.spouse_json);
						return i;
					});
					this.members = data;
				}
			} catch (error) {
				console.error(error);
			} finally {
				this.loading = false;
			}
		},
	},

	persist: {
		storage: localStorage,
	},
});
