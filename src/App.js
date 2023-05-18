import './App.css';
import Sidebar from './components/Sidebar';
import "./assets/styles/Sidebar.scss";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Report from './pages/Report';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className='mainApp'>
        <Header/>
        <Routes>
          <Route path='/' Component={Dashboard}/>
          <Route path='/report' Component={Report} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
