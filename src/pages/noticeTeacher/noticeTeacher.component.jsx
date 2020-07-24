import React, { Component } from 'react';
import './noticeTeacher.style.scss';
import CustomButton from '../../components/custombutton/custombutton.component';
import THeader from '../../components/tHeader/tHeader.component';

class NoticeTeacher extends Component{
        componentDidMount(){
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
                <div className="n-options">
                    <div className="headerp">
                     <THeader/>
                </div>
                    <CustomButton onClick={()=>{this.props.history.push('/checkNotice')}}>Check Notices</CustomButton>
                    <CustomButton onClick={()=>{this.props.history.push('/createNotice')}}>Create a new Notice</CustomButton>
                </div>
            )
        }
}

export default NoticeTeacher;