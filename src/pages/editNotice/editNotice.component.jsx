import React from 'react';
import './editNotice.style.scss';
import { Component } from 'react';
import AHeader from '../../components/aHeader/aHeader.component';
import { writeNotice, getSNotice } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';

class EditNotice extends Component{
    constructor(props){
        super(props);
        this.state={
            description:'',
            heading:'',
            doc:{},
            notice:{}
        }
    }

    componentDidMount=async()=>{
        var hamburger = document.querySelector('.hamburger');
        var navLinks = document.querySelector('.navlinks');


        hamburger.addEventListener('click',()=>{
                navLinks.classList.toggle("open");
        })
        console.log(this.props)
        navLinks.addEventListener('click',()=>{
        navLinks.classList.toggle("open")});
        this.setState({notice: await getSNotice(parseInt(this.props.match.params.sno))},()=>{
        document.getElementById("title").value = this.state.notice.heading
        document.getElementById("description").value = this.state.notice.description})
        
    }

    onChangeHandle = (event) =>{
        const { value, name } = event.target
        this.setState({ [name]: value })
    }

    onSubmitHandle=(e)=>{
        e.preventDefault();
        writeNotice(this.state.doc,this.props.currentUser.email,this.state.heading,this.state.description)
        this.props.history.push('/checkNotice')
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
                <form onSubmit={this.onSubmitHandle}>
                    <label htmlFor='title'>Title:</label>
                    <input type='text' id='title' name='heading' onChange={this.onChangeHandle}/>
                    <label htmlFor='description'>Description:</label>
                    <textarea  id='description' name='description' className='description' onChange={this.onChangeHandle}/>
                    <label htmlFor='file'>Upload File:</label>
                    <input type='file' id='file' name='file'onChange={this.onChangeFile}/>
                    <input type='submit'/>
                </form>
            </div>
        )
    }

}
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

export default connect(mapStateToProps)(EditNotice);