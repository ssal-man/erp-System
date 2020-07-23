import React, { Component } from 'react';
import './adminHome.style.scss';
import AHeader from '../../components/aHeader/aHeader.component';
import { getAllStudents } from '../../firebase/firebase.utils';
import Ssprofile from '../../components/students_profile/ssprofile.component';
import { connect } from 'react-redux';

class AdminHome extends Component{
    constructor(props){
        super(props);
        this.state={
            students:[]
        }
    }

    componentDidMount= async()=>{
        this.setState({students:await getAllStudents()})
        var hamburger = document.querySelector('.hamburger');
        var navLinks = document.querySelector('.navlinks');


        hamburger.addEventListener('click',()=>{
                navLinks.classList.toggle("open");
        })

        navLinks.addEventListener('click',()=>{
        navLinks.classList.toggle("open")});
    }

    render(){
        return(
            <div className='admin'>
                <div className="headerp">
                     <AHeader/>
                </div>
                <div className='s-cards'>
                {
                    this.state.students.map(student=>(
                        <Ssprofile student={student} key={student.admissionNo}/>
                    ))
                }
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

export default connect(mapStateToProps)(AdminHome);