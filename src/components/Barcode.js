import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";

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
    <div
      className="col"
      style={{
        background: "white",
        width: "auto",
        padding: "50px",
        borderRadius: "5px",
      }}
    >
      {console.log("from submit---->", cartons)}
      <h1>Barcode Generator</h1>
      <form
        id="storeInForm"
        className="row row-cols-lg-auto g-3 align-items-center mt-3"
        onSubmit={(e) => onSubmit(e)}
      >
        <div className="">
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
              Store Now
            </button>
          </div>
        </div>
      </form>
      <hr />
      {cartons.length > 0 ? (
        cartons.map((carton) => {
          return (
            <div>
              <span className="pe-4">{carton} </span>
              <QRCode value={carton} size={150} />
              <hr />
            </div>
          );
        })
      ) : (
        <p>loading..</p>
      )}
    </div>
  );
};

export default Barcode;
