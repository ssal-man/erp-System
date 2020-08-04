import React, { Component } from 'react';
import './chat.style.scss';
import {ReactComponent as Back} from '../../assets/back.svg';
import { connect } from 'react-redux';

class Chat extends Component{
    render(){
        return(
        <div className='chat'>
            <Back className='back' onClick={()=>{window.history.back()}}/>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

export default connect(mapStateToProps)(Chat)