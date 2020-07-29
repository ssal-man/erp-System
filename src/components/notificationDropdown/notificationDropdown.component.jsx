import React, { Component } from 'react';
import './notificationDropdown.style.scss';
import { getNotificationsDd } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
            {this.state.notifications?
            this.state.notifications.map(notification=>(
            <div key={notification}><div className='n-dd'>{notification}</div>
            <hr/></div>)):<div>No new notifications</div>}
        </div>
    )
    }
}
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

export default withRouter(connect(mapStateToProps)(NotificationDropdown));