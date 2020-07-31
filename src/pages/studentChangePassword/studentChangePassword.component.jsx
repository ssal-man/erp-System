import React, { Component } from 'react';
import './studentChangePassword.style.scss';
import Forminput from '../../components/forminput/forminput.component';
import CustomButton from '../../components/custombutton/custombutton.component';
import bcrypt from 'bcrypt-nodejs';
import { changePasswordS } from '../../firebase/firebase.utils';

class StudentChangePassword extends Component{
    constructor(props) {
        super(props);
        this.state = {
            admissionNo: '',
            oldPassword: '',
            newPassword:'',
            confirmNewPassword:''
        }
    }

    handleSubmit = async event => {
        const {history } = this.props
        const {admissionNo, oldPassword, newPassword, confirmNewPassword}=this.state
        event.preventDefault();
        if(newPassword===confirmNewPassword){
            bcrypt.hash(newPassword,null,null,function(err,newPassword){
                    changePasswordS(oldPassword,newPassword,admissionNo)
                })
        }else{
            alert("password does not match")
        }
        this.setState({ admissionNo: '', oldPassword: '' ,confirmNewPassword:'',newPassword:''})
        history.push('/')
    }

    handleChange = event => {
        const { value, name } = event.target
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className='parent'>
                <h2>Change Password</h2>
                <form onSubmit={this.handleSubmit}>
                    <Forminput label="Admission Number" name='admissionNo' 
                        onChange={this.handleChange} value={this.state.admissionNo}
                    required />
                    <Forminput label="Old Password" name='oldPassword' type='password'
                        onChange={this.handleChange} value={this.state.oldPassword}
                    required />
                    <Forminput label="New Password" name='newPassword' type='password'
                        onChange={this.handleChange} value={this.state.newPassword}
                    required />
                    <Forminput label="Confirm New Password" name='confirmNewPassword' type='password'
                        onChange={this.handleChange} value={this.state.confirmNewPassword}
                    required />
                <CustomButton>Submit</CustomButton>
                </form>
            </div>
        )
    }
}



export default StudentChangePassword;