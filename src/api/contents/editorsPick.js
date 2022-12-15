import { createInstanceWithAuth } from "../index";
function getEditorsPickList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
    searchCategory: data.searchCategory,    
  };
  return createInstanceWithAuth("/editorPick/list", {}, param, "application/json; charset=utf-8").get();
}
function getEditorsPickDetail(id) {
  return createInstanceWithAuth(`/editorPick/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function editorsPickDelete(id) {
  return createInstanceWithAuth(`/editorPick/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}
function editorsPickAdd(data) {
    var frm = new FormData();
    frm.append("contentsCount", data.contentsCount);
    frm.append("contentsCreatorVideoSid", data.contentsCreatorVideoSid);
    return createInstanceWithAuth("/editorPick", frm, {}, "application/json; charset=utf-8").post();
}
function editorsPickModify(data) {
    let putData = {
      contentsCount: data.contentsCount,
      contentsCreatorVideoSid:data.contentsCreatorVideoSid
    }  
    return createInstanceWithAuth(`/editorPick/${data.contentsCountSid}`, putData, {}, "application/json; charset=utf-8").put();
}
export { getEditorsPickList, getEditorsPickDetail, editorsPickAdd, editorsPickDelete, editorsPickModify };
