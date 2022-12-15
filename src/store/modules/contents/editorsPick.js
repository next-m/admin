import { getEditorsPickList, getEditorsPickDetail, editorsPickAdd, editorsPickDelete, editorsPickModify } from "@/api/contents/editorsPick";
const contact = {
  namespaced: true,
  state: {
    getEditorsPickList: {},
    getEditorsPickDetail: {},
    editorsPickDeleteResult: {},
    editorsPickAdd: {},
    editorsPickModify: {},
  },
  getters: {
    getEditorsPickList: state => {
      return state.getEditorsPickList;
    },
    getEditorsPickDetail: state => {
      return state.getEditorsPickDetail;
    },
    editorsPickDeleteResult: state => {
      return state.editorsPickDeleteResult;
    },
    editorsPickAdd: state => {
      return state.editorsPickAdd;
    },
    editorsPickModify: state => {
      return state.editorsPickModify;
    },
  },
  mutations: {
    getEditorsPickList(state, list) {
      state.getEditorsPickList = list;
    },
    getEditorsPickDetail(state, detail) {
      state.getEditorsPickDetail = detail;
    },
    editorsPickDeleteResult(state, result) {
      state.editorsPickDeleteResult = result;
    },
    editorsPickAdd(state, result) {
      state.editorsPickAdd = result;
    },
    editorsPickModify(state, result) {
      state.editorsPickModify = result;
    },
  },
  actions: {
    async GET_EDITORSPICK_LIST({ commit }, datas) {
      const { data } = await getEditorsPickList(datas);
      commit("getEditorsPickList", data);
    },
    async GET_EDITORSPICK_DETAIL({ commit }, id) {
      const { data } = await getEditorsPickDetail(id);
      commit("getEditorsPickDetail", data);
    },
    async EDITORSPICK_DELETE({ commit }, id) {
      const { data } = await editorsPickDelete(id);
      commit("editorsPickDeleteResult", data);
    },
    async EDITORSPICK_ADD({ commit }, datas) {
      const { data } = await editorsPickAdd(datas);
      commit("editorsPickAdd", data);
    },
    async EDITORSPICK_MODIFY({ commit }, datas) {
      const { data } = await editorsPickModify(datas);
      commit("editorsPickModify", data);
    },
  },
};

export default contact;
