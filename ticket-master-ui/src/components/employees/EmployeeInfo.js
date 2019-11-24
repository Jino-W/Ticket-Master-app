import React from 'react'
import axios from '../../config/axios'
import {Link,Redirect} from 'react-router-dom'

class EmployeeInfo extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            employee : "",
            tickets: "",
            redirectToReferrer: false
        }
    }

    handleDelete=(id)=>{
        axios.delete(`/employees/${id}`,{
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                console.log(response)
                this.props.history.push('/employees')
                window.location.reload()
            })
            .catch(err=>{
                console.log(err)
            })
    }

    handleBack=()=>{
        this.setState({redirectToReferrer: true})
    }
    
    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/employees/${id}`,{
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log("get",response.data)
            const {employee,tickets} = response.data
            this.setState({employee, tickets})
        })
        .catch(err=>{
            console.log("err",err)
        })
    }

    render(){
        return(
            <div>{this.state.employee &&
                    <div>
                        <h2>Employee Information</h2>
                        <p><strong>Id:</strong> {this.state.employee._id}</p>
                        <p><strong>Name:</strong> {this.state.employee.name}</p>
                        <p><strong>Email:</strong> {this.state.employee.email}</p>
                        <p><strong>Mobile:</strong> {this.state.employee.mobile}</p>
                        <p><strong>Department:</strong> {this.state.employee.department.name}</p>
                        <p><strong>Tickets: </strong> {this.state.tickets.length > 0  ? <span>{this.state.tickets.map(ticket=>{return <li key={ticket._id}>{ticket.title} - {ticket.message}</li>})}</span> : "--"}</p>

                        <div>
                            <Link to={`/employees`} onClick={()=>{this.handleDelete(this.state.employee._id)}}>Delete</Link> | 
                            <Link to={{ pathname:`/employees/1/${this.state.employee._id}`, state: {employee : this.state.employee} }}>Edit</Link>
                        </div>
                    </div>
                }

                <button onClick = {this.handleBack}>Back</button>
                {this.state.redirectToReferrer && <Redirect to="/employees" />}
        
            </div>
        )
    }
}


export default EmployeeInfo