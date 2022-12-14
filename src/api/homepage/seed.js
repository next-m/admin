import { createInstanceWithAuth } from "../index";
function getSeedList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
  };
  return createInstanceWithAuth("/userSeed", {}, param, "application/json; charset=utf-8").get();
}
function getSeedUserList(id) {
    return createInstanceWithAuth(`/seed/list/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function getSeedDetail(id) {
  return createInstanceWithAuth(`/seed/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function seedAdd(data) {
  let paramData = {
    homepageUserSid: data.homepageUserSid,
    homepageUserSeedKind: data.homepageUserSeedKind,
    homepageUserSeedPrice: data.homepageUserSeedPrice,
  };
  return createInstanceWithAuth("/seed", paramData, {}, "application/json; charset=utf-8").post();
}

export { getSeedList,getSeedUserList, getSeedDetail, seedAdd};
