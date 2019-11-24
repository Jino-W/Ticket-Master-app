import React from 'react'
import NewForm from '../NewForm'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class NewEmployee extends React.Component{
    constructor(){
        super()
        this.state={
            employee: {}
        }
    }

    submitHandle=(formData)=>{
        axios.post("/Employees", formData,{
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log(response.data)
            this.setState({employee:formData})
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }else{
                this.props.history.push('/Employees')
                //https://stackoverflow.com/questions/44312437/react-router-v4-this-props-history-push-not-working
            }
        })
        .catch(err=>{
            console.log(err)
            alert(err)
        })
    }

    render(){
        return(
            <div>
                <h2>Add Employee</h2>
                <NewForm isEmployee={true} submitHandle={this.submitHandle}/>
                <button><Link to={{ pathname:`/employees/${this.state.employee._id}`, state: {employee : this.state.employee} }}>Back</Link></button>
            </div>
        )
    }
}

export default NewEmployee