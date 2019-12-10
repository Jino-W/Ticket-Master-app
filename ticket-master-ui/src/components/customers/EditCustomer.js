import React from 'react'
import NewForm from '../NewForm'
import {Link} from 'react-router-dom'
import {startShowCustomer} from "../../actions/customer"
import {startEditCustomer} from "../../actions/customers"
import {connect} from "react-redux"

class EditCustomer extends React.Component{
    // constructor(props){
    //     super(props)
    //     this.state={
    //         customer : props.location.state.customer
    //     }
    // }

    
    componentDidMount(){
        const id = this.props.match.params.id
        this.props.dispatch(startShowCustomer(id))
    }

    submitHandle=(formData)=>{
        const id = this.props.match.params.id
        this.props.dispatch(startEditCustomer(id, formData, this.props))

        // axios.put(`/customers/${id}`, formData,{
        //     headers:{
        //         'x-auth': localStorage.getItem('authToken')
        //     }
        // })
        // .then(response=>{
        //     if(response.data.hasOwnProperty('errors')){
        //         alert(response.data.message)
        //     }else{
        //         this.props.history.push('/customers')
        //     }
        // })
        // .catch(err=>{alert(err)})
    }

    render(){
        console.log("c",this.props.customer)
        return(
            <div>
                {this.props.customer._id && 
                    <div className='showDiv'>
                        <Link className='float-right' to={{pathname:`/customers/${this.props.customer._id}`,state: {customer: this.props.customer} }}><i style={{color:'#007bff'}} className="fas fa-arrow-circle-left fa-lg"></i></Link>
                        <h2 className='text-center font-weight-bold'>Edit Customer</h2>
                        <NewForm submitHandle={this.submitHandle} name={this.props.customer.name} email={this.props.customer.email} mobile={this.props.customer.mobile}/>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps=(state, props)=>{
    return {
        customer: state.customers.find(customer=> customer._id == props.match.params.id) || state.customer
    }
}

export default connect(mapStateToProps)(EditCustomer)