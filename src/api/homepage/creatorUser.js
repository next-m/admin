import { createInstanceWithAuth } from "../index";
function getCreatorUserList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
  };
  return createInstanceWithAuth("/creatorUser/list", {}, param, "application/json; charset=utf-8").get();
}
function getCreatorUserDetail(id) {
  return createInstanceWithAuth(`/creatorUser/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function userCreatorDelete(id) {
  return createInstanceWithAuth(`/creatorUser/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}
function creatorUserAdd(data) {
    var frm = new FormData();
    if (data.nextmFiles.length > 0) {
      data.nextmFiles.forEach(row => {
        frm.append("nextmFiles[]", row);
      });
    }
    frm.append("homepageUserCreatorSid", data.homepageUserCreatorSid);
    frm.append("homepageUserCreatorChurch", data.homepageUserCreatorChurch);
    frm.append("homepageUserCreatorChurchPlatform", data.homepageUserCreatorChurchPlatform);
    frm.append("homepageUserCreatorChurchPosition", data.homepageUserCreatorChurchPosition);
    frm.append("homepageUserCreatorYoutubeChannel", data.homepageUserCreatorYoutubeChannel);
    frm.append("homepageUserCreatorYoutubeUrl", data.homepageUserCreatorYoutubeUrl);
    frm.append("homepageUserCreatorStatus", data.homepageUserCreatorStatus);

    return createInstanceWithAuth("/creatorUser", frm, {}, "application/json; charset=utf-8").post();
}
function creatorUserModify(data) {
    var frm = new FormData();
    if (data.nextmFiles.length > 0) {
      data.nextmFiles.forEach(row => {
        frm.append("nextmFiles[]", row);
      });
    }
    frm.append("homepageUserCreatorSid", data.homepageUserCreatorSid);
    frm.append("homepageUserCreatorChurch", data.homepageUserCreatorChurch);
    frm.append("homepageUserCreatorChurchPlatform", data.homepageUserCreatorChurchPlatform);
    frm.append("homepageUserCreatorChurchPosition", data.homepageUserCreatorChurchPosition);
    frm.append("homepageUserCreatorYoutubeChannel", data.homepageUserCreatorYoutubeChannel);
    frm.append("homepageUserCreatorYoutubeUrl", data.homepageUserCreatorYoutubeUrl);
    frm.append("homepageUserCreatorStatus", data.homepageUserCreatorStatus);

    return createInstanceWithAuth(`/creatorUser/${data.homepageUserCreatorSid}`, frm, {}, "application/json; charset=utf-8").post();
}
export { getCreatorUserList, getCreatorUserDetail, creatorUserAdd, userCreatorDelete, creatorUserModify };
