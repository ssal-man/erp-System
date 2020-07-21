import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

document.getElementById('root')
);


var hamburger = document.querySelector('.hamburger');
var navLinks = document.querySelector('.navlinks');


hamburger.addEventListener('click',()=>{
        navLinks.classList.toggle("open");
})

navLinks.addEventListener('click',()=>{
  navLinks.classList.toggle("open")});