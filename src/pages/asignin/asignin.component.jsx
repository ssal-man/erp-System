import React, { Component } from 'react';
import './asignin.style.scss';
import Forminput from '../../components/forminput/forminput.component';
import CustomButton from '../../components/custombutton/custombutton.component';
import { getAdmin } from '../../firebase/firebase.utils';
// import { Link } from 'react-router-dom';
// import { auth } from '../../firebase/firebase.utils';

class AdminSignIn extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            currentUser:{}
        }
    }

    handleSubmit = async event => {
        const {email,password} = this.state
        event.preventDefault();
        this.setState({currentUser:await getAdmin(email,password)},()=>{console.log(this.state.currentUser)})
        this.setState({ email: '', password: '' })
    }

    handleChange = event => {
        const { value, name } = event.target
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className='parent'>
                <h2>Admin's Sign In</h2>
                <form onSubmit={this.handleSubmit}>
                    <Forminput label="Email" name='email' type='email'
                        onChange={this.handleChange} value={this.state.email}
                    required />
                    <Forminput label="password" name='password' type='password'
                        onChange={this.handleChange} value={this.state.password}
                    required />
                <CustomButton>Sign In</CustomButton>
                </form>
            </div>
        )
    }
}

export default AdminSignIn;