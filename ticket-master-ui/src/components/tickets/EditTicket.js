import React from 'react'
import TicketMasterForm from '../TicketMasterForm'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class EditTicket extends React.Component{
    constructor(props){
        super(props)
        this.state={
            ticket : props.location.state.ticket,
            department: props.location.state.department,
            customer: props.location.state.customer,
            redirectToReferrer: false
        }
    }

    submitHandle=(formData)=>{
        const id = this.props.match.params.id
        axios.put(`/tickets/${id}`, formData,{
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log(response.data)
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }else{
                this.props.history.push('/tickets')
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
                    
                <h2>Edit ticket</h2>
                <TicketMasterForm isEdit = {true} submitHandle={this.submitHandle} customer={this.state.customer} ticket={this.state.ticket} department={this.state.department}/>
                <button><Link to={{pathname:`/tickets/${this.state.ticket._id}`}}>Back</Link></button>
            </div>
        )
    }
}

export default EditTicket