import React, { Component } from 'react';
import './teacherHomepage.style.scss';
import THeader from '../../components/tHeader/tHeader.component';
import { getStudentByClass } from '../../firebase/firebase.utils';
import  Ssprofile  from '../../components/students_profile/ssprofile.component';
import { connect } from 'react-redux';

class teacherHomepage extends Component{

    constructor(props){
        super(props);
        this.state={
            students:[]
        }
    } 
    componentDidMount=async ()=>{
        this.setState({students:await getStudentByClass(this.props.currentUser.class)})
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
        <div className="t-homepage">
            <div className="headerp">
            <THeader/>
            </div>
            <div className='s-cards'>
                {
                    this.state.students.map(student=>(
                        <Ssprofile student={student} key={student.admissionNo}/>
                    ))
                }
            </div>
        </div>
    );
            }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

export default connect(mapStateToProps)(teacherHomepage);