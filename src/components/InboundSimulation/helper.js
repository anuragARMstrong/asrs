import Operations from '../shared/Operations.js';
import Swal from 'sweetalert2';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const loginNow = async (showMsg = true) => {
  try {
    const config = {
      url: process.env.REACT_APP_API_URL + Operations['LOGIN'].url,
      method: Operations['LOGIN'].method,
      data: Operations['LOGIN'].body
    };
    const { data: loginData } = await axios(config);
    localStorage.setItem('ASRS_API_KEY', loginData.accessToken);
    if (showMsg) {
      Swal.fire({
        icon: 'success',
        title: 'Login successful!!',
        text: 'Please continue..'
      });
    }
    return loginData;
  } catch (err) {
    console.log(err);
    Swal.fire({
      icon: 'error',
      title: 'Login Error',
      text: 'Something went wrong!!'
    });
  }
};

const HitTheApi = async (operation, param, body = null) => {
  try {
    const ops = Operations[operation];
    const endpoint = ops.url;
    let url = process.env.REACT_APP_API_URL + endpoint;
    url = param && param.palletBarcode ? url.replace('{{palletBarcode}}', param.palletBarcode) : url;
    url = param && param.locationId ? url.replace('{{location_id}}', param.locationId) : url;
    const token = localStorage.getItem('ASRS_API_KEY');

    let decoded = null;
    if (token && token.length > 20) {
      decoded = jwt_decode(token);
    }

    let tokenExpired = true;
    if (decoded) {
      tokenExpired = new Date() > new Date(decoded.exp * 1000);
    }

    if (!token || !decoded || tokenExpired) {
      return Swal.fire({
        icon: 'warning',
        title: 'Login Now',
        text: 'Please login to continue.'
      });
    }
    const config = { url, method: ops.method, headers: { Authorization: `Bearer ${token}` } };
    if (body) {
      config.data = { ...body };
    }
    console.log('---API HITTING ---->', config);
    const { data: result } = await axios(config);
    console.log('---API HIT SUCCESSFULLY ---->', result);
    return result;
  } catch (err) {
    console.log(err);
    Swal.fire({
      icon: 'error',
      title: 'Error occurred',
      text: 'Something went wrong!!'
    });
  }
};

export { loginNow, HitTheApi };
