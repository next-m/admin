import { getSeedList, getSeedDetail, seedAdd, seedDelete, seedModify } from "@/api/homepage/seed";
const contact = {
  namespaced: true,
  state: {
    getSeedList: {},
    getSeedDetail: {},
    seedDeleteResult: {},
    seedAdd: {},
    seedModify: {},
  },
  getters: {
    getSeedList: state => {
      return state.getSeedList;
    },
    getSeedDetail: state => {
      return state.getSeedDetail;
    },
    seedDeleteResult: state => {
      return state.seedDeleteResult;
    },
    seedAdd: state => {
      return state.seedAdd;
    },
    seedModify: state => {
      return state.seedModify;
    },
  },
  mutations: {
    getSeedList(state, list) {
      state.getSeedList = list;
    },
    getSeedDetail(state, detail) {
      state.getSeedDetail = detail;
    },
    seedDeleteResult(state, result) {
      state.seedDeleteResult = result;
    },
    seedAdd(state, result) {
      state.seedAdd = result;
    },
    seedModify(state, result) {
      state.seedModify = result;
    },
  },
  actions: {
    async GET_SEED_LIST({ commit }, datas) {
      const { data } = await getSeedList(datas);
      commit("getSeedList", data);
    },
    async GET_SEED_DETAIL({ commit }, id) {
      const { data } = await getSeedDetail(id);
      commit("getSeedDetail", data);
    },
    async SEED_DELETE_RESULT({ commit }, id) {
      const { data } = await creatorSeedDelete(id);
      commit("seedDeleteResult", data);
    },
    async SEED_ADD({ commit }, datas) {
      const { data } = await seedAdd(datas);
      commit("seedAdd", data);
    },
    async SEED_MODIFY({ commit }, datas) {
      const { data } = await seedModify(datas);
      commit("seedModify", data);
    },
  },
};

export default contact;
