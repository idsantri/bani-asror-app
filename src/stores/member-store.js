import { defineStore } from "pinia";
export default defineStore("member", {
  state: () => {
    return {
      title: "Anggota",
      familyId: null,
      isHusband: false,
      isWife: false,
      isChild: false,
      member: {}
    };
  },
  getters: {
    getTitle: (state) => state.title,
    getFamilyId: (state) => state.familyId,
    getIsHusband: (state) => state.isHusband,
    getIsWife: (state) => state.isWife,
    getIsChild: (state) => state.isChild,
    getMember: (state) => state.member
  }
});
