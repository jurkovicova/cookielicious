import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./Menu";
import "./style.css";
import "./App.css";
import Home from "./Home";
import OrderSummary from "./OrderSummary";



function App() {
  return (
    
    <div className="App spacer bg">
       
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>  
          <Route path="/order" element={<Menu/>}/>     
          <Route path="/success" element={<OrderSummary/>}/> 
        </Routes>
      </BrowserRouter>
    
      </div>
  );
}

export default App;
