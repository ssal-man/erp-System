import React, { Component } from 'react';
import './checkNoticeAdmin.style.scss';
import { getNotices, deleteNotice } from '../../firebase/firebase.utils';
import firebase from 'firebase';
import AHeader from '../../components/aHeader/aHeader.component';
import CustomButton from '../../components/custombutton/custombutton.component';
import { withRouter } from 'react-router-dom';


class CheckNoticeAdmin extends Component{
    constructor(props){
        super(props);
        this.state={
            notices:[],
            firedoc:[]
        }
    }

    componentDidMount = async () =>{
        var docs=[]
        var hamburger = document.querySelector('.hamburger');
        var navLinks = document.querySelector('.navlinks');


        hamburger.addEventListener('click',()=>{
                navLinks.classList.toggle("open");
        })

        navLinks.addEventListener('click',()=>{
        navLinks.classList.toggle("open")});
        this.setState({notices:await getNotices()})
        var storage = firebase.storage();
        this.state.notices.forEach(async notice=>{
                var pathReference = storage.ref(notice.doc);
                try{
                    var docUrl = await pathReference.getDownloadURL()
                }catch(error){}
                docs.push(docUrl)
        })
        setTimeout(()=>{this.setState({firedoc:docs})},2500)
    }
    render(){
        var i=0
        return(
            <div className='notices'>
                <div className="headerp">
                     <AHeader/>
                </div>
                {
                    this.state.firedoc.length===0?
                    <div>Loading</div>:
                    this.state.notices.map(notice=>(
                        <div className='notice' key={notice.craetedAt.seconds}>
                            <span>Notice#{`${notice.sno}`}</span>
                            <div className='c-display'>
                            <CustomButton onClick={()=>{this.props.history.push(`/editNotice/${notice.sno}`)}}>Edit</CustomButton>
                            <CustomButton onClick={()=>{deleteNotice(notice.sno)
                            this.props.history.push('/adminHome')}}>Delete</CustomButton>
                            </div>
                            <span>Title:{notice.heading}</span>
                            <span>Description:{notice.description}</span>
                            <span>Uploaded by:{notice.email}</span>
                            <div className='pdf'>
                            <embed src={`${this.state.firedoc[i++]}`}  />
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default withRouter(CheckNoticeAdmin);