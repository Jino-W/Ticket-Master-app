import React from "react"
import {Link} from "react-router-dom"
import Charts from "./Charts"
import {connect} from "react-redux"
import {startGetTickets, filterTickets, filterTicketsByCode, startEditTicket} from "../../actions/tickets"
import {startGetDepartments} from "../../actions/departments"
import {startGetTicketsDupl} from "../../actions/ticketsDupl"

class TicketMaster extends React.Component{
    constructor(){
        super()
        this.state ={
            isEdit: false,
            code: ""
        }
    }

    componentDidMount(){
        this.props.dispatch(startGetTickets())
        this.props.dispatch(startGetTicketsDupl())
        this.props.dispatch(startGetDepartments())
    }

    statusChange=(ticket)=>{
        const data = {isResolved: !ticket.isResolved}
        this.props.dispatch(startEditTicket(ticket._id, data, this.props))
    }

    displayHandle=(action)=>{
        this.props.dispatch(filterTickets(action, this.props.ticketsDupl))
    }

    handleChange=(e)=>{
        if(e.target.name == "code"){
            const action = "CODE"
            this.props.dispatch(filterTicketsByCode(action, e.target.value, this.props.ticketsDupl))
        }
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        return(
            <div className="row">
            <div className="container">
                <div className="row mt-5">
                    <h2 className="ml-1 col-md-3">Listing Tickets {this.props.tickets.length}</h2>

                    <div className="btn-group btn-sm float-left" >
                        <button className="btn btn-primary" ><a style={{color:"white", textDecoration:"none"}} href="/tickets/new" >Add +</a></button>
                    </div>

                    <form  className="col-md-3 offset-md-2" onSubmit = {this.handleSubmit}>
                        <input className="form-control mt-1" type="text" value={this.state.code} placeholder="&#8981; Search ticket by code..." name="code" onChange={this.handleChange}></input>
                    </form>

                    <div className="btn-group btn-sm justify-content-end" role="group">
                        <button className={`btn btn-secondary ${this.props.tickets.length === this.props.ticketsDupl.length && "active"}`} onClick = {()=>{ this.displayHandle("ALL")}}>All</button>
                        <button className="btn btn-secondary" onClick = {()=>{ this.displayHandle("HIGH")}}>High</button>
                        <button className="btn btn-secondary" onClick = {()=>{ this.displayHandle("MEDIUM")}}>Medium</button>
                        <button className="btn btn-secondary" onClick = {()=>{ this.displayHandle("LOW")}}>Low</button>
                    </div>

                </div>
                <div className="row mt-2">{this.props.tickets.length > 0 ?
                    (<table className="table">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Priority</th>
                                <th>Message</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.props.tickets.map(ticket=>{
                                    return(
                                        <tr key={ticket._id}>
                                            <td>{ticket.code}</td>
                                            <td>{ticket.customer.name}</td>
                                            <td>{ticket.department.name}</td>
                                            <td>{ticket.priority}</td>
                                            <td>{ticket.message}</td>
                                            <td><div><input type="checkbox" name="status" checked={ticket.isResolved} onChange={()=>{
                                                this.statusChange(ticket)
                                            }}/></div></td>
                                            <td>
                                                <Link to={{pathname:`/tickets/${ticket._id}`, state: {ticket: ticket} }}>Show</Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>  ):(<h4>No rows to Display</h4>)}
                </div>
                
                <div className="col-md-12">
                    {this.props.tickets.length > 0 && <progress className="mt-2 progress-bar" style={{width:'100%'}} role="progressbar" value={this.props.tickets.filter(item=>item.isResolved).length} max={this.props.tickets.length}></progress>}
                </div>

                <div>
                    {this.props.tickets.length > 0 && this.props.departments[0] && <Charts key={Math.random()} tickets = {this.props.tickets} departments = {this.props.departments} />}
                </div>
            </div>
            </div>

        )
    }
}


const mapStateToProps=(state)=>{
    return {
        tickets: state.tickets,
        ticketsDupl: state.ticketsDupl,
        departments: state.departments
    }
}

export default connect(mapStateToProps)(TicketMaster)