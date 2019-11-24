import React from "react"
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class CustomersList extends React.Component{
    constructor(){
        super()
        this.state ={
            customers : []
        }
    }

    componentDidMount(){
        axios.get("/customers",{
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log(response.data)
            const customers = response.data
            this.setState({customers})
        })
        .catch(err=>{
            console.log(err)
        })
    }


    render(){
        return(
            <div>
                <h2>Listing Customers {this.state.customers.length}</h2>
                {this.state.customers.length>0?
                (<table border='1px' cellPadding="7px">
                    <thead>
                        <tr>{this.state.isgroupDelete && <th>select</th>}
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.customers.map(customer=>{
                                return(
                                    <tr key={customer._id}>
                                        {this.state.isgroupDelete && <td>{ this.state.isAllSelected ? <input type="checkbox" name="status" checked={this.state.isAllSelected} onChange={(e)=>{this.selectHandle(e,customer._id)}}/>:<input type="checkbox" name="status" onChange={(e)=>{this.selectHandle(e,customer._id)}}/>}</td>}
                                        <td>{customer._id}</td>
                                        <td>{customer.name}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.mobile}</td>
                                        <td><Link to ={{pathname:`/customers/${customer._id}`, state:{customer: customer}}}>Show</Link></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>):(<h4>No rows to Display</h4>)}

                <button><Link to="/customers/new">Add Customer</Link></button>
            </div>
        )
    }
}

export default CustomersList