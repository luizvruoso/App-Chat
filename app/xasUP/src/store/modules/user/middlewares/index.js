import {fetchAPI} from '../../../../service/api';

export async function getUserData() {
  const data = await fetchAPI('GET', '', null, null);
  if (data.status == 200) {
    return data;
  }

  return false;
}
