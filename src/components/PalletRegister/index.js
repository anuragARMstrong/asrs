import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Navbar from '../Navbar';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import './index.css';

const initailState = {
  dataList: []
};

const PalletRegister = () => {
  const [progressCount, setProgressCount] = useState(0);
  const [sku, setSku] = useState('');
  const [palletQty, setPalletQty] = useState('');
  const [pkgs, setPkgs] = useState('');
  const [palletSeries, setPalletSeries] = useState('');
  const [cartonList, setCartonList] = useState(initailState);
  const [isValidate, setIsValidate] = useState(false);
  const [isProcess, setIsProcess] = useState(false);

  const cartonGenerator = () => {
    let cartons = [];
    const timeString = `${new Date().getTime()}`;
    for (let i = 0; i < pkgs; i++) {
      const reducedTimestring = timeString.slice(5) + Math.ceil(Math.random() * 10);
      cartons.push(sku + reducedTimestring + i);
    }
    return cartons;
  };

  const palletGenerator = (prevPallet, increment) => {
    return parseInt(prevPallet) + increment + 1;
  };

  const onChangeReset = e => {
    setProgressCount(0);
    setCartonList(initailState);
    setPalletQty('');
    setPalletSeries('');
    setSku('');
    setPkgs('');
    setIsValidate(false);
    setIsProcess(false);
  };

  const fetchApi = async (url, method = 'POST', body = {}, headers = {}) => {
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
  };

  // declare call register pallet API
  const callPalletRegApi = async (baseUrl, palletBarcode, jwtToken) => {
    const palletRegURL = `${baseUrl}/asrs/api/pallet/register/${palletBarcode}`;
    const headers = { Authorization: `Bearer ${jwtToken}` };
    return await fetchApi(palletRegURL, 'POST', {}, headers);
  };

  //call close pallet API
  const callPalletCloseApi = async (baseUrl, palletBarcode, jwtToken, cartonPkgs) => {
    const palletCloseURL = `${baseUrl}/asrs/api/pallet/update/${palletBarcode}`;
    const headers = { Authorization: `Bearer ${jwtToken}` };
    const body = {
      sku: sku,
      qty: pkgs,
      pkgs: cartonPkgs
    };
    return await fetchApi(palletCloseURL, 'POST', body, headers);
  };

  //   const callFun = () => {
  //     setProgressCount(prevState => {
  //       if (progressCount < 100) {
  //         return prevState + progressSetp;
  //       }
  //     });
  //   };

  const validateUserData = () => {
    if (sku && palletQty && pkgs <= 15 && palletSeries) {
      console.log('data validatedd');
      setIsValidate(true);
    } else {
      throw alert('pkgs should be less than 15');
    }
  };

  const validateURL = url => {
    var res = url.match(
      '^(https?:\\/\\/)?' + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + '((\\d{1,3}\\.){3}\\d{1,3}))'
    );
    return res !== null;
  };

  const handleOnSubmit = async e => {
    try {
      e.preventDefault();
      validateUserData();
      setIsProcess(true);
      const customURL = localStorage.getItem('configUrl');
      if (customURL) {
        const isValidUrl = validateURL(customURL);
        if (isValidUrl) {
          const progressSetp = 100 / palletQty;

          //call login api
          const loginURL = `${customURL}/asrs/api/login`;
          const body = { username: 'admin', password: 'admin' };
          const loginResponse = await fetchApi(loginURL, 'POST', body);
          console.log(loginResponse);

          for (let i = 0; i < palletQty; i++) {
            const cartonIds = cartonGenerator();
            const palletId = palletGenerator(palletSeries, i);

            const palletRegResponse = await callPalletRegApi(customURL, palletId, loginResponse.accessToken);
            const palletCloseResponse = await callPalletCloseApi(
              customURL,
              palletId,
              loginResponse.accessToken,
              cartonIds
            );

            if (palletRegResponse && palletCloseResponse) {
              // console.log(palletId);
              setProgressCount(prevState => {
                if (progressCount < 100) {
                  return prevState + progressSetp;
                }
              });
            } else {
              Swal.fire({
                title: 'Error',
                text: 'Something went wrong!',
                icon: 'error',
                confirmButtonText: 'close',
                confirmButtonColor: 'gray'
              });
              onChangeReset();
            }
            setCartonList(prevState => ({
              ...prevState,
              dataList: [
                ...prevState.dataList,
                {
                  palletID: palletId,
                  cartonArray: [cartonIds]
                }
              ]
            }));
          }
          setIsProcess(false);
        } else {
          setIsProcess(false);
          Swal.fire({
            title: 'Error',
            text: 'Please Enter valid URL',
            icon: 'error',
            confirmButtonText: 'close',
            confirmButtonColor: 'green'
          });
          onChangeReset();
        }
      } else {
        setIsProcess(false);
        Swal.fire({
          title: 'Error',
          text: 'Please Go to Set Configuration tab and Enter configuration URL',
          icon: 'error',
          confirmButtonText: 'close',
          confirmButtonColor: 'green'
        });
        onChangeReset();
      }
    } catch (err) {
      if (err.response && err.response.status && err.response.data) {
        const respData = err.response.data;
        const errMsg = respData.error ? 'Login Error : ' + err.response.data.error : 'check console for more details';
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
      onChangeReset();
    }
  };

  return (
    <div className="row bg">
      <Navbar />
      <div className="App center">
        <div className="main-bg-container" style={{ background: '#caf0fc', overflowY: 'auto' }}>
          <div>
            <h1>Pallet Register</h1>
            <form className="row align-items-center mt-3" onSubmit={handleOnSubmit}>
              <div className="col-2 p-3" style={{ marginRight: '38px', marginLeft: '36px' }}>
                <label htmlFor="selectSKUID" className="label-text pb-2">
                  SKU ID
                </label>
                <select className="form-select" id="selectSKUID" value={sku} onChange={e => setSku(e.target.value)}>
                  <option defaultValue>Choose...</option>
                  <option value="FG000100">FG000100</option>
                  <option value="FG000101">FG000101</option>
                  <option value="FG000102">FG000102</option>
                  <option value="FG000103">FG000103</option>
                </select>
              </div>

              <div className="col-3 p-3" style={{ marginLeft: '36px', marginRight: '38px' }}>
                <label className="label-text pb-2" htmlFor="palletQuantity">
                  PALLET QUANTITY
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="palletQuantity"
                  value={palletQty}
                  placeholder="Enter Pallet Quantity"
                  onChange={e => setPalletQty(e.target.value)}
                />
              </div>

              <div className="col-3 p-3" style={{ marginLeft: '36px', marginRight: '38px' }}>
                <label className="label-text pb-2" htmlFor="palletQuantity">
                  PKG QUANTITY
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="palletQuantity"
                  value={pkgs}
                  placeholder="Enter Pkg Quantity"
                  onChange={e => setPkgs(e.target.value)}
                />
              </div>

              <div className="col-3 p-3" style={{ marginLeft: '36px', marginRight: '38px' }}>
                <label className="label-text pb-2" htmlFor="palletSeries">
                  PALLET SERIES
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="palletSeries"
                  value={palletSeries}
                  placeholder="Enter Pallet Series"
                  onChange={e => setPalletSeries(e.target.value)}
                />
              </div>

              <div className="col-4 btn-container">
                <button type="submit" className="btn btn-success mt-4" disabled={isValidate}>
                  Generate
                </button>
                <button type="button" className="btn btn-secondary mt-4" onClick={onChangeReset}>
                  RESET
                </button>
              </div>
            </form>

            <div className="pro-container">
              {isProcess && <p className="caption">processing...</p>}
              <div className="progress mt-2 progress-container">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${progressCount}%`, fontSize: '25px' }}
                  aria-valuenow={progressCount}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >{`${progressCount}%`}</div>
              </div>
            </div>

            {cartonList.dataList.length > 0 && (
              <div className="text-right">
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-xls-button btn btn-info mt-3 download"
                  table="table-to-xls"
                  filename="palletData"
                  sheet="tablexls"
                  buttonText="Download Table"
                />
                <table className="table table-hover table-container table-bordered border-dark  mt-3" id="table-to-xls">
                  <thead className="table-head-container">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Pallet Barcode</th>
                      <th scope="col">Carton ID's</th>
                    </tr>
                  </thead>
                  {cartonList.dataList.map((eachData, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td className="align-middle">{eachData.palletID}</td>
                          <td>{eachData.cartonArray.toLocaleString()}</td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PalletRegister;
