import React from 'react'
import axios from '../../config/axios'
import {Redirect, Link} from 'react-router-dom'

class CustomerInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            customer : "",   
            tickets : [],                           //props.location.state.customer,
            redirectToReferrer: false
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/customers/${id}`,{
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log("customer",response.data)
            const customer = response.data.customer
            const tickets = response.data.tickets

            this.setState({customer, tickets})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    deleteHandle=(id)=>{
        const confirm = this.state.tickets.length > 0 ? window.confirm('This customer have associated tickets which will also be deleted. Do you want to proceed?') : window.confirm('Do you want to delete this customer details?')
            if(confirm){
                axios.delete(`/customers/${id}`,{
                    headers:{'x-auth': localStorage.getItem('authToken')}
                })
                    .then(response=>{
                        alert(response.data)
                        this.props.history.push('/customers')
                        // window.location.reload()
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            }    
    }

    handleBack=()=>{
        this.setState({redirectToReferrer:true})
    }
    
    render(){
        const {_id,name,email,mobile} = this.state.customer
        return(
            <div>
                <h2>Customer Information</h2>
                <p><strong>Id:</strong> {_id}</p>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Mobile:</strong> {mobile}</p>
                <p><strong>Tickets:</strong> {this.state.tickets.length > 0  ? <span>{this.state.tickets.map(ticket=>{return <li key={ticket._id}>{ticket.title} - {ticket.message}</li>})}</span> : "--"}</p>

                <div>
                    <Link to={`/customers`} onClick={()=>{this.deleteHandle(_id)}}>Delete</Link> | 
                    <Link to= {{pathname: `/customers/1/${_id}` , state: {customer: this.state.customer}}}>Edit</Link>
                </div>

                <button onClick = {this.handleBack}>Back</button>
            
                {this.state.redirectToReferrer && <Redirect to="/customers" />}
        
            </div>
        )
    }
}


export default CustomerInfo