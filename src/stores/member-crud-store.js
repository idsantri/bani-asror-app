import { defineStore } from "pinia";
export default defineStore("memberCRUD", {
  state: () => {
    return {
      title: "Anggota",
      familyId: null,
      isHusband: false,
      isWife: false,
      isChild: false,
      isNew: false,
      member: {}
    };
  },
  getters: {
    getTitle: (state) => state.title,
    getFamilyId: (state) => state.familyId,
    getIsHusband: (state) => state.isHusband,
    getIsWife: (state) => state.isWife,
    getIsChild: (state) => state.isChild,
    getIsNew: (state) => state.isChild || state.isHusband || state.isWife,
    getMember: (state) => state.member
  },
  persist: true
});
