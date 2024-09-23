import './assets/style/index.css';
import { Route, Routes } from 'react-router-dom';
import BookFlight from './pages/BookFlight.jsx';
import FlightHistory from './pages/FlightHistory.jsx';
import Navbar from './components/shared/Navbar.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <>
        <Navbar />
        <Routes>
          <Route path='/' element={<BookFlight />} />
          <Route path='/flight-history' element={<FlightHistory />} />
        </Routes>
        <ToastContainer />
      </>

    </div>
  );
}

export default App;
