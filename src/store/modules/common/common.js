import {
  fileDelete,
  getMenuList,
  getNoticeList,
  getNoticeDetail,
  noticeDel,
  noticeModify,
  noticeWrite,

  getOneononeList,
  getOneononeDetail,
  oneononeDel,
  oneononeModify,
  oneononeWrite,


  getFaqList,
  getFaqDetail,
  faqModify,
  setStrativeZone,
  faqWrite,
  faqDel,

  // comment
  getCommentDetail,
  commentAdd,
  commentUpdate,
  commentDelete,

  // video file
  getVideoDetail,
  getVideoTransDetail,
  addVideo,
  deleteVideo,
  convertVideo,

  // news
  getNews,
  detailNews,
  addNews,
  updateNews,
  deleteNews,
} from "@/api/common/common";
const common = {
  namespaced: true,
  state: {
    getMenuList: {},
    getNoticeList: {},
    getNoticeDetail: {},
    noticeDelResult: {},
    noticeModifyResult: {},
    noticeWriteResult: {},

    getOneononeList: {},
    getOneononeDetail: {},
    oneononeDelResult: {},
    oneononeModifyResult: {},
    oneononeWriteResult: {},
    
    getFaqList: {},
    getFaqDetail: {},
    setStrativeZoneResult: {},
    fileDeleteResult: {},
    faqModifyResult: {},
    faqDelResult: {},
    faqWriteResult: {},

    // comment
    getCommentDetail: {},
    commentAdd: {},
    commentUpdate: {},
    commentDelete: {},

    // video file
    getVideoDetail: {},
    getVideoTransDetail: {},
    addVideo: {},
    deleteVideo: {},
    convertVideo: {},
    percentage: 0,

    // news
    getNews: {},
    detailNews: {},
    addNews: {},
    updateNews: {},
    deleteNews: {},
  },
  getters: {
    getMenuList: state => {
      return state.getMenuList;
    },

    getNoticeList: state => {
      return state.getNoticeList;
    },
    getNoticeDetail: state => {
      return state.getNoticeDetail;
    },
    noticeDelResult: state => {
      return state.noticeDelResult;
    },
    noticeModifyResult: state => {
      return state.noticeModifyResult;
    },
    noticeWriteResult: state => {
      return state.noticeWriteResult;
    },    

    getOneononeList: state => {
      return state.getOneononeList;
    },
    getOneononeDetail: state => {
      return state.getOneononeDetail;
    },
    oneononeDelResult: state => {
      return state.oneononeDelResult;
    },
    oneononeModifyResult: state => {
      return state.oneononeModifyResult;
    },
    oneononeWriteResult: state => {
      return state.oneononeWriteResult;
    },    
    
    getFaqList: state => {
      return state.getFaqList;
    },
    getFaqDetail: state => {
      return state.getFaqDetail;
    },

    setStrativeZoneResult: state => {
      return state.setStrativeZoneResult;
    },
    fileDeleteResult: state => {
      return state.fileDeleteResult;
    },
    faqModifyResult: state => {
      return state.faqModifyResult;
    },
    faqDelResult: state => {
      return state.faqDelResult;
    },
    faqWriteResult: state => {
      return state.faqWriteResult;
    },

    // comment
    getCommentDetail: state => {
      return state.getCommentDetail;
    },
    commentAdd: state => {
      return state.commentAdd;
    },
    commentUpdate: state => {
      return state.commentUpdate;
    },
    commentDelete: state => {
      return state.commentDelete;
    },

    // video file
    getVideoDetail: state => {
      return state.getVideoDetail;
    },
    getVideoTransDetail: state => {
      return state.getVideoTransDetail;
    },
    addVideo: state => {
      return state.addVideo;
    },
    deleteVideo: state => {
      return state.deleteVideo;
    },
    convertVideo: state => {
      return state.convertVideo;
    },
    percentage: state => {
      return state.percentage;
    },

    // news
    getNews: state => {
      return state.getNews;
    },
    detailNews: state => {
      return state.detailNews;
    },
    addNews: state => {
      return state.addNews;
    },
    updateNews: state => {
      return state.updateNews;
    },
    deleteNews: state => {
      return state.deleteNews;
    },
  },
  mutations: {
    getMenuList(state, data) {
      state.getMenuList = data;
    },

    getNoticeList(state, data) {
      state.getNoticeList = data;
    },
    getNoticeDetail(state, data) {
      state.getNoticeDetail = data;
    },
    noticeDelResult(state, result) {
      state.noticeDelResult = result;
    },
    noticeModifyResult(state, result) {
      state.noticeModifyResult = result;
    },
    noticeWriteResult(state, result) {
      state.noticeWriteResult = result;
    },

    getOneononeList(state, data) {
      state.getOneononeList = data;
    },
    getOneononeDetail(state, data) {
      state.getOneononeDetail = data;
    },
    oneononeDelResult(state, result) {
      state.oneononeDelResult = result;
    },
    oneononeModifyResult(state, result) {
      state.oneononeModifyResult = result;
    },
    oneononeWriteResult(state, result) {
      state.oneononeWriteResult = result;
    },

    getFaqList(state, data) {
      state.getFaqList = data;
    },
    getFaqDetail(state, data) {
      state.getFaqDetail = data;
    },

    setStrativeZoneResult(state, result) {
      state.setStrativeZoneResult = result;
    },
    fileDeleteResult(state, result) {
      state.fileDeleteResult = result;
    },
    faqModifyResult(state, result) {
      state.faqModifyResult = result;
    },
    faqDelResult(state, result) {
      state.faqDelResult = result;
    },
    faqWriteResult(state, result) {
      state.faqWriteResult = result;
    },

    // comment
    getCommentDetail(state, result) {
      state.getCommentDetail = result;
    },
    commentAdd(state, result) {
      state.commentAdd = result;
    },
    commentUpdate(state, result) {
      state.commentUpdate = result;
    },
    commentDelete(state, result) {
      state.commentDelete = result;
    },

    // video file
    getVideoDetail(state, result) {
      state.getVideoDetail = result;
    },
    getVideoTransDetail(state, result) {
      state.getVideoTransDetail = result;
    },
    addVideo(state, result) {
      state.addVideo = result;
    },
    deleteVideo(state, result) {
      state.deleteVideo = result;
    },
    convertVideo(state, result) {
      state.convertVideo = result;
    },
    percentage(state, list) {
      state.percentage = list;
    },

    // news
    getNews(state, list) {
      state.getNews = list;
    },
    detailNews(state, list) {
      state.detailNews = list;
    },
    addNews(state, list) {
      state.addNews = list;
    },
    updateNews(state, list) {
      state.updateNews = list;
    },
    deleteNews(state, list) {
      state.deleteNews = list;
    },
  },
  actions: {
    async MENU_LIST({ commit }, id) {
      const { data } = await getMenuList(id);
      commit("getMenuList", data);
    },

    async NOTICE_LIST({ commit }, datas) {
      const { data } = await getNoticeList(datas);
      commit("getNoticeList", data);
    },
    async NOTICE_DETAIL({ commit }, datas) {
      const { data } = await getNoticeDetail(datas);
      commit("getNoticeDetail", data);
    },
    async NOTICE_DEL({ commit }, id) {
      const { data } = await noticeDel(id);
      commit("noticeDelResult", data);
    },
    async NOTICE_MODIFY({ commit }, datas) {
      const { data } = await noticeModify(datas);
      commit("noticeModifyResult", data);
    },
    async NOTICE_WRITE({ commit }, datas) {
      const { data } = await noticeWrite(datas);
      commit("noticeWriteResult", data);
    },


    async ONEONONE_LIST({ commit }, datas) {
      const { data } = await getOneononeList(datas);
      commit("getOneononeList", data);
    },
    async ONEONONE_DETAIL({ commit }, datas) {
      const { data } = await getOneononeDetail(datas);
      commit("getOneononeDetail", data);
    },
    async ONEONONE_DEL({ commit }, id) {
      const { data } = await oneononeDel(id);
      commit("oneononeDelResult", data);
    },
    async ONEONONE_MODIFY({ commit }, datas) {
      const { data } = await oneononeModify(datas);
      commit("oneononeModifyResult", data);
    },
    async ONEONONE_WRITE({ commit }, datas) {
      console.log(1);
      const { data } = await oneononeWrite(datas);
      console.log(2);
      commit("oneononeWriteResult", data);
    },

    async FAQ_LIST({ commit }, datas) {
      const { data } = await getFaqList(datas);
      commit("getFaqList", data);
    },
    async FAQ_DETAIL({ commit }, datas) {
      const { data } = await getFaqDetail(datas);
      commit("getFaqDetail", data);
    },
    async STRATIVE_ZONE({ commit }, datas) {
      const { data } = await setStrativeZone(datas);
      commit("setStrativeZoneResult", data);
    },
    async FILE_DELETE({ commit }, id) {
      const { data } = await fileDelete(id);
      commit("fileDeleteResult", data);
    },
    async FAQ_MODIFY({ commit }, datas) {
      const { data } = await faqModify(datas);
      commit("faqModifyResult", data);
    },
    async FAQ_DEL({ commit }, id) {
      const { data } = await faqDel(id);
      commit("faqDelResult", data);
    },
    async FAQ_WRITE({ commit }, datas) {
      const { data } = await faqWrite(datas);
      commit("faqWriteResult", data);
    },

    // comment
    async COMMENT_DETAIL({ commit }, id) {
      const { data } = await getCommentDetail(id);
      commit("getCommentDetail", data);
    },
    async COMMENT_ADD({ commit }, datas) {
      const { data } = await commentAdd(datas);
      commit("commentAdd", data);
    },
    async COMMENT_UPDATE({ commit }, datas) {
      const { data } = await commentUpdate(datas);
      commit("commentUpdate", data);
    },
    async COMMENT_DELETE({ commit }, id) {
      const { data } = await commentDelete(id);
      commit("commentDelete", data);
    },

    // video file
    async GET_VIDEO_DETAIL({ commit }, d) {
      const { data } = await getVideoDetail(d);
      commit("getVideoDetail", data);
    },
    async GET_VIDEO_TRANS_DETAIL({ commit }, id) {
      const { data } = await getVideoTransDetail(id);
      commit("getVideoTransDetail", data);
    },
    async ADD_VIDEO({ commit }, d) {
      const { data } = await addVideo(d, commit);
      commit("addVideo", data);
    },
    async DELETE_VIDEO({ commit }, id) {
      const { data } = await deleteVideo(id);
      commit("deleteVideo", data);
    },
    async CONVERT_VIDEO({ commit }, id) {
      const { data } = await convertVideo(id);
      commit("convertVideo", data);
    },
    async GET_PERCENTAGE({ commit }) {
      commit("percentage");
    },

    // news
    async GET_NEWS({ commit }, d) {
      const { data } = await getNews(d);
      commit("getNews", data);
    },
    async DETAIL_NEWS({ commit }, id) {
      const { data } = await detailNews(id);
      commit("detailNews", data);
    },
    async ADD_NEWS({ commit }, d) {
      const { data } = await addNews(d);
      commit("addNews", data);
    },
    async UPDATE_NEWS({ commit }, d) {
      const { data } = await updateNews(d);
      commit("updateNews", data);
    },
    async DELETE_NEWS({ commit }, id) {
      const { data } = await deleteNews(id);
      commit("deleteNews", data);
    },
  },
};

export default common;
