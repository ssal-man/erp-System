import React, { Component } from 'react';
import './psignin.style.scss';
import Forminput from '../../components/forminput/forminput.component';
import CustomButton from '../../components/custombutton/custombutton.component';
import { getStudent } from '../../firebase/firebase.utils';
import { setCurrentUser } from '../../redux/user/user.action';
import { connect } from 'react-redux';


class ParentSignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admissionNo: '',
            password: '',
        }
    }

    handleSubmit = async event => {
        const { setCurrentUser } = this.props
        const {admissionNo,password}=this.state
        event.preventDefault();
        setCurrentUser(await getStudent(admissionNo,password))
        this.setState({ admissionNo: '', password: '' })
    }

    handleChange = event => {
        const { value, name } = event.target
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className='parent'>
                <h2>Parent's / Student's Sign In</h2>
                <form onSubmit={this.handleSubmit}>
                    <Forminput label="Admission Number" name='admissionNo' 
                        onChange={this.handleChange} value={this.state.admissionNo}
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

export default connect(null,mapDispatchToProps)(ParentSignIn);