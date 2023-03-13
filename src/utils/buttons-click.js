import memberState from "../stores/member-crud-store";
const forceRerender = () => {
  document.getElementById("btn-force-rerender").click();
};

const showModalSearch = (param) => {
  memberState().$reset();
  memberState().familyId = param.familyId;
  memberState().title = param.title;
  memberState().isChild = param.isChild;
  document.getElementById("btn-show-modal-search").click();
};

export { forceRerender, showModalSearch };
