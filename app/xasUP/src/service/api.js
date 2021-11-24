import axios from 'axios';
//import {URL_API} from '../env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const URL_API = {
  URL: 'http://177.194.52.168:8082',
};

function ServiceException(message, customMessage = null) {
  this.message = message;
  this.customMessage = customMessage;
  this.name = 'ServiceException';
}

const API = axios.create({
  baseURL: URL_API.URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchAPI(method, path, params = null, data = null) {
  //var BearerToken = null;
  /*try {
    BearerToken = await AsyncStorage.getItem('@token');
  } catch (e) {
    // error reading value
  }*/
  return await API({
    method: method,
    url: path,
    params: params,
    data: data,
    /* headers: {
      Authorization: 'Bearer ' + BearerToken,
    },*/
    //withCredentials: true,
  }).catch(error => {
    console.error('FETCH API - ', error);

    throw new ServiceException(error.message, error?.response?.data?.message);
  });
}
