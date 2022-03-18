import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

import Navbar from '../Navbar';
import './index.css';

const Barcode = () => {
  const [numOfpkgs, setNumOfpkgs] = useState('');
  const [sku, setSku] = useState('Choose a SKU');
  const [pallet, setpallet] = useState('');
  const [quantity, setQuantity] = useState('');

  function handleAddrTypeChange(e) {
    setSku(e.target.value);
    // console.log(e.target.value)
  }

  useEffect(
    () => {
      // action on update of movies
    },
    [numOfpkgs],
    [sku]
  );

  const onSubmit = e => {
    e.preventDefault();
    console.log([sku]);
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
    setpallet('');
    setQuantity('');
  };

  return (
    <div className="row bg">
      <Navbar />
      <div className="app_center">
        <div className="col">
          {/* {console.log("from submit---->", cartons)} */}
          <div className="">
            <h1 className="h_container">Pallet Generator</h1>
          </div>

          <form
            id="storeInForm"
            className="row row-cols-lg-auto g-3 align-items-center mt-3"
            onSubmit={e => onSubmit(e)}
          >
            <div className="para_container">
              {/* <p>Enter the Carton Ids (comma-separated): </p> */}
              <div className="input-group">
                {/* <input
              type="text"
              className="form-control"
              id="palletInput"
              placeholder="Enter carton Ids"
              required
            /> */}

                <label className="space"> SKU ID :</label>
                <select name="sku" onChange={e => handleAddrTypeChange(e)}>
                  <option value="Choose a SKU">Choose a SKU</option>
                  <option value="FG000100">FG000100</option>
                  <option value="FG000101">FG000101</option>
                  <option value="FG000102">FG000102</option>
                  <option value="FG000103">FG000103</option>
                </select>
                <label className="space l_space"> Pallet ID :</label>
                <input
                  value={pallet}
                  onInput={e => setpallet(e.target.value)}
                  type="value"
                  className="gap l_space"
                  id="palletInput"
                  required
                />

                <label className="space"> Quantity :</label>
                <input
                  value={quantity}
                  onInput={e => setQuantity(e.target.value)}
                  type="value"
                  className="gap"
                  id="palletInput"
                  required
                />

                <button type="submit" className="btn btn-success spaces" onChange={onSubmit}>
                  Generate
                </button>
                <button type="button" className="btn  btn-warning spaces ml-3" onClick={resetInputField}>
                  Reset
                </button>
              </div>
              <div className="box_scroll">
                <table className="table table_space">
                  <thead>
                    <tr>
                      <th scope="col">Carton ID's</th>
                      <th scope="col">Barcode's</th>
                      <th scope="col">Pallet Barcode</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </form>
          <div className="pkg">
            {numOfpkgs.length > 0 ? (
              numOfpkgs.map(cartonPkgs => {
                return (
                  <div className="Barcode">
                    <span className="barcode_space mt-5">{cartonPkgs} </span>
                    <QRCode value={cartonPkgs} size={100} className="cartonQrcode" />
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
      {numOfpkgs.length > 0 && <QRCode className="qrcode" value={pallet} size={100} />}
    </div>
  );
};

export default Barcode;
