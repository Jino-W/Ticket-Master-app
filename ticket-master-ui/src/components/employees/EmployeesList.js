import React from "react"
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import {startGetEmployees} from "../../actions/employees"

class EmployeesList extends React.Component{
    constructor(){
        super()
        this.state ={
            employees : []
        }
    }

    componentDidMount(){
        this.props.dispatch(startGetEmployees())
    }

    render(){
        return(
            <div className="row">
            <div className="container">
                <div className="row mt-5">
                    <h2 className="ml-4">Listing Employees {this.props.employees.length}</h2>
                    <div className="btn-group btn-sm float-left" >
                        <button className="btn btn-primary" ><a style={{color:"white", textDecoration:"none"}} href="/employees/new" >Add +</a></button>
                    </div>
                </div>
                <table className="table mt-2">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.props.employees.map(employee=>{
                                return(
                                    <tr key={employee._id}>
                                        <td>{employee.name}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.mobile}</td>
                                        <td>{employee.department && employee.department.name}</td>
                                        <td>
                                            <Link to={{pathname:`/employees/${employee._id}`,state: {employee} }}>Show</Link> 
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

            </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        employees: state.employees
    }
}

export default connect(mapStateToProps)(EmployeesList)