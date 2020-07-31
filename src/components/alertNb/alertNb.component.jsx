import React, { Component } from 'react';
import './alertNb.style.scss';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {ReactComponent as Alert} from '../../assets/alert.svg';
import { firestore } from '../../firebase/firebase.utils';


class AlertNb extends Component{
    constructor(props){
        super(props)
        this.state={
            notifications:[],
        }
    }

    unsubscribe = null;

    componentDidMount=()=>{
                    this.unsubscribe = firestore.collection('notifications').where("for","==","teacher").onSnapshot(snapShot=>{
                    var notifications=[]
                    snapShot.forEach(doc=>{
                        const data=doc.data()
                        if(data.Class===this.props.currentUser.Class){
                            if(!data.read){
                            notifications.push(data.notification)
                            }
                        }
                    })
                    this.setState({notifications:notifications})
                })       
    }
    componentWillUnmount=()=>{
        this.unsubscribe()
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