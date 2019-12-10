import React from 'react'
import {Redirect, Link} from 'react-router-dom'
import {startShowCustomer} from "../../actions/customer"
import {connect} from "react-redux"
import {startDeleteCustomer} from "../../actions/customers"

class CustomerInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            customer : "",   
            tickets : [],                    
            redirectToReferrer: false
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        this.props.dispatch(startShowCustomer(id))

        // axios.get(`/customers/${id}`,{
        //     headers:{
        //         'x-auth': localStorage.getItem('authToken')
        //     }
        // })
        // .then(response=>{
        //     const customer = response.data.customer
        //     const tickets = response.data.tickets

        //     this.setState({customer, tickets})
        // })
        // .catch(err=>{
        //     alert(err)
        // })
    }

    deleteHandle=(id)=>{
        this.props.dispatch(startDeleteCustomer(id, this.props))

        // const confirm = this.state.tickets.length > 0 ? window.confirm('This customer have associated tickets which will also be deleted. Do you want to proceed?') : window.confirm('Do you want to delete this customer details?')
        //     if(confirm){
        //         axios.delete(`/customers/${id}`,{
        //             headers:{'x-auth': localStorage.getItem('authToken')}
        //         })
        //             .then(response=>{
        //                 alert(response.data)
        //                 this.props.history.push('/customers')
        //                 // window.location.reload()
        //             })
        //             .catch(err=>{
        //                 alert(err)
        //             })
        //     }    
    }

    handleBack=()=>{
        this.setState({redirectToReferrer:true})
    }
    
    render(){
        console.log("pc", this.props.customer)
        return(
            <div>{this.props.customer &&
                <div className='showDiv'>
                    <h2 className='text-center font-weight-bold'>Customer Information</h2>
                    <ul className='list-group list-group-flush'>
                        <li className='list-group-item'><span className='listHeading'>Id:</span> <span className='listContent'>{this.props.customer._id}</span></li>
                        <li className='list-group-item'><span className='listHeading'>Name:</span> <span className='listContent'>{this.props.customer.name}</span></li>
                        <li className='list-group-item'><span className='listHeading'>Email:</span> <span className='listContent'>{this.props.customer.email}</span></li>
                        <li className='list-group-item'><span className='listHeading'>Mobile:</span> <span className='listContent'>{this.props.customer.mobile}</span></li>
                    </ul>
                    {/* <p><strong>Tickets:</strong> {this.state.tickets.length > 0  ? <span>{this.state.tickets.map(ticket=>{return <li key={ticket._id}>{ticket.title} - {ticket.message}</li>})}</span> : "--"}</p> */}

                    <div className="btn-group btn-group-sm m-3 float-right" role="group">
                        <button type="button" className="btn btn-secondary">
                            <Link style={{textDecoration:'none',color:'white'}} to={`/customers`} onClick={()=>{this.deleteHandle(this.props.customer._id)}}>Delete</Link>
                        </button>
                        <button type="button" className="btn btn-secondary">
                            <Link style={{textDecoration:'none',color:'white'}} to= {{pathname: `/customers/1/${this.props.customer._id}` , state: {customer: this.props.customer}}}>Edit</Link>
                        </button>
                        <button type="button" className="btn btn-secondary" onClick = {this.handleBack}>Back</button>
                    </div>
                    {this.state.redirectToReferrer && <Redirect to="/customers" />}
                </div>
            }</div>
        )
    }
}


const mapStateToProps=(state, props)=>{
    return {
        customer: state.customers.find(customer=> customer._id == props.match.params.id) || state.customer
    }
}

export default connect(mapStateToProps)(CustomerInfo)