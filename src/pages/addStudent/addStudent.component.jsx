import React, { Component } from 'react';
import './addStudent.style.scss';
import Forminput from '../../components/forminput/forminput.component';
import { withRouter } from 'react-router-dom';
import Bcrypt from 'bcrypt-nodejs';
import CustomButton from '../../components/custombutton/custombutton.component';
import { addStudentF } from '../../firebase/firebase.utils';

class AddStudent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            displayName:'',
            parentEmail:'',
            parentPhNo:'',
            password:'',
            cPassword:'',
            parentName:'',
            Class:'',
            admissionNo:'',
            rollNo:'',
            photo:''
        }
    }

    handleSubmit = async event => {
        const { history } = this.props
        const {parentEmail,password,cPassword,parentName,parentPhNo,Class,admissionNo,rollNo,photo,displayName} = this.state
        event.preventDefault();
        if(password===cPassword){
            Bcrypt.hash(password,null,null,function(err,newPassword){
                addStudentF(displayName,parentEmail,parentPhNo,newPassword,parentName,Class,admissionNo,rollNo,photo)
            })
        }else{
            alert("passwords doesn't match")
        }
        history.push('/adminHome')
    }

    handleChange = event => {
        const { value, name } = event.target
        this.setState({ [name]: value })
    }

    onChangeFile = (e)=>{
        this.setState({photo:e.target.files[0]})
    }

    render(){
    return(
        <div className='add'>
            <h2>SIGN UP FOR STUDENTS</h2>
            <form className='form-as'>
                <Forminput label="Student's Name" name='displayName' 
                onChange={this.handleChange} value={this.state.displayName}
                required />
                <Forminput label="Parent's Email" name='parentEmail' type='email'
                onChange={this.handleChange} value={this.state.parentEmail}
                required />
                <Forminput label="Password" name='password' type='password'
                onChange={this.handleChange} value={this.state.password}
                required />
                <Forminput label="Confirm Password" name='cPassword' type='password'
                onChange={this.handleChange} value={this.state.cPassword}
                required />  
                <Forminput label="Parent's Name" name='parentName' 
                onChange={this.handleChange} value={this.state.parentName}
                required />
                <Forminput label="Admission Number" name='admissionNo' 
                onChange={this.handleChange} value={this.state.admissionNo}
                required />
                <Forminput label="Roll No" name='rollNo' 
                onChange={this.handleChange} value={this.state.rollNo}
                required />
                <Forminput label="Parent's Phone Number" name='parentPhNo' 
                onChange={this.handleChange} value={this.state.parentPhNo}
                required />
                <Forminput label="Class" name='Class' 
                onChange={this.handleChange} value={this.state.Class}
                required />
                <label>Student's Photo</label>
                <Forminput  name='photo' type='file'
                onChange={this.onChangeFile}
                required />
                <CustomButton onClick={this.handleSubmit}>Submit</CustomButton>
            </form>
        </div>
    )
    }
}

export default withRouter(AddStudent);