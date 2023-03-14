import { defineStore } from "pinia";
export default defineStore("member", {
  state: () => {
    return {
      member: {}
    };
  },
  getters: {
    getMember: (state) => state.member
  },
  persist: true
});
