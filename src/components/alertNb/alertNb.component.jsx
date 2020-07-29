import React, { Component } from 'react';
import './alertNb.style.scss';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {ReactComponent as Alert} from '../../assets/alert.svg';
import { getNotificationsDd } from '../../firebase/firebase.utils';

class AlertNb extends Component{
    constructor(props){
        super(props)
        this.state={
            notifications:[],
        }
    }

    componentDidMount=async()=>{
        this.setState({notifications:await getNotificationsDd(this.props.currentUser.status)})
    }

    render(){

        return(
        <div >
            {this.state.notifications.length===0?null:
            <Alert className='alert-nb'/>}
        </div>)
    }
}  
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

export default withRouter(connect(mapStateToProps)(AlertNb));