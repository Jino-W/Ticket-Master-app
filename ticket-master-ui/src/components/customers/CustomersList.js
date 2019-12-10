import React from "react"
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import {startGetCustomers} from "../../actions/customers"
import "../../bootstrap.css"


class CustomersList extends React.Component{
    constructor(){
        super()
        this.state ={
            customers : []
        }
    }

    componentDidMount(){
        this.props.dispatch(startGetCustomers())
    }


    render(){
        return(
            <div className="row">
            <div className="container">
                <div  className="row mt-5">
                    <h2 className="ml-2">Listing Customers {this.props.customers.length}</h2>
                    <div className="btn-group btn-sm float-left" >
                        <button className="btn btn-primary btn-sm" ><a style={{color:"white", textDecoration:"none"}} href="/customers/new" >Add +</a></button>
                    </div>
                </div>
                <div className="row mt-2">{this.props.customers.length>0?
                    (<table className="table">
                        <thead>
                            <tr>{this.state.isgroupDelete && <th>select</th>}
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.props.customers.map(customer=>{
                                    return(
                                        <tr key={customer._id}>
                                            <td>{customer.name}</td>
                                            <td>{customer.email}</td>
                                            <td>{customer.mobile}</td>
                                            <td><Link to ={{pathname:`/customers/${customer._id}`, state:{customer: customer}}}>Show</Link></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>):(<h4>No rows to Display</h4>)
                }</div>
            </div>
            </div>
        )
    }
}


const mapStateToProps=(state)=>{
    return {
        customers: state.customers
    }
}

export default connect(mapStateToProps)(CustomersList)