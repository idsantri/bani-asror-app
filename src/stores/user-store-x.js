import { defineStore } from "pinia";

const useUserStore = defineStore("user", {
  state: () => ({
    token: null,
    user: null,
    group: null,
  }),
  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    getGroup: (state) => state.group,
  },
  actions: {
    setUser(payload) {
      console.log("setuser", payload);
      if (payload.group) this.group = payload.group;
      if (payload.user) this.user = payload.user;
      if (payload.token) this.token = payload.token;
    },

    clearUser() {
      this.group = null;
      this.user = null;
      this.token = null;
    },
  },
  persist: true,
});

export default useUserStore;
