import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import Navbar from "../Navbar";
import './Barcode.css'

const Barcode = () => {
  const [cartons, setCartons] = useState([]);
  useEffect(() => {
    // action on update of movies
  }, [cartons]);
  const onSubmit = (e) => {
    e.preventDefault();
    const cartonIds = e.target[0].value;
    const cartonArr = cartonIds.split(",");
    setCartons([...cartonArr]);
  };
  return (
    <div className="row bg">
    <Navbar />
    <div className="App center">
    <div
      className="col"
      style={{
        
        marginLeft:'260px',
        background: "white",
        width: "83vw",
        minHeight:"100vh",
        position:"center",
        padding: "50px",
        marginBottom:'5px',
        borderRadius: "5px",
        overflowY:'auto'
      }}
    >
      {/* {console.log("from submit---->", cartons)} */}
      <h1 className="heading ">Barcode Generator</h1>
      <form
        id="storeInForm"
        className="row row-cols-lg-auto g-3 align-items-center mt-3"
        onSubmit={(e) => onSubmit(e)}
      >
        <div className="para">
          <p>Enter the Carton Ids (comma-separated): </p>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="palletInput"
              placeholder="Enter carton Ids"
              required
            />
            <button type="submit" className="btn btn-success">
              Generate
            </button>
          </div>
        </div>
      </form>
      
      {cartons.length > 0 ? (
        cartons.map((carton) => {
          return (
            
            <div className="barcode">
              <span className=" pe-4">{carton} </span>
              <QRCode value={carton} size={100} />
              <hr />
            </div>
            
          );
          
        })
      ) : (
        <p className="load">loading..</p>
      )}
    </div>
    
    </div>
    </div>
  );
  
};

export default Barcode;
