import React from 'react'
import NewForm from '../NewForm'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class EditCustomer extends React.Component{
    constructor(props){
        super(props)
        this.state={
            customer : props.location.state.customer
        }
    }

    submitHandle=(formData)=>{
        const id = this.props.match.params.id
        axios.put(`/customers/${id}`, formData,{
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }else{
                this.props.history.push('/customers')
            }
        })
        .catch(err=>{alert(err)})
    }

    render(){
        return(
            <div>
                {this.state.customer && 
                    <div>
                        <h2>Edit Customer</h2>
                        <NewForm submitHandle={this.submitHandle} name={this.state.customer.name} email={this.state.customer.email} mobile={this.state.customer.mobile}/>
                        <button><Link to= {{pathname: `/customers/${this.state.customer._id}` , state: {customer: this.state.customer}}}>Back</Link></button>
                    </div>
                }
            </div>
        )
    }
}

export default EditCustomer