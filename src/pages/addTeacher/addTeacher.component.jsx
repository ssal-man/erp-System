import React, { Component } from 'react';
import './addTeacher.style.scss';
import Forminput from '../../components/forminput/forminput.component';
import { withRouter } from 'react-router-dom';
import Bcrypt from 'bcrypt-nodejs';
import CustomButton from '../../components/custombutton/custombutton.component';
import { addTeacherF } from '../../firebase/firebase.utils';

class AddTeacher extends Component{
    constructor(props) {
        super(props);
        this.state = {
            displayName:'',
            email:'',
            password:'',
            cPassword:'',
            Class:'',
        }
    }

    handleSubmit = async event => {
        const { history } = this.props
        const {password,cPassword,email,Class,displayName} = this.state
        event.preventDefault();
        if(password===cPassword){
            Bcrypt.hash(password,null,null,function(err,newPassword){
                addTeacherF(displayName,email,newPassword,Class)
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

    render(){
    return(
        <div className='add'>
            <h2>SIGN UP FOR STUDENTS</h2>
            <form className='form-as'>
                <Forminput label="Name" name='displayName' 
                onChange={this.handleChange} value={this.state.displayName}
                required />
                <Forminput label="Email" name='email' type='email'
                onChange={this.handleChange} value={this.state.email}
                required />
                <Forminput label="Password" name='password' type='password'
                onChange={this.handleChange} value={this.state.password}
                required />
                <Forminput label="Confirm Password" name='cPassword' type='password'
                onChange={this.handleChange} value={this.state.cPassword}
                required />  
                <Forminput label="Class" name='Class' 
                onChange={this.handleChange} value={this.state.Class}
                required />
                <CustomButton onClick={this.handleSubmit}>Submit</CustomButton>
            </form>
        </div>
    )
    }
}

export default withRouter(AddTeacher);