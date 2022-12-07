import { createInstanceWithAuth } from "../index";
function getUserList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
  };
  return createInstanceWithAuth("/adminUser/list", {}, param, "application/json; charset=utf-8").get();
}
function getUserDetail(data) {
  return createInstanceWithAuth(`/adminUser/${data.adminUserSid}`, {}, {}, "application/json; charset=utf-8").get();
}
function setUser(data) {
  var frm = new FormData();
  if (data.nextmFiles.length > 0) {
    data.nextmFiles.forEach(row => {
      frm.append("nextmFiles[]", row);
    });
  }

  frm.append("adminUserName", data.adminUserName);
  frm.append("adminUserEmail", data.adminUserEmail);
  frm.append("password", data.password);
  frm.append("password_confirmation", data.password_confirmation);
  frm.append("adminUserLevel", data.adminUserLevel);
  frm.append("adminUserUseFlag", data.adminUserUseFlag);
  frm.append("adminUserKind", data.adminUserKind);
  frm.append("adminUserPhoto", data.adminUserPhoto);
  frm.append("adminUserChurch", data.adminUserChurch);
  frm.append("adminUserChurchPlatform", data.adminUserChurchPlatform);
  frm.append("adminUserChurchPosition", data.adminUserChurchPosition);

  frm.append("adminUserYoutubeChannel", data.adminUserYoutubeChannel);
  frm.append("adminUserYoutubeUrl", data.adminUserYoutubeUrl);
  return createInstanceWithAuth(`/adminUser`, frm, {}, "application/json; charset=utf-8").post();  
}
function userDelete(id) {
  return createInstanceWithAuth(`/adminUser/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}
function userModify(data) {
  var frm = new FormData();
  if (data.nextmFiles.length > 0) {
    data.nextmFiles.forEach(row => {
      frm.append("nextmFiles[]", row);
    });
  }

  frm.append("adminUserName", data.adminUserName);
  frm.append("adminUserEmail", data.adminUserEmail);
  frm.append("password", data.password);
  frm.append("password_confirmation", data.password_confirmation);
  frm.append("adminUserLevel", data.adminUserLevel);
  frm.append("adminUserUseFlag", data.adminUserUseFlag);
  frm.append("adminUserKind", data.adminUserKind);
  frm.append("adminUserPhoto", data.adminUserPhoto);
  frm.append("adminUserChurch", data.adminUserChurch);
  frm.append("adminUserChurchPlatform", data.adminUserChurchPlatform);
  frm.append("adminUserChurchPosition", data.adminUserChurchPosition);

  frm.append("adminUserYoutubeChannel", data.adminUserYoutubeChannel);
  frm.append("adminUserYoutubeUrl", data.adminUserYoutubeUrl);
  
  return createInstanceWithAuth(`/adminUser/${data.adminUserSid}`, frm, {}, "application/json; charset=utf-8").post();
}
export { getUserList, getUserDetail, setUser, userDelete, userModify };
