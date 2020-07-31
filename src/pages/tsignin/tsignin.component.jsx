import React, { Component } from 'react';
import './tsignin.style.scss';
import Forminput from '../../components/forminput/forminput.component';
import CustomButton from '../../components/custombutton/custombutton.component';
import { getTeacher } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/user/user.action';
 
class TeacherSignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    handleSubmit = async event => {
        const { setCurrentUser,history } = this.props
        const {email,password} = this.state
        event.preventDefault();
        setCurrentUser(await getTeacher(email,password))
        this.setState({ email: '', password: '' })
        history.push('/teacherHomepage')
    }

    handleChange = event => {
        const { value, name } = event.target
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className='parent'>
                <h2>Teacher's Sign In</h2>
                <form onSubmit={this.handleSubmit}>
                    <Forminput label="Email" name='email' type='email'
                        onChange={this.handleChange} value={this.state.email}
                    required />
                    <Forminput label="password" name='password' type='password'
                        onChange={this.handleChange} value={this.state.password}
                    required />
                <CustomButton>Sign In</CustomButton>
                </form>
                <span onClick={()=>{this.props.history.push('/teacherChangePassword')}} className='fp'>Forgotten password?</span>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
  })

export default connect(null,mapDispatchToProps)(TeacherSignIn);
