import {youtubeSearch,getCreatorVideoList, getCreatorVideoDetail, creatorVideoAdd, creatorVideoDelete, creatorVideoModify } from "@/api/contents/creatorVideo";
const contact = {
  namespaced: true,
  state: {
    getYoutubeInfo: {},    
    getCreatorVideoList: {},
    getCreatorVideoDetail: {},
    creatorVideoDeleteResult: {},
    creatorVideoAdd: {},
    creatorVideoModify: {},
  },
  getters: {
    getYoutubeResult: state => {
      return state.getYoutubeInfo;
    },    
    getCreatorVideoList: state => {
      return state.getCreatorVideoList;
    },
    getCreatorVideoDetail: state => {
      return state.getCreatorVideoDetail;
    },
    creatorVideoDeleteResult: state => {
      return state.creatorVideoDeleteResult;
    },
    creatorVideoAdd: state => {
      return state.creatorVideoAdd;
    },
    creatorVideoModify: state => {
      return state.creatorVideoModify;
    },
  },
  mutations: {
    getYoutubeInfo(state, detail) {
      state.getYoutubeInfo = detail;
    },    
    getCreatorVideoList(state, list) {
      state.getCreatorVideoList = list;
    },
    getCreatorVideoDetail(state, detail) {
      state.getCreatorVideoDetail = detail;
    },
    creatorVideoDeleteResult(state, result) {
      state.creatorVideoDeleteResult = result;
    },
    creatorVideoAdd(state, result) {
      state.creatorVideoAdd = result;
    },
    creatorVideoModify(state, result) {
      state.creatorVideoModify = result;
    },
  },
  actions: {
    async GET_YOUTUBE_INFO({ commit }, datas) {
      const { data } = await youtubeSearch(datas);
      commit("getYoutubeInfo", data);
    },    
    async GET_CREATORVIDEO_LIST({ commit }, datas) {
      const { data } = await getCreatorVideoList(datas);
      commit("getCreatorVideoList", data);
    },
    async GET_CREATORVIDEO_DETAIL({ commit }, id) {
      const { data } = await getCreatorVideoDetail(id);
      commit("getCreatorVideoDetail", data);
    },
    async CREATORVIDEO_DELETE({ commit }, id) {
      const { data } = await creatorVideoDelete(id);
      commit("creatorVideoDeleteResult", data);
    },
    async CREATORVIDEO_ADD({ commit }, datas) {
      const { data } = await creatorVideoAdd(datas);
      commit("creatorVideoAdd", data);
    },
    async CREATORVIDEO_MODIFY({ commit }, datas) {
      const { data } = await creatorVideoModify(datas);
      commit("creatorVideoModify", data);
    },
  },
};

export default contact;
