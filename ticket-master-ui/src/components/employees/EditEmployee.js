import React from 'react'
import NewForm from '../NewForm'
import axios from '../../config/axios'
import {Redirect} from 'react-router-dom'

class EditEmployee extends React.Component{
    constructor(props){
        super(props)
        this.state={
            employee : props.location.state.employee,
            redirectToReferrer: false
        }
    }

    submitHandle=(formData)=>{
        const id = this.props.match.params.id
        axios.put(`/employees/${id}`, formData,{
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log(response.data)
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }else{
                this.props.history.push('/employees')
            }
        })
        .catch(err=>{
            console.log(err)
            alert(err)
        })
    }

    handleBack=()=>{
        this.setState({redirectToReferrer: true})
    }

    render(){
        return(
            <div>
                {this.state.employee && 
                    <div>
                        <h2>Edit Employee</h2>
                        <NewForm isEmployee={true} submitHandle={this.submitHandle} name={this.state.employee.name} email={this.state.employee.email} mobile={this.state.employee.mobile} department={this.state.employee.department} />
                        <button onClick = {this.handleBack}>Back</button>
                        {this.state.redirectToReferrer && <Redirect to={`/customers/${this.state.employee._id}`} />}
                        {/* <button><Link to={{pathname:`/employees/${this.state.employee._id}`,state: {employee: this.state.employee} }}>Back</Link></button> */}
                    </div>
                }
            </div>
        )
    }
}

export default EditEmployee