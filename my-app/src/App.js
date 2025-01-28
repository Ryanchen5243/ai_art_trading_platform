import logo from './logo.svg';
import './App.css';
import LandingPage from './pages/LandingPage/LandingPage.js'
import TradingPage from './pages/TradingPage/TradingPage.js'
// import 'materialize-css/dist/css/materialize.min.css';
// import 'materialize-css/dist/js/materialize.min.js';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/trade" element={<TradingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
