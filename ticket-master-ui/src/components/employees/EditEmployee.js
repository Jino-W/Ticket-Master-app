import React from 'react'
import NewForm from '../NewForm'
import {startShowEmployee} from "../../actions/employee"
import {startEditEmployee} from "../../actions/employees"
import {connect} from "react-redux"
import {Link} from 'react-router-dom'



class EditEmployee extends React.Component{
    constructor(props){
        super(props)
        this.state={
            employee : props.location.state.employee,
            // redirectToReferrer: false
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        this.props.dispatch(startShowEmployee(id))
    }


    submitHandle=(formData)=>{
        const id = this.props.match.params.id
        this.props.dispatch(startEditEmployee(id, formData, this.props))

        // axios.put(`/employees/${id}`, formData,{
        //     headers:{
        //         'x-auth': localStorage.getItem('authToken')
        //     }
        // })
        // .then(response=>{
        //     if(response.data.hasOwnProperty('errors')){
        //         alert(response.data.message)
        //     }else{
        //         this.props.history.push(`/employees/${id}`)
        //     }
        // })
        // .catch(err=>{
        //     alert(err)
        // })
    }

    // handleBack=()=>{
    //     this.setState({redirectToReferrer: true})
    // }

    render(){
        return(
            <div>
                {this.props.employee && 
                    <div className='showDiv'>
                        <Link className='float-right' to={{pathname:`/employees/${this.state.employee._id}`,state: {employee: this.state.employee} }}><i style={{color:'#007bff'}} className="fas fa-arrow-circle-left fa-lg"></i></Link>
                        <h2 className='text-center font-weight-bold'>Edit Employee</h2>
                        <NewForm isEmployee={true} submitHandle={this.submitHandle} name={this.state.employee.name} email={this.state.employee.email} mobile={this.state.employee.mobile} department={this.state.employee.department}/>
                    </div>
                }
            </div>
        )
    }
}


const mapStateToProps=(state, props)=>{
    return {
        employee: state.employees.find(employee=> employee._id == props.match.params.id) || state.employee
    }
}

export default connect(mapStateToProps)(EditEmployee)