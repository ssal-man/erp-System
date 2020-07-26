import React, { Component } from 'react';
import './noticeAdmin.style.scss';
import CustomButton from '../../components/custombutton/custombutton.component';
import AHeader from '../../components/aHeader/aHeader.component';

class NoticeAdmin extends Component{
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
                     <AHeader/>
                </div>
                    <CustomButton onClick={()=>{this.props.history.push('/checkNoticeAdmin')}}>Check Notices</CustomButton>
                    <CustomButton onClick={()=>{this.props.history.push('/createNoticeAdmin')}}>Create a new Notice</CustomButton>
                </div>
            )
        }
}

export default NoticeAdmin;