import React from 'react'
import NewForm from '../NewForm'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class NewCustomer extends React.Component{
    constructor(){
        super()
        this.state={
            customer: {}
        }
    }

    submitHandle=(formData)=>{
        axios.post("/customers", formData,{
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log(response.data)
            this.setState({customer:formData})
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }else{
                this.props.history.push('/customers')
                //https://stackoverflow.com/questions/44312437/react-router-v4-this-props-history-push-not-working
            }
        })
        .catch(err=>{
            console.log(err)
            alert(err)
        })
    }

    render(){
        return(
            <div>
                <h2>Add Customer</h2>
                <NewForm submitHandle={this.submitHandle}/>
                <button><Link to={{ pathname:`/customers/${this.state.customer._id}`, state: {customer : this.state.customer} }}>Back</Link></button>
            </div>
        )
    }
}

export default NewCustomer