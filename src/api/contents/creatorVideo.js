import { createInstanceWithAuth } from "../index";

async function getCreatorVideoList(data) {
  let param = {
    size: data.size ? data.size : '',
    page: data.page ? data.page : '',
    searchText: data.searchText,
    searchCategory: data.searchCategory,
    searchStatus: data.searchStatus,
  };
  return createInstanceWithAuth('/creatorVideo/list', {}, param, 'application/json; charset=utf-8').get();
}
async function creatorVideoDetail(creatorVideoSid) {
  return createInstanceWithAuth(`/creatorVideo/${creatorVideoSid}`, {}, {}, 'application/json; charset=utf-8').get();
}
async function creatorVideoInsert(data) {
  var frm = new FormData();
  if (data.nextm1Files.length > 0) {
    data.nextm1Files.forEach(row => {
      frm.append('nextmFiles[]', row);
    });
  }
  if (data.nextm2Files.length > 0) {
    data.nextm2Files.forEach(row => {
      frm.append('nextmFiles1[]', row);
    });
  }
  frm.append('homepageUserSid', data.homepageUserSid);
  frm.append('creatorVideoTitle', data.creatorVideoTitle);
  frm.append('creatorVideoYoutubeUrl', data.creatorVideoYoutubeUrl);
  frm.append('creatorVideoCategory', data.creatorVideoCategory);
  frm.append('creatorVideoLangs', data.creatorVideoLangs);
  frm.append('creatorVideoDoc', data.creatorVideoDoc);
  frm.append('creatorVideoDate', data.creatorVideoDate);

  return createInstanceWithAuth('/creatorVideo', frm, {}, 'application/json; charset=utf-8').post();
}
async function creatorVideoUpdate(data) {
  var frm = new FormData();
  if (data.nextm1Files.length > 0) {
    data.nextm1Files.forEach(row => {
      frm.append('nextmFiles[]', row);
    });
  }
  if (data.nextm2Files.length > 0) {
    data.nextm2Files.forEach(row => {
      frm.append('nextmFiles1[]', row);
    });
  }
  frm.append('creatorVideoTitle', data.creatorVideoTitle);
  frm.append('creatorVideoYoutubeUrl', data.creatorVideoYoutubeUrl);
  frm.append('creatorVideoCategory', data.creatorVideoCategory);
  frm.append('creatorVideoLangs', data.creatorVideoLangs);
  frm.append('creatorVideoDoc', data.creatorVideoDoc);
  frm.append('creatorVideoDate', data.creatorVideoDate);

  return createInstanceWithAuth(`/creatorVideo/${data.creatorVideoSid}`, frm, {}, 'application/json; charset=utf-8').post();
}
async function creatorVideoDelete(creatorVideoSid) {
  return createInstanceWithAuth(`/creatorVideo/${creatorVideoSid}`, {}, {}, 'application/json; charset=utf-8').delete();
}
async function youtubeSearch(data) {
  return createInstanceWithAuth(`/youtube/${data.youtubeId}`, {}, {}, 'application/json; charset=utf-8').get();
}

export {creatorVideoInsert, creatorVideoUpdate, creatorVideoDetail, creatorVideoDelete, getCreatorVideoList, youtubeSearch };
