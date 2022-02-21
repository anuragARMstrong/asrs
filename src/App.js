import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from '../src/components/Home'
import Barcode from "./components/Barcode/Barcode";

const App = ()=>{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/barcode" element ={<Barcode />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App