import { createInstanceWithAuth } from "../index";
function getSeedList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
  };
  return createInstanceWithAuth("/userSeed", {}, param, "application/json; charset=utf-8").get();
}
function getSeedDetail(id) {
  return createInstanceWithAuth(`/userSeed/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function seedDelete(id) {
  return createInstanceWithAuth(`/userSeed/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}
function seedAdd(data) {
  let paramData = {
    homepageUserKind: data.homepageUserKind,
    homepageUserEmail: data.homepageUserEmail,
    homepageUserName: data.homepageUserName,
    homepageUserConfigPromotion: data.homepageUserConfigPromotion,
    homepageUserConfigSms: data.homepageUserConfigSms,
    homepageUserConfigEmail: data.homepageUserConfigEmail,
    homepageUserConfigPush: data.homepageUserConfigPush,
    homePageUserStatus: data.homePageUserStatus,
    password_confirmation: data.password_confirmation,
    homepageUserTestFlag: data.homepageUserTestFlag,
    password: data.password,
  };
  return createInstanceWithAuth("/userSeed", paramData, {}, "application/json; charset=utf-8").post();
}
function seedModify(data) {
  let paramData = {
    homepageUserSid: data.homepageUserSid,
    homepageUserEmail: data.homepageUserEmail,
    homepageUserName: data.homepageUserName,
    homepageUserConfigPromotion: data.homepageUserConfigPromotion,
    homepageUserConfigSms: data.homepageUserConfigSms,
    homepageUserConfigEmail: data.homepageUserConfigEmail,
    homepageUserConfigPush: data.homepageUserConfigPush,
    homePageUserStatus: data.homePageUserStatus,
    homepageUserTestFlag: data.homepageUserTestFlag,
    password: data.password,
  };
  return createInstanceWithAuth(`/userSeed/${data.homepageUserSid}`, paramData, {}, "application/json; charset=utf-8").put();
}
export { getSeedList, getSeedDetail, seedAdd, seedDelete, seedModify };
