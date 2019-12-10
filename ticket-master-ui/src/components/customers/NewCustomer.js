import React from 'react'
import NewForm from '../NewForm'
import {startCreateCustomer} from "../../actions/customers"
import {Link} from 'react-router-dom'
import {connect} from "react-redux"


class NewCustomer extends React.Component{
    constructor(){
        super()
        this.state={
            customer: {}
        }
    }

    submitHandle=(formData)=>{
        this.props.dispatch(startCreateCustomer(formData, this.props))

        // axios.post("/customers", formData,{
        //     headers:{
        //         'x-auth': localStorage.getItem('authToken')
        //     }
        // })
        // .then(response=>{
        //     this.setState({customer:formData})
        //     if(response.data.hasOwnProperty('errors')){
        //         alert(response.data.message)
        //     }else{
        //         this.props.history.push('/customers')
        //         //https://stackoverflow.com/questions/44312437/react-router-v4-this-props-history-push-not-working
        //     }
        // })
        // .catch(err=>{
        //     alert(err)
        // })
    }

    render(){
        return(
            <div className='showDiv'>
                <Link className = 'float-right' style={{color:'white',textDecoration:'none'}} to="/customers" ><i style={{color:'#007bff'}} className="fas fa-arrow-circle-left fa-lg"></i></Link>
                <h2 className='text-center font-weight-bold'>Add Customer</h2>
                <NewForm submitHandle={this.submitHandle}/>
            </div>
        )
    }
}

export default connect()(NewCustomer)