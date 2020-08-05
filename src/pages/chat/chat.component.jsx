import React, { Component } from 'react';
import './chat.style.scss';
import {ReactComponent as Back} from '../../assets/back.svg';
import { connect } from 'react-redux';
import { getStudentByClass, getSTeacher } from '../../firebase/firebase.utils';
import {ReactComponent as Sbox} from '../../assets/sb.svg';
import {ReactComponent as Userp} from '../../assets/up.svg';
import {ReactComponent as Send} from '../../assets/send.svg';

class Chat extends Component{
    constructor(props){
        super(props);
        this.state={
            students:[],
            teacher:{},
            name:''
        }
    }
    componentDidMount=async()=>{
        var msg = document.querySelector('.msg')
        msg.classList.toggle("open");
        if(this.props.currentUser.status==='teacher'){
            this.setState({students:await getStudentByClass(this.props.currentUser.Class)})
        }
        else if(this.props.currentUser.status==='student'){
            this.setState({teacher: await getSTeacher(this.props.currentUser.Class)})
        }
    }
    componentWillUnmount(){
        var msg = document.querySelector('.msg')
        msg.classList.toggle("open");
    }

    setHeader = (person) =>{
        if(this.state.name===''){
        var chatHeader = document.querySelector('.chat-header')
        chatHeader.classList.toggle("show");
        }
        this.setState({name:person.displayName})
    }
    render(){
        return(
        <div className='chat'>
            <Back className='back' onClick={()=>{window.history.back()}}/>
            <div className='name-box'>
                <div className='search'>
                    <Sbox className='s-b'/>
                </div>
                {this.state.students?this.state.students.map(student=>(
                    <div className='chat-card' key={student.admissionNo}
                    onClick={()=>{this.setHeader(student)}}
                    >
                        
                        <Userp className='u-p'/>
                        <div className='chat-name'>{student.displayName}</div>
                        
                    </div>
                )):null}
                {Object.keys(this.state.teacher).length!==0?<div className='chat-card'   onClick={()=>{this.setHeader(this.state.teacher)}}>
                        <Userp className='u-p'/>
                         <div className='chat-name'>{this.state.teacher.displayName}</div>
                         </div>
                :null
                }
            </div>
            <div className='chat-header'>
                <Userp className='u-p'/>
                <div className='chat-name'>{this.state.name}</div>
            </div>
            <div className='chat-zone'>
                <input id='chat-z'></input>
                <Send className='send'/>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

export default connect(mapStateToProps)(Chat)