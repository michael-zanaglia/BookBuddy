import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Books from './Books.jsx';
import Favoris from './Favoris.jsx';
import './styles/style.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route index path='/add' element={<App />}/>
        <Route path='/books' element={<Books />}/>
        <Route path='/favoris' element={<Favoris />}/>
      </Routes>
      
    </Router>
    
  </React.StrictMode>,
)
