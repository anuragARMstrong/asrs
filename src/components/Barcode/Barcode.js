import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

import Navbar from '../Navbar';
import './Barcode.css';

const Barcode = () => {
  const [numOfpkgs, setNumOfpkgs] = useState('');
  const [sku, setSku] = useState('Choose a SKU');
  const [pallet, setPallet] = useState('');
  const [quantity, setQuantity] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    // console.log([sku])
    const timeString = `${new Date().getTime()}`;

    // pm.environment.set("numOfpkgs", numOfpkgs);

    const numOfpkgs = [quantity];
    const cartonPkgs = [];
    for (let i = 0; i < numOfpkgs; i++) {
      const reducedTimestring = timeString.slice(5) + Math.ceil(Math.random() * 10);
      // cartonPkgs.push(sku + timeString + i);
      cartonPkgs.push(sku + reducedTimestring + i);
    }
    console.log(cartonPkgs);

    setNumOfpkgs([...cartonPkgs]);
    //  e.target[0].value = ""
  };

  const resetInputField = e => {
    setNumOfpkgs('');
    setPallet('');
    setQuantity('');
  };

  return (
    <div className="row bg">
      <Navbar />
      <div className="App center">
        <div className="main-bg-container" style={{ background: '#caf0fc', overflowY: 'auto' }}>
          <div style={{ position: 'fixed' }}>
            <h1 className="barcode-heading">Pallet Generator</h1>
            <form className="row align-items-center mt-3" onSubmit={onSubmit}>
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

              <div className="col-2 p-3" style={{ marginLeft: '36px', marginRight: '38px' }}>
                <label className="label-text pb-2" htmlFor="palletId">
                  PALLET ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="palletId"
                  value={pallet}
                  placeholder="Enter Pallet ID"
                  onChange={e => setPallet(e.target.value)}
                />
              </div>

              <div className="col-2 p-3" style={{ marginLeft: '36px', marginRight: '38px' }}>
                <label className="label-text pb-2" htmlFor="pkgQuantity">
                  PKG QUANTITY
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="pkgQuantity"
                  value={quantity}
                  placeholder="Enter Pkg Quantity on each Pallet"
                  onChange={e => setQuantity(e.target.value)}
                />
              </div>
              <div className="col-4 btn-container">
                <button type="submit" className="btn btn-success mt-4">
                  Generate
                </button>
                <button type="button" className="btn btn-secondary mt-4" onClick={resetInputField}>
                  RESET
                </button>
              </div>
            </form>
          </div>
          <div className="row result-container">
            <div className="pallet-qr-container">
              <table className="table table-borderless align-middle">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">QR code</th>
                    <th scope="col">Pallet ID</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>{<QRCode className="qrcode" value={pallet} size={100} />}</td>
                    <td className="palletID-value">{pallet}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="pkg-container">
              {numOfpkgs.length > 0 ? (
                numOfpkgs.map(cartonPkgs => {
                  return (
                    <div className="barcode">
                      <span className=" pe-4 barcode_space">{cartonPkgs} </span>
                      <QRCode value={cartonPkgs} size={100} />
                    </div>
                  );
                })
              ) : (
                <>
                  <p className="load"></p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Barcode;
