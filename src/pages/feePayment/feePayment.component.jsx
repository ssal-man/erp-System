import React, { Component } from 'react';
import './feePayment.style.scss';
import PHeader from '../../components/pHeader/pHeader.component';

class feePayment extends Component{

    componentDidMount = async () =>{
        var hamburger = document.querySelector('.hamburger');
        var navLinks = document.querySelector('.navlinks');


        hamburger.addEventListener('click',()=>{
                navLinks.classList.toggle("open");
        })

        navLinks.addEventListener('click',()=>{
        navLinks.classList.toggle("open")});
     }

    render(){
    return(
    <div className='fpp'>
        <div className="headerp">
                     <PHeader/>
                </div>
       <div id="wrapper">
  <div className="row">
    <div className="col-xs-5">
      <div id="cards">
        <img src="http://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/Visa-icon.png" alt=""/>
        <img src="http://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/Master-Card-icon.png" alt=""/>
      </div>
      <div className="form-check">
  <label className="form-check-label" htmlFor='card'>
    <input id="card" className="form-check-input" type="checkbox" value=""/>
    Pay $150.00 with credit card
  </label>
</div>
    </div>
    <div className="col-xs-5">
      <div id="cards">
        <img src="http://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/Paypal-icon.png" alt=""/>
      </div>
      <div className="form-check">
  <label className="form-check-label" htmlFor='paypal'>
    <input id="paypal" className="form-check-input" type="checkbox" value=""/>
    Pay $150.00 with PayPal
  </label>
</div>
    </div>
  </div>
  <div className="row">
    <div className="col-xs-5">
      <i className="fa fa fa-user"></i>
      <label htmlFor="cardholder">Cardholder's Name</label>
      <input type="text" id="cardholder"/>
    </div>
    <div className="col-xs-5">
      <i className="fa fa-credit-card-alt"></i>
      <label htmlFor="cardnumber">Card Number</label>
      <input type="text" id="cardnumber"/>
    </div>
  </div>
  <div className="row row-three">
    <div className="col-xs-2">
      <i className="fa fa-calendar"></i>
      <label htmlFor="date">Valid thru</label>
      <input type="text" placeholder="MM/YY" id="date"/>
    </div>
    <div className="col-xs-2">
      <i className="fa fa-lock"></i>
      <label htmlFor="date">CVV / CVC *</label>
      <input type="text"/>
    </div>
    <div className="col-xs-5">
      <span className="small">* CVV or CVC is the card security code, unique three digits number on the back of your card seperate from its number.</span>
    </div>
  </div>
  <footer>
    <button className="btn">Back</button>
    <button className="btn">Next Step</button>
  </footer>
</div>

    </div>
    )
    }
}

export default feePayment;