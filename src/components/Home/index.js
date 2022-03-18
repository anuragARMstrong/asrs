import axios from 'axios';
import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { BallTriangle } from 'react-loader-spinner';
import './index.css';
import Navbar from '../Navbar';
// import Barcode from "./components/Barcode/Barcode";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      palletId: null,
      success: false,
      loader: false
    };
  }

  validateURL = url => {
    var res = url.match(
      '^(https?:\\/\\/)?' + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + '((\\d{1,3}\\.){3}\\d{1,3}))'
    );
    return res !== null;
  };

  handleForm = async e => {
    try {
      e.preventDefault();
      const customConfigUrl = localStorage.getItem('configUrl');
      if (customConfigUrl) {
        const isValidUrl = this.validateURL(customConfigUrl);
        if (isValidUrl) {
          this.setState({ loader: true });
          // call the login api
          const url = `${customConfigUrl}/asrs/api/login`;
          const body = { username: 'admin', password: 'admin' };
          const login = await this.callTheApi(url, 'POST', body);

          // call the get location api
          const getLocationURL = `${customConfigUrl}/asrs/api/storein/${this.state.palletId}`;
          const headers = { Authorization: `Bearer ${login.accessToken}` };
          const locationData = await this.callTheApi(getLocationURL, 'GET', {}, headers);

          // call the storeIn ack api
          const ackLocationURL = `${customConfigUrl}/${this.state.palletId}?location=${locationData[0].locationid}`;
          const ackData = await this.callTheApi(ackLocationURL, 'PATCH', {}, headers);

          if (ackData) {
            this.setState({ success: true, loader: false });
            Swal.fire({
              title: 'Success',
              text: 'Storage successful!!',
              icon: 'success',
              confirmButtonText: 'close',
              confirmButtonColor: 'gray'
            });
          } else {
            this.setState({ loader: false });
            Swal.fire({
              title: 'Pending',
              text: 'Got some issue!!',
              icon: 'warning',
              confirmButtonText: 'close',
              confirmButtonColor: 'gray'
            });
          }
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Please Enter valid URL',
            icon: 'error',
            confirmButtonText: 'close',
            confirmButtonColor: 'green'
          });
        }
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Please Go to Set Configuration tab and Enter configuration URL',
          icon: 'error',
          confirmButtonText: 'close',
          confirmButtonColor: 'green'
        });
      }
    } catch (err) {
      // console.log(err.response.data);
      if (err.response && err.response.status && err.response.data) {
        const respData = err.response.data;
        const errMsg = respData.error ? 'Login Error : ' + err.response.data.error : 'check console for more details';

        this.setState({ loader: false });
        Swal.fire({
          title: 'Error',
          text: errMsg,
          icon: 'error',
          confirmButtonText: 'close',
          confirmButtonColor: 'gray'
        });
        return false;
      }
      alert('Some Error occured');
    }
  };

  async callTheApi(url, method = 'POST', body = {}, headers = {}) {
    try {
      const options = {
        method,
        url,
        headers,
        data: body
      };
      const { data } = await axios(options);
      return data;
    } catch (err) {
      throw err;
    }
  }
  render() {
    return (
      <div className="row bg">
        <Navbar />
        <div className="App center">
          <div className="main-bg-container" style={{ background: '#caf0fc' }}>
            <h1 className="home-heading">Store In : Acknowledge</h1>
            {this.state.loader ? (
              <div className="center processed">
                <h5>Pallet {this.state.palletId} is being processed...</h5>
                <BallTriangle heigth="100" width="100" color="orange" ariaLabel="loading" />
              </div>
            ) : (
              <form
                id="storeInForm"
                className="row row-cols-lg-auto g-3 align-items-center mt-3"
                onSubmit={e => this.handleForm(e)}
              >
                <div className="home-label-para">
                  <p>Please Enter PalletID to store In: </p>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="palletInput"
                      placeholder="Enter pallet Id"
                      onChange={e => this.setState({ palletId: e.target.value })}
                      required
                    />
                    <button type="submit" className="btn btn-success">
                      Store Now
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
