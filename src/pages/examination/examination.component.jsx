import React, { Component } from 'react';
import './examination.style.scss';
import {ReactComponent as GoogleClassroom } from '../../assets/gClassroom.svg';
import { ReactComponent as Google} from '../../assets/google.svg';
import PHeader from '../../components/pHeader/pHeader.component';
import { connect } from 'react-redux';
import CustomButton from '../../components/custombutton/custombutton.component';
import { getClassCode } from '../../firebase/firebase.utils';

class Examination extends Component{
    constructor(props){
        super(props);
        this.state={
            classCode:''
        }
    }
    componentDidMount= async ()=>{
        this.setState({classCode: await getClassCode(this.props.currentUser.Class)})
            var hamburger = document.querySelector('.hamburger');
            var navLinks = document.querySelector('.navlinks');
    
    
            hamburger.addEventListener('click',()=>{
                    navLinks.classList.toggle("open");
            })
    
            navLinks.addEventListener('click',()=>{
            navLinks.classList.toggle("open")});
    }
    render(){
        console.log(this.state)
        return(
            <div className='exm'>
                <div className="headerp">   
                    <PHeader/>    
                </div>
                <div className='logos'>
                    <GoogleClassroom id='gc'/>
                    <Google id='g'/>
                </div>
                <span className='class-code'>{`Your Class Code is : ${this.state.classCode}`}</span>
                <span>*Click the button below to enter the classroom</span>
                <span>*Click on the + which is on the top right corner of the screen and then enter the mentioned class code to join</span>
                <CustomButton
                    onClick={()=>{window.open('https://classroom.google.com/')}}
                >Google Classroom</CustomButton>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

export default connect(mapStateToProps)(Examination);