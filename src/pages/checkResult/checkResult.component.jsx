import React, { Component } from 'react';
import './checkResult.style.scss';
import PHeader from '../../components/pHeader/pHeader.component';
import { connect } from 'react-redux';
import {getMarks1, getMarks3, getMarks2, getMarks4, getMarksH, getMarksA} from '../../firebase/firebase.utils';

class CheckResult extends Component{

    constructor(props){
        super(props)
        this.state={
            marks1:[],
            marks2:[],
            marks3:[],
            marks4:[],
            marksH:[],
            marksA:[]
        }
    }
    componentDidMount = async () =>{
        this.setState({marks1 : await getMarks1(this.props.currentUser.admissionNo)})
        this.setState({marks2 : await getMarks2(this.props.currentUser.admissionNo)},()=>{console.log(this.state.marks2)})
        this.setState({marks3 : await getMarks3(this.props.currentUser.admissionNo)})
        this.setState({marks4 : await getMarks4(this.props.currentUser.admissionNo)})
        this.setState({marksH : await getMarksH(this.props.currentUser.admissionNo)})
        this.setState({marksA : await getMarksA(this.props.currentUser.admissionNo)})
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
            <div className='result-s'>
                <div className="headerp">
                     <PHeader/>
                </div>
                <div className="container">
                <ul className="responsive-table">
                <h2>RESULT:</h2>
                    <li className="table-header">
                    <div className="col col-1">Subjects</div>
                    <div className="col col-2">Weekly Test 1</div>
                    <div className="col col-3">Weekly Test 2</div>
                    <div className="col col-4">Weekly Test 3</div>
                    <div className="col col-5">Weekly Test 4</div>
                    <div className="col col-6">Half Yearly Exam</div>
                    <div className="col col-7">Annual Exam</div>
                    </li>
                    <li className="table-row">
                    <div className="col col-1" data-label="Subjects">English</div>
                    <div className="col col-2" data-label="Weekly Test 1">{this.state.marks1?this.state.marks1.map(mark=>mark.subject==='English'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    <div className="col col-3" data-label="Weekly Test 2">{this.state.marks2?this.state.marks2.map(mark=>mark.subject==='English'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    <div className="col col-4" data-label="Weekly Test 3">{this.state.marks3?this.state.marks3.map(mark=>mark.subject==='English'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    <div className="col col-5" data-label="Weekly Test 4">{this.state.marks4?this.state.marks4.map(mark=>mark.subject==='English'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    <div className="col col-6" data-label="Half Yearly EXam">{this.state.marksH?this.state.marksH.map(mark=>mark.subject==='English'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    <div className="col col-7" data-label="Annual Exam">{this.state.marksA?this.state.marksA.map(mark=>mark.subject==='English'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    </li>
                    <li className="table-row">
                    <div className="col col-1" data-label="Subjects">Hindi</div>
                    <div className="col col-2" data-label="Weekly Test 1">{this.state.marks1?this.state.marks1.map(mark=>mark.subject==='Hindi'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    <div className="col col-3" data-label="Weekly Test 2">{this.state.marks2?this.state.marks2.map(mark=>mark.subject==='Hindi'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    <div className="col col-4" data-label="Weekly Test 3">{this.state.marks3?this.state.marks3.map(mark=>mark.subject==='Hindi'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    <div className="col col-5" data-label="Weekly Test 4">{this.state.marks4?this.state.marks4.map(mark=>mark.subject==='Hindi'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    <div className="col col-6" data-label="Half Yearly EXam">{this.state.marksH?this.state.marksH.map(mark=>mark.subject==='Hindi'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    <div className="col col-7" data-label="Annual Exam">{this.state.marksA?this.state.marksA.map(mark=>mark.subject==='Hindi'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    </li>
                    <li className="table-row">
                    <div className="col col-1" data-label="Subjects">Science</div>
                    <div className="col col-2" data-label="Weekly Test 1">{this.state.marks1?this.state.marks1.map(mark=>mark.subject==='Science'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    <div className="col col-3" data-label="Weekly Test 2">{this.state.marks2?this.state.marks2.map(mark=>mark.subject==='Science'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    <div className="col col-4" data-label="Weekly Test 3">{this.state.marks3?this.state.marks3.map(mark=>mark.subject==='Science'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    <div className="col col-5" data-label="Weekly Test 4">{this.state.marks4?this.state.marks4.map(mark=>mark.subject==='Science'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    <div className="col col-6" data-label="Half Yearly EXam">{this.state.marksH?this.state.marksH.map(mark=>mark.subject==='Science'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    <div className="col col-7" data-label="Annual Exam">{this.state.marksA?this.state.marksA.map(mark=>mark.subject==='Science'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    </li>
                    <li className="table-row">
                    <div className="col col-1" data-label="Subjects">Social Studies</div>
                    <div className="col col-2" data-label="Weekly Test 1">{this.state.marks1?this.state.marks1.map(mark=>mark.subject==='Social Studies'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    <div className="col col-3" data-label="Weekly Test 2">{this.state.marks2?this.state.marks2.map(mark=>mark.subject==='Social Studies'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    <div className="col col-4" data-label="Weekly Test 3">{this.state.marks3?this.state.marks3.map(mark=>mark.subject==='Social Studies'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    <div className="col col-5" data-label="Weekly Test 4">{this.state.marks4?this.state.marks4.map(mark=>mark.subject==='Social Studies'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    <div className="col col-6" data-label="Half Yearly EXam">{this.state.marksH?this.state.marksH.map(mark=>mark.subject==='Social Studies'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    <div className="col col-7" data-label="Annual Exam">{this.state.marksA?this.state.marksA.map(mark=>mark.subject==='Social Studies'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    </li>
                    <li className="table-row">
                    <div className="col col-1" data-label="Subjects">Mathematics</div>
                    <div className="col col-2" data-label="Weekly Test 1">{this.state.marks1?this.state.marks1.map(mark=>mark.subject==='Mathematics'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    <div className="col col-3" data-label="Weekly Test 2">{this.state.marks2?this.state.marks2.map(mark=>mark.subject==='Mathematics'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    <div className="col col-4" data-label="Weekly Test 3">{this.state.marks3?this.state.marks3.map(mark=>mark.subject==='Mathematics'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    <div className="col col-5" data-label="Weekly Test 4">{this.state.marks4?this.state.marks4.map(mark=>mark.subject==='Mathematics'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    <div className="col col-6" data-label="Half Yearly EXam">{this.state.marksH?this.state.marksH.map(mark=>mark.subject==='Mathematics'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    <div className="col col-7" data-label="Annual Exam">{this.state.marksA?this.state.marksA.map(mark=>mark.subject==='Mathematics'?`${mark.scored}/${mark.total}`:''):"NA"}</div>
                    </li>
                </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

export default connect(mapStateToProps)(CheckResult);