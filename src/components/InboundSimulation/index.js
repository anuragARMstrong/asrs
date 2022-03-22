import React, { useState } from 'react';
import Navbar from '../Navbar';
import './index.css';
import Arrow from '../shared/Arrow';
import Success from '../shared/Success';
import axios from 'axios';
import Swal from 'sweetalert2';
import Operations from '../shared/Operations.js';
import jwt_decode from 'jwt-decode';
import validator from 'validator';

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

    let tokenExpired = false;
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

function InBoundSimulation() {
  const [newPallet, setNewPallet] = useState(false);
  const [closePallet, setClosePallet] = useState(false);
  const [pcOk, setpcOk] = useState(false);
  const [pcDone, setpcDone] = useState(false);
  const [loc, setLoc] = useState(false);
  const [storeIn, setStoreIn] = useState(false);

  const resetAll = () => {
    setNewPallet(false);
    setClosePallet(false);
    setpcOk(false);
    setpcDone(false);
    setLoc(false);
    setStoreIn(false);
    localStorage.removeItem('palletBarcode');
  };

  const registerPallet = async () => {
    try {
      const palletBarcode = prompt('Enter a pallet Id');
      if (!validator.isNumeric(palletBarcode)) {
        return Swal.fire({
          icon: 'warning',
          title: 'Invalid Pallet Id',
          text: 'Pallet id must be numeric!!'
        });
      }
      localStorage.setItem('palletBarcode', palletBarcode);
      const data = await HitTheApi('NEW_PALLET', { palletBarcode });
      setNewPallet(true);
      Swal.fire({
        icon: 'success',
        title: 'Pallet registered!!',
        text: `Pallet ${palletBarcode} registered successfully.`
      });
      return data;
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error occurred',
        text: 'Pallet registration failed!!'
      });
    }
  };

  const completePalletization = async () => {
    try {
      const palletBarcode = localStorage.getItem('palletBarcode');
      if (!eval(palletBarcode)) {
        return Swal.fire({
          icon: 'warning',
          title: 'Pallet Id Missing',
          text: 'First register a new pallet.'
        });
      }

      const cartonPkgs = [];
      const timeString = `${new Date().getTime()}`;
      const sku = 'FG000100';
      const numOfpkgs = 4;

      for (let i = 0; i < numOfpkgs; i++) {
        const reducedTimestring = timeString.slice(5) + Math.ceil(Math.random() * 10);
        // cartonPkgs.push(sku + timeString + i);
        cartonPkgs.push(sku + reducedTimestring + i);
      }

      localStorage.setItem('pkgs', JSON.stringify(cartonPkgs));
      const body = { sku: sku, qty: numOfpkgs, pkgs: cartonPkgs };

      const data = await HitTheApi('CLOSE_PALLET', { palletBarcode }, body);
      setClosePallet(true);
      Swal.fire({
        icon: 'success',
        title: 'Palletization complete!!',
        text: `Pallet ${palletBarcode} moved to Profile check.`
      });
      return data;
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error occurred',
        text: 'Pallet registration failed!!'
      });
    }
  };

  const profileCheck = async () => {
    try {
      const palletBarcode = localStorage.getItem('palletBarcode');
      if (!eval(palletBarcode)) {
        return Swal.fire({
          icon: 'warning',
          title: 'Pallet Id Missing',
          text: 'First register a new pallet.'
        });
      }
      const data = await HitTheApi('PROFILE_CHECK', { palletBarcode });
      setpcOk(true);
      Swal.fire({
        icon: 'success',
        title: 'Profile checked!!',
        text: `Pallet ${palletBarcode} Profile checked.`
      });
      return data;
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error occurred',
        text: 'Pallet registration failed!!'
      });
    }
  };

  const profileDone = async () => {
    try {
      const palletBarcode = localStorage.getItem('palletBarcode');
      if (!eval(palletBarcode)) {
        return Swal.fire({
          icon: 'warning',
          title: 'Pallet Id Missing',
          text: 'First register a new pallet.'
        });
      }
      const data = await HitTheApi('PROFILE_DONE', { palletBarcode });
      setpcDone(true);
      Swal.fire({
        icon: 'success',
        title: 'PC success!!',
        text: `Pallet ${palletBarcode} Profile checked successfully.`
      });
      return data;
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error occurred',
        text: 'Pallet registration failed!!'
      });
    }
  };

  const getLocation = async () => {
    try {
      const palletBarcode = localStorage.getItem('palletBarcode');
      if (!eval(palletBarcode)) {
        return Swal.fire({
          icon: 'warning',
          title: 'Pallet Id Missing',
          text: 'First register a new pallet.'
        });
      }
      const data = await HitTheApi('GET_LOCATION', { palletBarcode });
      setLoc(true);
      console.log(data);
      localStorage.setItem('locationId', data[0].locationid);
      Swal.fire({
        icon: 'success',
        title: 'Location Fetched!!',
        text: `Pallet ${palletBarcode} assigned to location: ${data[0].locationid} `
      });
      return data;
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error occurred',
        text: 'Location fetching failed!!'
      });
    }
  };

  const ackStoreIn = async () => {
    try {
      const palletBarcode = localStorage.getItem('palletBarcode');
      const locationId = localStorage.getItem('locationId');
      if (!eval(palletBarcode)) {
        return Swal.fire({
          icon: 'warning',
          title: 'Pallet Id Missing',
          text: 'First register a new pallet.'
        });
      }
      if (!locationId || !locationId.includes('-')) {
        return Swal.fire({
          icon: 'warning',
          title: 'Invalid location Id',
          text: 'Unable to confirm store In.'
        });
      }
      const data = await HitTheApi('CONFIRM_STORE_IN', { palletBarcode, locationId });
      setStoreIn(true);
      Swal.fire({
        icon: 'success',
        title: 'Stored Successfully!!',
        text: `Pallet ${palletBarcode} stored successfully at ${locationId}.`
      });
      return data;
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error occurred',
        text: 'Pallet registration failed!!'
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="background">
        <center>
          <h2>ASRS Simulation</h2>
        </center>
        <div className="card m-4">
          <div className="col-xs-12">
            <div>
              <button className="btn btn-danger" onClick={() => registerPallet()}>
                New Pallet
              </button>
              <button
                className="btn btn-secondary"
                style={{ float: 'right', margin: '5px' }}
                onClick={() => loginNow()}
              >
                Login Now
              </button>
              {newPallet ? <Success /> : ''}
            </div>
            <Arrow />
            <div>
              <button className="btn btn-success" onClick={() => completePalletization()}>
                Close Pallet
              </button>
              {closePallet ? <Success /> : ''}
            </div>
            <Arrow />
            <div>
              <button className="btn btn-info" onClick={() => profileCheck()}>
                PC OK
              </button>
              {pcOk ? <Success /> : ''}
            </div>
            <Arrow />
            <div>
              <button className="btn btn-success" onClick={() => profileDone()}>
                PC Done
              </button>
              {pcDone ? <Success /> : ''}
            </div>
            <Arrow />
            <div>
              <button className="btn btn-warning" onClick={() => getLocation()}>
                Get Location
              </button>
              {loc ? <Success /> : ''}
            </div>
            <Arrow />
            <div>
              <button className="btn btn-success" onClick={() => ackStoreIn(true)}>
                Confirm Store In
              </button>
              {storeIn ? <Success /> : ''}
              <button
                className="btn btn-secondary"
                style={{ float: 'right', margin: '5px' }}
                onClick={() => resetAll()}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InBoundSimulation;
