import React, { Component } from 'react';
import './notificationDropdown.style.scss';
import { getNotificationsDd } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CustomButton from '../custombutton/custombutton.component';

class NotificationDropdown extends Component{
     constructor(props){
         super(props)
         this.state={
             notifications:[]
         }
     }
     componentDidMount=async()=>{
         this.setState({notifications:await getNotificationsDd(this.props.currentUser.status)})
     }

    render(){
    return(
        <div className='dd'>
            {this.state.notifications.length!==0?<div>
            {this.state.notifications.map(notification=>(
            <div key={notification}><div className='n-dd'>{notification}</div>
            <hr/></div>))}</div>:<div className='n-dd'>No new notifications</div>}
            <CustomButton>check all notifications</CustomButton>
        </div>
    )
    }
}
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

export default withRouter(connect(mapStateToProps)(NotificationDropdown));