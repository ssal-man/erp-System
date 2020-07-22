import React, { Component } from 'react';
import './checkAttendance.style.scss';
import PHeader from '../../components/pHeader/pHeader.component';
import { getAttendance } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';

class CheckAttendance extends Component{
    constructor(){
        super();
        this.state={
            details:[]
        }
    }

    componentDidMount=async()=>{
        this.setState({details:await getAttendance(this.props.currentUser.admissionNo)})
        var hamburger = document.querySelector('.hamburger');
        var navLinks = document.querySelector('.navlinks');


        hamburger.addEventListener('click',()=>{
                navLinks.classList.toggle("open");
        })

        navLinks.addEventListener('click',()=>{
        navLinks.classList.toggle("open")});
    }

    render(){
    console.log(this.state.details)
    return(
    <div className='check-attendance'>
        <div className="headerp">   
        <PHeader/>    
        </div>
        <div className='percentage'>
            Your Attendance Till Date is :
        </div>
        <div className='months'>
        <label htmlFor="months">Choose a month:</label>
        <select name="months" id="months">
            <option value="january">january</option>
            <option value="february">february</option>
            <option value="march">march</option>
            <option value="april">april</option>
            <option value="may">may</option>
            <option value="june">june</option>
            <option value="july">july</option>
            <option value="august">august</option>
            <option value="september">september</option>
            <option value="october">october</option>
            <option value="november">november</option>
            <option value="december">december</option>
        </select>
        </div>
        <div className='calender'>
            {
                this.state.details.length===0?
                <div>loading</div>:
                this.state.details.forEach(obj=>(
                    <div>{obj}</div>
                ))
            }
        </div>
    </div>
    );}
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

export default connect(mapStateToProps)(CheckAttendance);