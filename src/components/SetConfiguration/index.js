import { useState } from 'react';
import Navbar from '../Navbar';
import './index.css';

const SetConfiguration = () => {
  const [configUrl, setConfigUrl] = useState('');
  const submitConfigUrl = e => {
    e.preventDefault();
    // console.log(configUrl);
    localStorage.setItem('configUrl', configUrl);
    alert('Your Configuration URL is Saved');
  };
  const onResetButton = e => {
    setConfigUrl('');
    localStorage.clear();
  };
  return (
    <div className="row bg">
      <Navbar />
      <div className="App center">
        <div className="main-bg-container" style={{ background: '#caf0fc', overflowY: 'auto' }}>
          <h1>Set Configuration</h1>
          <form className="align-items-center mt-3" onSubmit={submitConfigUrl}>
            <div className="p-3" style={{ marginLeft: '36px', marginRight: '38px' }}>
              <label className="config-label-text" htmlFor="configInput">
                Enter API URL:
              </label>
              <input
                type="text"
                className="form-control"
                id="configInput"
                value={configUrl}
                placeholder="Please Enter Configuration URL"
                onChange={e => setConfigUrl(e.target.value)}
              />
            </div>

            <div className="btn-container">
              <button type="submit" className="btn btn-success mt-4">
                GO
              </button>
              <button type="button" className="btn btn-secondary mt-4" onClick={onResetButton}>
                RESET
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetConfiguration;
