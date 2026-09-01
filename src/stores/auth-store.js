import { defineStore } from 'pinia';

const useAuthStore = defineStore('auth', {
	state: () => ({
		token: null,
		user: null,
		groups: null,
		roles: null,
	}),
	getters: {
		getUser: (state) => state.user,
		getToken: (state) => state.token,
		getGroup: (state) => state.groups,
		getRoles: (state) => state.roles,
		isAdminOrSuperAdmin: (state) =>
			state.roles?.some((role) =>
				['admin', 'superadmin'].includes(role),
			) || false,
	},
	actions: {
		setUser(payload) {
			if (payload.user) this.user = payload.user;
			if (payload.groups) this.groups = payload.groups;
			if (payload.roles) this.roles = payload.roles;
			if (payload.token) this.token = payload.token;
		},

		logout() {
			this.groups = null;
			this.user = null;
			this.token = null;
			this.roles = null;
		},
	},
	persist: true,
});

export { useAuthStore };
