import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

var hamburger = document.querySelector('.hamburger');
    var navLinks = document.querySelector('.navlinks');
    hamburger.addEventListener('click',()=>{
        navLinks.classList.toggle("open");
})