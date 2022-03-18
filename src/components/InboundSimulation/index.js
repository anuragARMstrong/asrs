import React, { useEffect, useState } from 'react';
import { Stepper } from 'react-form-stepper';
import QRCode from 'react-qr-code';
import Navbar from '../Navbar';
import './index.css';

function InBoundSimulation() {
  const [step, setStep] = useState(0);

  const [sku, setSku] = useState('FG000100');
  const [pallet, setpallet] = useState('');
  const [quantity, setQuantity] = useState('');
  const [cartons, setcartons] = useState([]);

  const stepList = [
    { label: 'Palletisation' },
    { label: 'Palletisation Done' },
    { label: 'PC' },
    { label: 'PC Done' },
    { label: 'Pallet Location' },
    { label: 'Exact Location' },
    { label: 'Store-in' },
    { label: 'Store-in Done' },
    { label: 'Success' }
  ];

  const onSubmit = e => {
    setpallet(Math.ceil(Math.random() * 1000));
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
    console.log(pallet);
    setcartons(cartonPkgs);
    //  e.target[0].value = ""
  };

  const resetInputField = e => {
    setcartons('');
    setpallet('');
    setQuantity('');
  };

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      if (step < stepList.length) {
        setStep(step + 1);
        // console.log(step)
      } else {
        clearTimeout(timeoutId);
      }
    }, 2000);
  });

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (items) {
      setItems(items);
    }
  }, [items]);

  return (
    <div>
      <Navbar />
      <div className="page">
        <div className="background">
          <h2 className="inbound_heading">InBound Simulation</h2>
          <div className="container_1">
            <label className="q_space"> Quantity :</label>
            <input
              value={quantity}
              onInput={e => setQuantity(e.target.value)}
              type="value"
              className="wide gap"
              id="palletInput"
              required
            />
            <button className="btn btn-success start" onClick={onSubmit}>
              Start
            </button>
            <button className="btn btn-success reset" onClick={resetInputField}>
              Reset
            </button>
            <Stepper className="step_col" steps={stepList} activeStep={step} />

            <div className="container_2">
              <h4 className="pallet">Pallet ID</h4>
              <p className="pallet_id">{pallet}</p>
              {cartons.length > 0 && <QRCode className="qrcodes" value={pallet} size={100} />}
              <h4 className="barcode">Barcode</h4>
            </div>
            <div className="container_3">
              <h4 className="cartons">Carton ID's</h4>
              <h4 className="barcodes">Barcodes</h4>

              {cartons.length > 0 ? (
                cartons.map(cartonPkgs => {
                  return (
                    <div className="barcodes">
                      <span className="pe-4 barcode_spaces">{cartonPkgs} </span>
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
}

export default InBoundSimulation;
