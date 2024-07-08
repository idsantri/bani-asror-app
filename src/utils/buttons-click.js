import memberCrudState from '../stores/member-crud-store';
const forceRerender = () => {
	document.getElementById('btn-force-rerender').click();
};

const crudState = (param = {}) => {
	// memberCrudState().$reset();
	memberCrudState().familyId = param.familyId || null;
	memberCrudState().isHusband = param.isHusband || false;
	memberCrudState().isWife = param.isWife || false;
	memberCrudState().isChild = param.isChild || false;
	memberCrudState().member = param.member || {};
};

const showModalSearch = (param = {}) => {
	crudState(param);
	document.getElementById('btn-show-modal-search').click();
};

const closeModalSearch = () => {
	document.getElementById('btn-close-modal-search').click();
};

const showModalCrud = (reset = true) => {
	if (reset) crudState();
	document.getElementById('btn-show-modal-crud').click();
};

export { forceRerender, showModalSearch, showModalCrud, closeModalSearch };
