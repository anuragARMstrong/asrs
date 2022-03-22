import Operations from '../shared/Operations.js';
import Swal from 'sweetalert2';
import axios from 'axios';

const loginNow = async () => {
  try {
    const config = {
      url: process.env.REACT_APP_API_URL + Operations['LOGIN'].url,
      method: Operations['LOGIN'].method,
      data: Operations['LOGIN'].body
    };
    const { data: loginData } = await axios(config);
    localStorage.setItem('ASRS_API_KEY', loginData.accessToken);
    Swal.fire({
      icon: 'success',
      title: 'Login successful!!',
      text: 'Please continue..'
    });
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

const exports = {
  loginNow
};

export default exports;
