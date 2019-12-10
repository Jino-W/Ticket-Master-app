import React from 'react'
import TicketMasterForm from '../TicketMasterForm'
import axios from '../../config/axios'
import {startShowTicket} from "../../actions/ticket"
import {startEditTicket} from "../../actions/tickets"
import {connect} from "react-redux"
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
        this.props.dispatch(startEditTicket(id, formData, this.props))

        // axios.put(`/tickets/${id}`, formData,{
        //     headers:{
        //         'x-auth': localStorage.getItem('authToken')
        //     }
        // })
        // .then(response=>{
        //     if(response.data.hasOwnProperty('errors')){
        //         alert(response.data.errors)
        //     }else{
        //         this.props.history.push('/tickets')
        //     }
        // })
        // .catch(err=>{
        //     alert(err)
        // })
    }

    handleBack=()=>{
        this.setState({redirectToReferrer: true})
    }

    componentDidMount(){
        const id = this.props.match.params.id
        this.props.dispatch(startShowTicket(id))
    }

    render(){
        return(
            <>{this.props.ticket.customer &&
                <div className='showDiv'>
                    <Link className='float-right' to={{pathname:`/tickets/${this.props.ticket._id}`}}><i style={{color:'#007bff'}} className="fas fa-arrow-circle-left fa-lg"></i></Link>
                    <h2 className='text-center font-weight-bold'>Edit ticket</h2>
                    <TicketMasterForm isEdit = {true} submitHandle={this.submitHandle} customer={this.props.ticket.customer} ticket={this.props.ticket} department={this.props.ticket.department}/>
                </div>
            }</>
        )
    }
}


const mapStateToProps=(state, props)=>{
    return {
        ticket: state.tickets.find(ticket=> ticket._id == props.match.params.id) || state.ticket
    }
}

export default connect(mapStateToProps)(EditTicket)
