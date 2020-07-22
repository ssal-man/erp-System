import React, { Component } from 'react';
import './sprofile.style.scss';
import { connect } from 'react-redux';
import firebase from 'firebase';
import PHeader from '../pHeader/pHeader.component';


class sprofile extends Component{

    constructor(prop){
        super(prop);
        this.state={
            url:''
        }
    }
    componentDidMount = async() =>{
        const {currentUser} = this.props
        var storage = firebase.storage();
        var pathReference = storage.ref(currentUser.photo);
        var imageUrl = await pathReference.getDownloadURL()
        this.setState({url:imageUrl})
        var hamburger = document.querySelector('.hamburger');
        var navLinks = document.querySelector('.navlinks');


        hamburger.addEventListener('click',()=>{
                navLinks.classList.toggle("open");
        })

        navLinks.addEventListener('click',()=>{
        navLinks.classList.toggle("open")});
    }
   
    render(){
        const {currentUser} = this.props
    return(
        <div className='p-page'>
         <div className="headerp">   
        <PHeader/>    
        </div>
        <div className='s-profile'>
            <div className='pic'>
                <img src={`${this.state.url}`} alt='profile pic'/>
            </div>
            <div className='details'>
                <span>Name:{currentUser.displayName}</span>
                <span>Class:{currentUser.Class}</span>
                <span>Admission Number:{currentUser.admissionNo}</span>
                <span>Parent's Name:{currentUser.parentName}</span>
                <span>Email:{currentUser.parentEmail}</span>
                <span>Phone Number:{currentUser.parentPhNo}</span>
            </div>
        </div>
        </div>
    )
    }
}
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

export default connect(mapStateToProps)(sprofile);

