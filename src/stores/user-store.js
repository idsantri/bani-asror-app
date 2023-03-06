import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    id: null,
    email: null,
    token: null,
    username: null
  }),
  getters: {
    getId: (state) => state.id,
    getEmail: (state) => state.email,
    getUsername: (state) => state.username,
    getToken: (state) => state.token
  },
  actions: {
    async login(login, password) {
      try {
        const res = await api.post("login", { login, password });
        console.log(res);
      } catch (error) {
        if (error) throw error;
      }
    },
    setUser(payload) {
      // console.log("payload", payload);
      if (payload.id) this.id = payload.id;
      if (payload.email) this.email = payload.email;
      if (payload.username) this.username = payload.username;
      if (payload.token) this.token = payload.token;
      // console.log("token", this.token);
    },

    clearUser() {
      this.id = null;
      this.email = null;
      this.username = null;
      this.token = null;
    }
  },
  persist: true
});
