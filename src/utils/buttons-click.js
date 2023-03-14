import memberCrudState from "../stores/member-crud-store";
const forceRerender = () => {
  document.getElementById("btn-force-rerender").click();
};

const crud = (param = {}) => {
  // memberCrudState().$reset();
  memberCrudState().title = param.title || "";
  memberCrudState().familyId = param.familyId || null;
  memberCrudState().isHusband = param.isHusband || false;
  memberCrudState().isWife = param.isWife || false;
  memberCrudState().isChild = param.isChild || false;
  memberCrudState().member = param.member || {};
};
const showModalSearch = (param = {}) => {
  crud(param);
  document.getElementById("btn-show-modal-search").click();
};

const showModalCrud = (param = {}) => {
  crud(param);
  document.getElementById("btn-show-modal-crud").click();
};

export { forceRerender, showModalSearch, showModalCrud };
