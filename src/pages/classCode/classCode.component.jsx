import React, { Component } from 'react';
import './classCode.style.scss';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Forminput from '../../components/forminput/forminput.component';
import CustomButton from '../../components/custombutton/custombutton.component';
import { setClassCode } from '../../firebase/firebase.utils';
import {ReactComponent as GoogleClassroom } from '../../assets/gClassroom.svg';
import { ReactComponent as Google} from '../../assets/google.svg';
import THeader from '../../components/tHeader/tHeader.component';

class ClassCode extends Component{
    constructor(props){
        super(props)
        this.state={
            classCode:''
        }
    }
    componentDidMount(){
        var hamburger = document.querySelector('.hamburger');
        var navLinks = document.querySelector('.navlinks');


        hamburger.addEventListener('click',()=>{
                navLinks.classList.toggle("open");
        })

        navLinks.addEventListener('click',()=>{
        navLinks.classList.toggle("open")});
    }
    handleChange = event => {
        const { value, name } = event.target
        this.setState({ [name]: value })
    }
    render(){
        return(
            <div className='c-c'>
                <div className="headerp">
                <THeader/>
                </div>
                <div className='logos'>
                    <GoogleClassroom id='gc'/>
                    <Google id='g'/>
                </div>
                <span>Enter the class code of your class</span>
                <Forminput label='Class Code:'  value={this.state.classCode} name='classCode'
                onChange={this.handleChange}></Forminput>
                <CustomButton onClick={()=>{
                    setClassCode(this.props.currentUser.Class,this.state.classCode)
                    this.props.history.push('/teacherHomepage')
                }}>Update</CustomButton>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

export default withRouter(connect(mapStateToProps)(ClassCode));