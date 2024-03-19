import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Homepage from './pages/HomePage';
import Loginpage from './pages/LoginPage';
import YourCapeerPage from './pages/YourCapeerPage';
import { MenuProvider } from './context/MenuContext';
import { UserProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MenuProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path='/homepage' element={<Homepage/>} />
            <Route path='/login' element={<Loginpage/>} />
            <Route path='/yourcapeer' element={<YourCapeerPage/>} />
          </Routes>
        </Router>
      </UserProvider>
    </MenuProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
