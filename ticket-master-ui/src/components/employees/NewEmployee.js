import React from 'react'
import NewForm from '../NewForm'
import {Link} from 'react-router-dom'
import {startCreateEmployee} from "../../actions/employees"
import {connect} from "react-redux"

class NewEmployee extends React.Component{

    submitHandle=(formData)=>{
        this.props.dispatch(startCreateEmployee(formData, this.props))

        // axios.post("/Employees", formData,{
        //     headers:{
        //         'x-auth': localStorage.getItem('authToken')
        //     }
        // })
        // .then(response=>{
        //     this.setState({employee:formData})
        //     if(response.data.hasOwnProperty('errors')){
        //         alert(response.data.message)
        //     }else{
        //         this.props.history.push('/Employees')
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
                <Link className = 'float-right' style={{color:'white',textDecoration:'none'}} to="/employees" ><i style={{color:'#007bff'}} className="fas fa-arrow-circle-left fa-lg"></i></Link>
                <h2 className='text-center font-weight-bold'>Add Employee</h2>
                <NewForm isEmployee={true} submitHandle={this.submitHandle}/>
            </div>
        )
    }
}


export default connect()(NewEmployee)
