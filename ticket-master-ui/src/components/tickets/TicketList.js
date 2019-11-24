import React from "react"
import axios from '../../config/axios'
import {Link} from "react-router-dom"
import Charts from "./Charts"


class TicketMaster extends React.Component{
    constructor(){
        super()
        this.state ={
            isEdit: false,
            ticketsDupl:[],
            tickets : [],
            departments:[],
            display: [],
            code: ""
        }
    }

    componentDidMount(){
        const headerData = {
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        }
        let URL1 = "/tickets"
        let URL2 = "/departments"

        const promise1 = axios.get(URL1, headerData);
        const promise2 = axios.get(URL2, headerData);

        Promise.all([promise1, promise2]).then((values)=> {
            console.log(values, values[0].data)
            const tickets = values[0].data
            const departments= values[1].data

            this.setState({tickets, ticketsDupl: [].concat(tickets), departments})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    statusChange=(ticket)=>{
        const data = {isResolved: !ticket.isResolved}
        axios.put(`/tickets/${ticket._id}`,data,{
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            this.setState(prevState=>{
                const item = prevState.tickets.find(tick=>{
                    return tick._id === response.data._id
                })
                item.isResolved = !item.isResolved
                return {tickets: prevState.tickets}
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

    displayHandle=(action)=>{
        if(action === "All"){
            this.setState({tickets:this.state.ticketsDupl})
        }else{
            this.setState({tickets:this.state.ticketsDupl.filter(item=>item.priority===action)})
        }
    }

    handleChange=(e)=>{
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        this.setState(prevState=>{
            this.setState({tickets: prevState.ticketsDupl.filter(item=>item.code===prevState.code)})
        })  
    }

    render(){
        return(
            <div>
                <button onClick = {()=>{ this.displayHandle("All")}}>All</button>
                <button onClick = {()=>{ this.displayHandle("High")}}>High</button>
                <button onClick = {()=>{ this.displayHandle("Medium")}}>Medium</button>
                <button onClick = {()=>{ this.displayHandle("Low")}}>Low</button>

                <form onSubmit = {this.handleSubmit}>
                    <input type="text" value={this.state.code} placeholder="&#128269; Search ticket by code.." name="code" onChange={this.handleChange}></input>
                </form>

                <h2>Listing Tickets {this.state.tickets.length}</h2>
                {this.state.tickets.length > 0 ?
                    (<table border='1px' cellPadding="7px">
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
                                this.state.tickets.map(ticket=>{
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

                <div>
                    <button><Link to="/tickets/new" >Add Tickets</Link></button>
                </div>

                <div>
                    <label>Status</label>
                    {this.state.tickets.length > 0 && <progress value={this.state.tickets.filter(item=>item.isResolved).length} max={this.state.tickets.length}></progress>}
                </div>

                <div>
                    {this.state.tickets.length > 0 && this.state.departments[0] && <Charts key={Math.random()} tickets = {this.state.tickets} departments = {this.state.departments} />}
                </div>
                
            </div>

        )
    }
}

export default TicketMaster