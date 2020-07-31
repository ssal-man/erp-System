import React, { Component } from 'react';
import './banner.style.scss';
import { connect } from 'react-redux';
import { removeUser } from '../../redux/user/user.action';
import {ReactComponent as NotificationBell } from '../../assets/notification-bell.svg';
import  NotificationDropdown  from '../notificationDropdown/notificationDropdown.component';
import { readMsg } from '../../firebase/firebase.utils';
import AlertNb from '../alertNb/alertNb.component';
import { withRouter } from 'react-router-dom';

class Banner extends Component{
  constructor(props) {
    super(props);
    this.state={
      hidden:true,
    }
  }
  
  render(){
    const { currentUser } = this.props
    return(
        <div className='banner'>
            <div className='banr'>ERP SYSTEM</div>
            {currentUser?<div className='banner-props'>
              {this.state.hidden?null:<NotificationDropdown className='n-dd' />}
            <a href='/'><div className='sign-out' onClick={()=>{removeUser()}}>Sign Out</div></a><div ><AlertNb /></div><NotificationBell className='svg-nb' onClick={async()=>{
                this.setState({hidden:!this.state.hidden})
                 await readMsg()
              }}/></div>:null}
            
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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Banner));