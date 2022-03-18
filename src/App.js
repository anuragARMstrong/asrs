import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from '../src/components/Home';
import Barcode from './components/Barcode';
import SetConfiguration from './components/SetConfiguration';
import InBoundSimulation from './components/InboundSimulation';
import PalletRegister from './components/PalletRegister';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/barcode" element={<Barcode />} />
        <Route path="/InboundSimulation" element={<InBoundSimulation />} />
        <Route path="/pallet-register" element={<PalletRegister />} />
        <Route path="/set-configuration" element={<SetConfiguration />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
