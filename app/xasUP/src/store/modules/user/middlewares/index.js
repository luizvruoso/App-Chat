import {fetchAPI} from '../../../../service/api';

export async function getUserData() {
  const data = await fetchAPI('GET', '', null, null);
  if (data.status == 200) {
    return data;
  }

  return false;
}

export async function sendGroupCreate(payload) {
  const data = await fetchAPI('POST', '/createGroup', null, payload);
  if (data.status == 200) {
    return data;
  }

  return false;
}

export async function getGroupsServer(payload) {
  const data = await fetchAPI('POST', '/getGroupsFromUser', null, payload);
  if (data.status == 200) {
    return data;
  }

  return false;
}

export async function postLeaveGroup(payload) {
  const data = await fetchAPI('DELETE', '/deleteUserFromGroup', null, payload);
  if (data.status == 200) {
    return data;
  }

  return false;
}
