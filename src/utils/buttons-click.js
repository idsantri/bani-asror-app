import memberCrudState from "../stores/member-crud-store";
const forceRerender = () => {
  document.getElementById("btn-force-rerender").click();
};

const showModalSearch = (param = {}) => {
  memberCrudState().$reset();
  memberCrudState().title = param.title || memberCrudState().getTitle;
  memberCrudState().familyId = param.familyId || null;
  memberCrudState().isHusband = param.isHusband || false;
  memberCrudState().isWife = param.isWife || false;
  memberCrudState().isChild = param.isChild || false;
  document.getElementById("btn-show-modal-search").click();
};

export { forceRerender, showModalSearch };
