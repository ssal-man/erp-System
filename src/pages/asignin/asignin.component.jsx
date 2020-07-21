import React, { Component } from 'react';
import './asignin.style.scss';
import Forminput from '../../components/forminput/forminput.component';
import CustomButton from '../../components/custombutton/custombutton.component';
import { getAdmin } from '../../firebase/firebase.utils';
import { setCurrentUser } from '../../redux/user/user.action';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { auth } from '../../firebase/firebase.utils';

class AdminSignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    handleSubmit = async event => {
        const { setCurrentUser } = this.props
        const {email,password} = this.state
        event.preventDefault();
        setCurrentUser(await getAdmin(email,password))
        this.setState({ email: '', password: '' })
    }

    handleChange = event => {
        const { value, name } = event.target
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className='paren    const { setCurrentUser } = this.props
            t'>
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

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
  })

export default connect(null,mapDispatchToProps)(AdminSignIn);