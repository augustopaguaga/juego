import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Juego1 from './components/juego1';




function App() {
  return (
    <div className="App">
     
       <BrowserRouter>
              <Routes>
                <Route path="/" element={<Juego1 />} />
              </Routes>
        </BrowserRouter>

    </div>
  
  );
}

export default App;
