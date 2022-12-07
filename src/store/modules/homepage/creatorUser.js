import { getCreatorUserList, getCreatorUserDetail, creatorUserAdd, userCreatorDelete, creatorUserModify } from "@/api/homepage/creatorUser";
const contact = {
  namespaced: true,
  state: {
    getCreatorUserList: {},
    getCreatorUserDetail: {},
    creatorUserDeleteResult: {},
    creatorUserAdd: {},
    creatorUserModify: {},
  },
  getters: {
    getCreatorUserList: state => {
      return state.getCreatorUserList;
    },
    getCreatorUserDetail: state => {
      return state.getCreatorUserDetail;
    },
    creatorUserDeleteResult: state => {
      return state.creatorUserDeleteResult;
    },
    creatorUserAdd: state => {
      return state.creatorUserAdd;
    },
    creatoruserModify: state => {
      return state.creatorUserModify;
    },
  },
  mutations: {
    getCreatorUserList(state, list) {
      state.getCreatorUserList = list;
    },
    getCreatorUserDetail(state, detail) {
      state.getCreatorUserDetail = detail;
    },
    creatorUserDeleteResult(state, result) {
      state.creatorUserDeleteResult = result;
    },
    creatorUserAdd(state, result) {
      state.creatorUserAdd = result;
    },
    creatorUserModify(state, result) {
      state.creatorUserModify = result;
    },
  },
  actions: {
    async GET_CREATORUSER_LIST({ commit }, datas) {
      const { data } = await getCreatorUserList(datas);
      commit("getCreatorUserList", data);
    },
    async GET_CREATORUSER_DETAIL({ commit }, id) {
      const { data } = await getCreatorUserDetail(id);
      commit("getCreatorUserDetail", data);
    },
    async CREATORUSER_DELETE({ commit }, id) {
      const { data } = await userCreatorDelete(id);
      commit("creatorUserDeleteResult", data);
    },
    async CREATORUSER_ADD({ commit }, datas) {
      const { data } = await creatorUserAdd(datas);
      commit("creatorUserAdd", data);
    },
    async CREATORUSER_MODIFY({ commit }, datas) {
      const { data } = await creatorUserModify(datas);
      commit("creatorUserModify", data);
    },
  },
};

export default contact;
