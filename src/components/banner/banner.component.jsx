import React, { Component } from 'react';
import './banner.style.scss';
import { connect } from 'react-redux';
import { removeUser } from '../../redux/user/user.action';
import {ReactComponent as NotificationBell } from '../../assets/notification-bell.svg';
import  NotificationDropdown  from '../notificationDropdown/notificationDropdown.component';

class Banner extends Component{
  render(){
    const { currentUser } = this.props
    return(
        <div className='banner'>
            <div className='banr'>ERP SYSTEM</div>
            {currentUser?<div className='banner-props'>
              <NotificationDropdown className='n-dd'/>
            <a href='/'><div className='sign-out' onClick={()=>{removeUser()}}>Sign Out</div></a><NotificationBell className='svg-nb'/></div>:null}
            
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

  const mapDispatchToProps = dispatch => ({
    removeUser: user => dispatch(removeUser(user))
  })

export default connect(mapStateToProps,mapDispatchToProps)(Banner);