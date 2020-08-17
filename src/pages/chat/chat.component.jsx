import React, { Component } from 'react';
import './chat.style.scss';
import {ReactComponent as Back} from '../../assets/back.svg';
import { connect } from 'react-redux';
import { getStudentByClass, getSTeacher, writeChat, compareChat, writeNotiChat } from '../../firebase/firebase.utils';
import {ReactComponent as Sbox} from '../../assets/sb.svg';
import {ReactComponent as Userp} from '../../assets/up.svg';
import {ReactComponent as Send} from '../../assets/send.svg';
import {firestore} from '../../firebase/firebase.utils';


class Chat extends Component{
    constructor(props){
        super(props);
        this.state={
            students:[],
            teacher:{},
            name:'',
            chats:[],
            filteredChat:[]
        }
    }

    unsubscribe = ()=>{};

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
        this.unsubscribe()
    }

    setHeader = (person) =>{
        if(this.state.name===''){
        var chatHeader = document.querySelector('.chat-header')
        chatHeader.classList.toggle("show");
        }
        this.setState({name:person.displayName})
        this.unsubscribe = firestore.collection("chat").onSnapshot(snapShot=>{
            var chat=[]
            snapShot.forEach(doc=>{
                var data = doc.data()
                if((data.from===this.props.currentUser.displayName && data.to===this.state.name)||(data.to===this.props.currentUser.displayName && data.from===this.state.name)){
                    chat.push(data)
                }
            })
            chat.sort(compareChat)
            this.setState({chats:chat})
        })
        var box = document.querySelector('.name-box')
        box.classList.toggle("hide");
    }

    sendHandle = () =>{
        writeChat(this.state.name,this.props.currentUser.displayName,document.getElementById("chat-z").value)
        writeNotiChat(this.state.name,this.props.currentUser.displayName)
        document.getElementById("chat-z").value=''
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
                {this.state.chats?this.state.chats.map(chat=>
                    this.props.currentUser.displayName===chat.from?
                    (<div className='f-msg' key={chat.dateTime.seconds}>
                        {chat.msg}
                    </div>):(<div className='t-msg' key={chat.dateTime.seconds}>
                    {chat.msg}
                    </div>)
                ):null}
                <input id='chat-z'></input>
                <Send className='send' onClick={this.sendHandle}/>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

export default connect(mapStateToProps)(Chat)