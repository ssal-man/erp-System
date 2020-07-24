import React, { Component } from 'react';
import './checkNotice.style.scss';
import THeader from '../../components/tHeader/tHeader.component';

class CheckNotice extends Component{
    constructor(props){
        super(props);
        this.state={
            notices:[]
        }
    }

    componentDidMount = async () =>{
        var hamburger = document.querySelector('.hamburger');
        var navLinks = document.querySelector('.navlinks');


        hamburger.addEventListener('click',()=>{
                navLinks.classList.toggle("open");
        })

        navLinks.addEventListener('click',()=>{
        navLinks.classList.toggle("open")});
        // this.setState({notices:await getNotices()})
    }

    render(){
        return(
            <div className='notices'>
                <div className="headerp">
                     <THeader/>
                </div>
                {
                    this.state.notices.map(notice=>(
                        <div className='notice'>
                            <span>Title:</span>
                            <span>Description:</span>
                            <span>Uploaded by:</span>
                            <span>Doc:</span>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default CheckNotice;