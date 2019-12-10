import React from 'react'
import {Link,Redirect} from 'react-router-dom'
import {startShowEmployee} from "../../actions/employee"
import {startDeleteEmployee} from "../../actions/employees"

import {connect} from "react-redux"

class EmployeeInfo extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            redirectToReferrer: false
        }
    }

    handleDelete=(id)=>{
        this.props.dispatch(startDeleteEmployee(id, this.props))

        // axios.delete(`/employees/${id}`,{
        //     headers:{
        //         'x-auth': localStorage.getItem('authToken')
        //     }
        // })
        //     .then(response=>{
        //         this.props.history.push('/employees')
        //         window.location.reload()
        //     })
        //     .catch(err=>{
        //         alert(err)
        //     })
    }

    handleBack=()=>{
        this.setState({redirectToReferrer: true})
    }
    
    componentDidMount(){
        const id = this.props.match.params.id
        this.props.dispatch(startShowEmployee(id))

        // axios.get(`/employees/${id}`,{
        //     headers:{
        //         'x-auth': localStorage.getItem('authToken')
        //     }
        // })
        // .then(response=>{
        //     const {employee,tickets} = response.data
        //     this.setState({employee, tickets})
        // })
        // .catch(err=>{
        //     alert("err",err)
        // })
    }

    render(){

        return(
            <div>{this.props.employee.department &&
                    <div className='showDiv'>
                        <h2 className='text-center font-weight-bold'>Employee Information</h2>
                        <ul className='list-group list-group-flush'>
                            <li className='list-group-item'><span className='listHeading'>Id:</span> <span className='listContent'>{this.props.employee._id}</span></li>
                            <li className='list-group-item'><span className='listHeading'>Name:</span> <span className='listContent'>{this.props.employee.name}</span></li>
                            <li className='list-group-item'><span className='listHeading'>Email:</span> <span className='listContent'>{this.props.employee.email}</span></li>
                            <li className='list-group-item'><span className='listHeading'>Mobile:</span> <span className='listContent'>{this.props.employee.mobile}</span></li>
                            <li className='list-group-item'><span className='listHeading'>Department:</span> <span className='listContent'>{this.props.employee.department.name}</span></li>
                        </ul>
                        <div className="btn-group btn-group-sm m-3 float-right" role="group">
                            <button type="button" className="btn btn-secondary">
                                <Link style={{textDecoration:'none',color:'white'}} to={`/employees`} onClick={()=>{this.handleDelete(this.props.employee._id)}}>Delete</Link>
                            </button>
                            <button type="button" className="btn btn-secondary">
                                <Link style={{textDecoration:'none',color:'white'}} to= {{pathname: `/employees/1/${this.props.employee._id}` , state: {employee : this.props.employee}}}>Edit</Link>
                            </button>
                            <button type='button' className="btn btn-secondary" onClick = {this.handleBack}>Back</button>
                        </div>
                    </div>
                }
                {this.state.redirectToReferrer && <Redirect to="/employees" />}
        
            </div>
        )
    }
}



const mapStateToProps=(state, props)=>{
    return {
        employee: state.employees.find(employee=> employee._id == props.match.params.id) || state.employee
    }
}

export default connect(mapStateToProps)(EmployeeInfo)