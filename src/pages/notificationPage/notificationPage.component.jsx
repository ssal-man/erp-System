import React, { Component } from 'react';
import './notificationPage.style.scss';
import { getNotifications } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import {ReactComponent as Back} from '../../assets/back.svg';
import { withRouter } from 'react-router-dom';

class NotificationPage extends Component{
    constructor(props){
        super(props);
        this.state={
            notifications:[]
        }
    }

    componentDidMount = async ()=>{
        
        this.setState({notifications:await getNotifications(this.props.currentUser.status,this.props.currentUser.Class)})
    }

    render(){
        console.log(this.state.notifications)
        return(
            <div className='notification-page'>
                <Back className='back' onClick={()=>{window.history.back()}}/>
                {this.state.notifications?<ul className='notifications'>
                {this.state.notifications.map(notification=>(
                    <li className='notification' key={notification.notification}>
                        <span className='noti'>{notification.notification}</span>
                        <span>Reason:{notification.reason}</span>
                    </li>
                ))}</ul>:<div className='nnf'>No notifications Found</div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

export default withRouter(connect(mapStateToProps)(NotificationPage));