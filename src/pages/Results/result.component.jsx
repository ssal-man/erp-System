import React, { Component } from 'react';
import './result.style.scss';
import CustomButton from '../../components/custombutton/custombutton.component';
import {ReactComponent as Remove} from '../../assets/minus.svg';
import {ReactComponent as Add} from '../../assets/plus.svg';
import THeader from '../../components/tHeader/tHeader.component';

class Result extends Component{
    constructor(props){
        super(props);
        this.state={
            i:0,
            name:'',
            tMarks:'',
            sMarks:''
        }
    }
    componentDidMount= async ()=>{
        var hamburger = document.querySelector('.hamburger');
        var navLinks = document.querySelector('.navlinks');


        hamburger.addEventListener('click',()=>{
                navLinks.classList.toggle("open");
        })

        navLinks.addEventListener('click',()=>{
        navLinks.classList.toggle("open")});
    }

    handleChange = event => {
        const { value, name } = event.target
        this.setState({ [name]: value })
    }

    render(){
        var {i} = this.state
        return(
            <div className='s-result'>
                <div className="headerp">
                <THeader/>
                </div>
                <label>Enter the name of test :</label>
                <input id='not' required></input>
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
                <CustomButton>Submit</CustomButton>
            </div>
        )
    }
}

export default Result;