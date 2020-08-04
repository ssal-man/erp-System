import React, { Component } from 'react';
import './chat.style.scss';
import {ReactComponent as Back} from '../../assets/back.svg';
import { connect } from 'react-redux';
import { getStudentByClass, getSTeacher } from '../../firebase/firebase.utils';
import {ReactComponent as Sbox} from '../../assets/sb.svg';
import {ReactComponent as Userp} from '../../assets/up.svg';

class Chat extends Component{
    constructor(props){
        super(props);
        this.state={
            students:[],
            teacher:{}
        }
    }
    componentDidMount=async()=>{
        var msg = document.querySelector('.msg')
        msg.classList.toggle("open");
        if(this.props.currentUser.status==='teacher'){
            this.setState({students:await getStudentByClass(this.props.currentUser.Class)})
        }
        else if(this.props.currentUser.status==='student'){
            this.setState({teacher: await getSTeacher(this.props.currentUser.Class)},()=>{console.log(this.state)})
        }
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
                    <div className='chat-card' key={student.admissionNo}>
                        
                        <Userp className='u-p'/>
                        <div className='chat-name'>{student.displayName}</div>
                        
                    </div>
                )):null}
                {Object.keys(this.state.teacher).length!==0?<div className='chat-card'>
                        <Userp className='u-p'/>
                         <div className='chat-name'>{this.state.teacher.displayName}</div>
                         </div>
                :null
                }
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

export default connect(mapStateToProps)(Chat)