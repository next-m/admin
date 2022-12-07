import { getContactList, getcontactDetail, contactDelete, contactModify } from "@/api/homepage/inquire";
const contact = {
  namespaced: true,
  state: {
    getContactList: {},
    getcontactDetail: {},
    contactModifyResult: {},
    contactDeleteResult: {},
  },
  getters: {
    getContactList: state => {
      return state.getContactList;
    },
    getcontactDetail: state => {
      return state.getcontactDetail;
    },
    contactModifyResult: state => {
      return state.contactModifyResult;
    },
    contactDeleteResult: state => {
      return state.contactDeleteResult;
    },
  },
  mutations: {
    getContactList(state, contactList) {
      state.getContactList = contactList;
    },
    getcontactDetail(state, detail) {
      state.getcontactDetail = detail;
    },
    contactModifyResult(state, result) {
      state.contactModifyResult = result;
    },
    contactDeleteResult(state, result) {
      state.contactDeleteResult = result;
    },
  },
  actions: {
    async CONTACT_LIST({ commit }, datas) {
      const { data } = await getContactList(datas);
      commit("getContactList", data);
    },
    async CONTACT_DETAIL({ commit }, id) {
      const { data } = await getcontactDetail(id);
      commit("getcontactDetail", data);
    },
    async CONTACT_MODIFY({ commit }, datas) {
      const { data } = await contactModify(datas);
      commit("contactModifyResult", data);
    },
    async CONTACT_DEL({ commit }, id) {
      const { data } = await contactDelete(id);
      commit("contactDeleteResult", data);
    },
  },
};

export default contact;
