import React from 'react';
import './createNoticeAdmin.style.scss';
import { Component } from 'react';
import AHeader from '../../components/aHeader/aHeader.component';
import { writeNotice } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class CreateNoticeAdmin extends Component{
    constructor(props){
        super(props);
        this.state={
            description:'',
            heading:'',
            doc:{}
        }
    }

    componentDidMount(){
        var hamburger = document.querySelector('.hamburger');
        var navLinks = document.querySelector('.navlinks');


        hamburger.addEventListener('click',()=>{
                navLinks.classList.toggle("open");
        })

        navLinks.addEventListener('click',()=>{
        navLinks.classList.toggle("open")});
    }

    onChangeHandle = (event) =>{
        const { value, name } = event.target
        this.setState({ [name]: value })
    }

    onSubmitHandle=(e)=>{
        e.preventDefault();
        writeNotice(this.state.doc,this.props.currentUser.email,this.state.heading,this.state.description)
        this.props.history.push('/adminHome')
    }

    onChangeFile = (e)=>{
        this.setState({doc:e.target.files[0]})
    }

    render(){
        return(
            <div className='notice-form'>
                <div className="headerp">
                     <AHeader/>
                 </div>
                 <div className='la-fill'>
                <form onSubmit={this.onSubmitHandle}>
                    <label htmlFor='title'>Title:</label>
                    <input type='text' id='title' name='heading' onChange={this.onChangeHandle}/>
                    <label htmlFor='description'>Description:</label>
                    <textarea  id='description' name='description' className='description' onChange={this.onChangeHandle}/>
                    <label htmlFor='file'>Upload File:</label>
                    <input type='file' id='file' name='file'onChange={this.onChangeFile}/>
                    <input type='submit'className='btn'/>
                </form>
                </div>
            </div>
        )
    }

}
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

export default withRouter(connect(mapStateToProps)(CreateNoticeAdmin));