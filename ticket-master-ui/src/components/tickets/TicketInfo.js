import React from 'react'
import axios from '../../config/axios'
import {Link,Redirect} from 'react-router-dom'

class TicketInfo extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            ticket : "",
            department: "",
            customer: "",
            redirectToReferrer: false
        }
    }

    handleDelete=(id)=>{
        axios.delete(`/tickets/${id}`,{
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log("response",response)
            this.props.history.push('/tickets')
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
        axios.get(`/tickets/${id}`,{
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log(response.data)
            const ticket = response.data.ticket
            this.setState({ticket, department: ticket.department.name, customer: ticket.customer.name})
        })
        .catch(err=>{
            console.log(err)
            alert(err)
        })
    }
    
    render(){
        const {_id, code, priority, message, isResolved} = this.state.ticket
        return(
            <div>
                <h2>Ticket Information</h2>
                <p><strong>Id:</strong> {_id}</p>
                <p><strong>Code:</strong> {code}</p>
                <p><strong>Name:</strong> {this.state.customer}</p>
                <p><strong>Department:</strong> {this.state.department}</p>
                <p><strong>Priority:</strong> {priority}</p>
                <p><strong>Message:</strong> {message}</p>
                <p><strong>Status:</strong> {isResolved ? "Completed" : "Pending"}</p>

                <div>
                    <Link to={`/tickets`} onClick={()=>{this.handleDelete(_id)}}>Delete</Link> | 
                    <Link to={{ pathname:`/tickets/1/${_id}`, state: {ticket : this.state.ticket, department: this.state.department, customer:this.state.customer} }}>Edit</Link>
                </div>

                <button onClick = {this.handleBack}>Back</button>
                {this.state.redirectToReferrer && <Redirect to="/tickets" />}
        
            </div>
        )
    }
}


export default TicketInfo