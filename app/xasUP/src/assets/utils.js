import moment from 'moment/min/moment-with-locales';
import momentTz from 'moment-timezone';
import Geolocation from '@react-native-community/geolocation';

export function convertDate(date, ptBr = true) {
  if (ptBr) return moment(date).format('DD[/]MM[/]YYYY');
  else {
    return moment(date).format('YYYY[-]MM[-]DD');
  }
}

export function fromDateTimeGetTime(dateTime) {
  return momentTz
    .tz(dateTime, 'America/Sao_Paulo')
    .locale('pt-br')
    .format('H:mm:ss');
}

export function fromDateToDate(date) {
  return moment(date).format('YYYY[-]MM[-]DD').toString();
}

export function fromDate(dateTime) {
  return momentTz.tz(dateTime, 'America/Sao_Paulo').format();
}

export function now() {
  return momentTz().locale('pt-br').format();
}

export function formatCel(v) {
  //var v = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  var r = v.replace(/\D/g, '');
  r = r.replace(/^0/, '');
  if (r.length > 10) {
    // 11+ digits. Format as 5+4.
    // r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, '(0XX$1) $2-$3');
    r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, '(0$1) $2-$3');
  } else if (r.length > 6) {
    // 6..10 digits. Format as 4+4
    //r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '(0XX$1) $2-$3');
    r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '(0$1) $2-$3');
  } else if (r.length > 2) {
    // 3..5 digits. Add (0XX..)
    //r = r.replace(/^(\d\d)(\d{0,5})/, '(0XX$1) $2');
    r = r.replace(/^(\d\d)(\d{0,5})/, '(0$1) $2');
  } else if (r.length > 1) {
    // 0..2 digits. Just add (0XX
    //r = r.replace(/^(\d*)/, '(0XX$1');
    r = r.replace(/^(\d*)/, '(0$1');
  }
  return r;
}

export function watchPosition() {
  var options = {
    enableHighAccuracy: true,
    //timeout: 2000,
    maximumAge: 10000,
  };
  //console.log('Markers Constructor', this.MARKERS);
  /*  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      // SOLICITA A LOCALIZAÇÃO ATUAL DO USUARIO, BASEADA NA VARIAVEL OPTIONS ACIMA
      info => {
        resolve({
          timeOfCapture: new Date().getTime(),
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      error => {
        console.error(error, ' Erro ao obter localização');
        reject({
          latitude: null,
          longitude: null,
        });
      },
      options,
    );
  });
*/

  return new Promise((resolve, reject) => {
    //Geolocation.requestAuthorization();
    Geolocation.watchPosition(
      // SOLICITA A LOCALIZAÇÃO ATUAL DO USUARIO, BASEADA NA VARIAVEL OPTIONS ACIMA
      info => {
        resolve({
          timeOfCapture: new Date().getTime(),
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      error => {
        console.error(error, ' Erro ao obter localização');
        reject({
          latitude: null,
          longitude: null,
        });
      },
      options,
    );
  });
}

export function getUserLocation() {
  var options = {
    enableHighAccuracy: true,
    //timeout: 10000,
    maximumAge: 1000,
  };

  return new Promise((resolve, reject) => {
    //Geolocation.requestAuthorization();

    try {
      Geolocation.getCurrentPosition(
        // SOLICITA A LOCALIZAÇÃO ATUAL DO USUARIO, BASEADA NA VARIAVEL OPTIONS ACIMA
        info => {
          resolve({
            timeOfCapture: new Date().getTime(),
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
          });
        },
        error => {
          reject({
            latitude: null,
            longitude: null,
          });
        },
        options,
      );
    } catch (err) {
      console.error(error, ' Erro ao obter localização');
    }
  });
}
