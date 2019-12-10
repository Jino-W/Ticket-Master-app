import React from 'react'
import {Link,Redirect} from 'react-router-dom'
import {startShowTicket} from "../../actions/ticket"
import {startDeleteTicket} from "../../actions/tickets"
import {connect} from "react-redux"


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
        this.props.dispatch(startDeleteTicket(id, this.props))

        // axios.delete(`/tickets/${id}`,{
        //     headers:{
        //         'x-auth': localStorage.getItem('authToken')
        //     }
        // })
        // .then(response=>{
        //     this.props.history.push('/tickets')
        //     window.location.reload()
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
            <div>{this.props.ticket.customer &&
                <div className='showDiv'>
                    <h2 className='text-center font-weight-bold'>Ticket Information</h2>
                    <ul className='list-group list-group-flush'>
                        <li className='list-group-item'><span className='listHeading'>Id:</span> <span className='listContent'>{this.props.ticket._id}</span></li>
                        <li className='list-group-item'><span className='listHeading'>Code:</span> <span className='listContent'>{this.props.ticket.code}</span></li>
                        <li className='list-group-item'><span className='listHeading'>Name:</span> <span className='listContent'>{this.props.ticket.customer.name}</span></li>
                        <li className='list-group-item'><span className='listHeading'>Department:</span> <span className='listContent'>{this.props.ticket.department.name}</span></li>
                        <li className='list-group-item'><span className='listHeading'>Priority:</span> <span className='listContent'>{this.props.ticket.priority}</span></li>
                        <li className='list-group-item'><span className='listHeading'>Message:</span> <span className='listContent'>{this.props.ticket.message}</span></li>
                        <li className='list-group-item'><span className='listHeading'>Status:</span> <span className='listContent'>{this.props.ticket.isResolved ? "Completed" : "Pending"}</span></li>
                    </ul>

                    <div className="btn-group btn-group-sm m-3 float-right" role="group">
                        <button type="button" className="btn btn-secondary">
                            <Link style={{textDecoration:'none',color:'white'}} to={`/tickets`} onClick={()=>{this.handleDelete(this.props.ticket._id)}}>Delete</Link>
                        </button>
                        <button type="button" className="btn btn-secondary">
                            <Link style={{textDecoration:'none',color:'white'}} to= {{pathname: `/tickets/1/${this.props.ticket._id}` , state: {ticket : this.state.ticket, department: this.state.department, customer:this.state.customer}}}>Edit</Link>
                        </button>
                        <button type="button" className="btn btn-secondary" onClick = {this.handleBack}>Back</button>
                    </div>
                    {this.state.redirectToReferrer && <Redirect to="/tickets" />}
                </div>}
            </div>
        )
    }
}



const mapStateToProps=(state, props)=>{
    return {
        ticket: state.tickets.find(ticket=> ticket._id == props.match.params.id) || state.ticket
    }
}

export default connect(mapStateToProps)(TicketInfo)
