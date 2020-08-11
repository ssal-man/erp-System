import React, { Component } from 'react';
import './result.style.scss';
import CustomButton from '../../components/custombutton/custombutton.component';
import {ReactComponent as Remove} from '../../assets/minus.svg';
import {ReactComponent as Add} from '../../assets/plus.svg';
import THeader from '../../components/tHeader/tHeader.component';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getStudentByClass, changeSAttendance, setResult } from '../../firebase/firebase.utils';
import {ReactComponent as Back} from '../../assets/back.svg';

class Result extends Component{
    constructor(props){
        super(props);
        this.state={
            i:0,
            name:'',
            tMarks:'',
            sMarks:'',
            students:[],
            student:{},
            obj:[],
            now:false
        }
    }
    componentDidMount= async ()=>{
        this.setState({students:await getStudentByClass(this.props.currentUser.Class)},()=>{this.loadData()})
        var hamburger = document.querySelector('.hamburger');
        var navLinks = document.querySelector('.navlinks');


        hamburger.addEventListener('click',()=>{
                navLinks.classList.toggle("open");
        })

        navLinks.addEventListener('click',()=>{
        navLinks.classList.toggle("open")});
    }

    loadData = async (name)=>{
        this.setState({student:await changeSAttendance(name)})
    }

    handleChange = event => {
        const { value, name } = event.target
        this.setState({ [name]: value })
    }

    onHandleChange=(name)=>{
        this.loadData(name)
    }

    setInfo = () =>{
        for(var j=0;j<=this.state.i;j++){
            var info={}
            info.subject = document.getElementById("sName"+j).value
            info.scored = document.getElementById("sMarks"+j).value
            info.total = document.getElementById("tMarks"+j).value
            this.state.obj.push(info)
        }
        setResult(document.getElementById('not').options[document.getElementById('not').selectedIndex].value , this.state.student.admissionNo, this.state.student.displayName,this.state.obj)
        this.props.history.push('/teacherhomepage')
    }

    render(){
        console.log(this.state.student)
        var {i} = this.state
        return(
            <div className='s-result'>
                <div className="headerp">
                <THeader/>
                </div>
                <label>Choose the name of test :</label>
                <select id='not' required>
                <option value='WeeklyTest1'>Weekly Test 1</option>
                <option value='WeeklyTest2'>Weekly Test 2</option>
                <option value='WeeklyTest3'>Weekly Test 3</option>
                <option value='WeeklyTest4'>Weekly Test 4</option>
                <option value='HalfYearly'>Half Yearly Examination</option>
                <option value='AnnualExam'>Annual Examination</option>
                </select>
                <div className='r-dd'>
                SELECT A CLASS:
                <select name="students" id="students"  className='dropdown'>
                        {
                            <option value={this.props.currentUser.Class}>Class {this.props.currentUser.Class}</option>
                        }
                </select> 
                {
                    !this.state.now?
                    <div>
                    <div>SELECT A STUDENT:</div>
                <div className='stu-options'>
                    {this.state.students.map(student=>(
                        <div className='aStudent' key={student.admissionNo} onClick={()=>{this.onHandleChange(student.displayName)
                        this.setState({now:true})}}>
                            {student.displayName}
                        </div>
                    ))}
                </div>
                </div>:null
                }
                {
                    this.state.now?
                    this.state.student?
                    <div className='s-info-r'>
                        <Back className='back' onClick={()=>this.setState({now:false})}/>
                        You are giving marks to {this.state.student.displayName}
                    </div>:null:null
                }
                </div>
                <div id='component0'>
                <div id='t-component0' className='t-component'>
                    <input id={'sName0'} placeholder='Name of Subject' value={this.state.name} onChange={this.handleChange} name='name' required></input>
                    <input id={'tMarks0'} placeholder='Total Marks' value={this.state.tMarks} onChange={this.handleChange} name='tMarks' required></input>
                    <input id={'sMarks0'} placeholder='Marks scored' value={this.state.sMarks} onChange={this.handleChange} name='sMarks' required></input>
                </div>
                </div>
                <div className='btns-as'>
                <Add id='add' onClick={()=>{
                    i=i+1
                    this.setState({i:i})
                    var clone = document.getElementById('t-component0').cloneNode(true);
                    clone.id = 't-component'+ i
                    clone.childNodes[0].id = 'sName'+i
                    clone.childNodes[1].id = 'tMarks'+i
                    clone.childNodes[2].id = 'sMarks'+i
                    document.getElementById('component0').appendChild(clone);
                }}/>
                <Remove  className='remove'  onClick={()=>{
                        document.getElementById('component0').removeChild(document.getElementById("component0").lastChild)
                    }}/>
                
                </div>
                <CustomButton onClick={this.setInfo}>Submit</CustomButton>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

export default withRouter(connect(mapStateToProps)(Result));