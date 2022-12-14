import { getSeedList,getSeedUserList,getSeedDetail, seedAdd } from "@/api/homepage/seed";
const contact = {
  namespaced: true,
  state: {
    getSeedList: {},
    getSeedUserList: {},
    getSeedDetail: {},
    seedAdd: {},
  },
  getters: {
    getSeedList: state => {
      return state.getSeedList;
    },
    getSeedUserList: state => {
        return state.getSeedUserList;
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
  },
  mutations: {
    getSeedList(state, list) {
      state.getSeedList = list;
    },
    getSeedUserList(state, list) {
        state.getSeedUserList = list;
      },    
    getSeedDetail(state, detail) {
      state.getSeedDetail = detail;
    },
    seedAdd(state, result) {
      state.seedAdd = result;
    },
  },
  actions: {
    async GET_SEED_LIST({ commit }, datas) {
      const { data } = await getSeedList(datas);
      commit("getSeedList", data);
    },
    async GET_SEEDUSER_LIST({ commit }, datas) {
        const { data } = await getSeedUserList(datas);
        commit("getSeedUserList", data);
      },    
    async GET_SEED_DETAIL({ commit }, id) {
      const { data } = await getSeedDetail(id);
      commit("getSeedDetail", data);
    },
    async SEED_ADD({ commit }, datas) {
      const { data } = await seedAdd(datas);
      commit("seedAdd", data);
    },
  },
};

export default contact;
