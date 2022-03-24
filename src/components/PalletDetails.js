import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { loginNow, HitTheApi } from './InboundSimulation/helper';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';

export default function PalletDetails() {
  const [disabled, setDisabled] = useState(true);
  const [palletId, setPalletId] = useState(null);
  const [pkgs, setPkgs] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    // setDisabled(true);
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
      console.log('tokenExpired, trying logging in--->');
      await loginNow(false);
    }

    const newToken = localStorage.getItem('ASRS_API_KEY');
    if (!newToken) {
      return Swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: 'Something went wrong!!'
      });
    }

    const result = await HitTheApi('GET_PALLET_DETAILS', { palletBarcode: palletId });
    setPkgs(result);
    // console.log(result);
  };

  const resetAll = () => {
    setPkgs([]);
    setPalletId(null);
  };

  return (
    <div>
      <Navbar />
      <div className="background">
        <center>
          <h2>Pallet Details</h2>
        </center>
        <div className="card m-4">
          <div className="row">
            <div className="col-sm-6">
              <form className="form-inline p-4" onSubmit={e => handleSubmit(e)}>
                <div className="form-group">
                  <label className="mb-2">
                    <b>Enter pallet Id</b>
                  </label>
                  <input
                    type="number"
                    onInput={e => {
                      setPalletId(e.target.value);
                      setDisabled(false);
                    }}
                    className="form-control mb-2"
                    placeholder="Pallet ID"
                    required
                  />
                  <button type="submit" className={`btn btn-outline-success ${disabled ? 'disabled' : ''}`}>
                    Find Details
                  </button>
                </div>
              </form>
            </div>
            <div className="col-sm-6">
              <span>
                <b>Cartons: </b>
                {pkgs.length}
              </span>
              <button
                className="btn btn-secondary"
                style={{ float: 'right', margin: '5px' }}
                onClick={() => resetAll()}
              >
                Reset
              </button>
              <ul style={{ listStyleType: 'none' }}>
                {pkgs &&
                  pkgs.map((el, ind) => {
                    return (
                      <li key={ind} className="pt-4">
                        {/* {el} */}
                        {/* <QRCode value={el} size={100} className="cartonQrcode" /> */}
                        <Barcode value={el} />
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
