import React, { Component } from 'react';
import './ssprofile.style.scss';
import firebase from 'firebase';

class Ssprofile extends Component{

    constructor(props){
        super(props);
        this.state={
            url:''
        }
    }

    componentDidMount = async()=>{
    const {student} = this.props
    var storage = firebase.storage();
    var pathReference = storage.ref(student.photo);
    var imageUrl = await pathReference.getDownloadURL()
    this.setState({url:imageUrl})
}
    render(){
    return(
        <div className='p-page'>
        <div className='s-profile'>
            <div className='pic'>
                <img src={`${this.state.url}`} alt='profile pic'/>
            </div>
            <div className='details'>
                <span>Name:{this.props.student.displayName}</span>
                <span>Class:{this.props.student.Class}</span>
                <span>Admission Number:{this.props.student.admissionNo}</span>
                <span>Parent's Name:{this.props.student.parentName}</span>
                <span>Email:{this.props.student.parentEmail}</span>
                <span>Phone Number:{this.props.student.ParentPhNo}</span>
            </div>
        </div>
        </div>
    )
    }
}

export default Ssprofile;