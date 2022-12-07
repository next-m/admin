import { createInstanceWithAuth } from "../index";
function getContactList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
    serchInquireStartDate: data.serchInquireStartDate,
    serchInquireEndDate: data.serchInquireEndDate,
    serchInquireKind: data.serchInquireKind,
    serchInquireStatus: data.serchInquireStatus,
  };
  return createInstanceWithAuth("/inquire/list", {}, param, "application/json; charset=utf-8").get();
}
function getcontactDetail(data) {
  return createInstanceWithAuth(`/inquire/${data.inquireSid}`, {}, {}, "application/json; charset=utf-8").get();
}
function contactDelete(id) {
  return createInstanceWithAuth(`/inquire/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}
function contactModify(data) {
  let paramData = {
    inquireAnswer: data.inquireAnswer,
  };
  return createInstanceWithAuth(`/inquire/${data.inquireSid}`, paramData, {}, "application/json; charset=utf-8").put();
}
export { getContactList, getcontactDetail, contactDelete, contactModify };
