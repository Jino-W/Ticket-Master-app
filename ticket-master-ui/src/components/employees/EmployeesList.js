import React from "react"
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class EmployeesList extends React.Component{
    constructor(){
        super()
        this.state ={
            employees : []
        }
    }

    componentDidMount(){
        console.log("getting-comp")
        axios.get("/employees",{
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log("get",response.data)
            const employees = response.data
            this.setState({employees})
        })
        .catch(err=>{
            console.log("err",err)
        })
    }

    render(){
        console.log(this.state.employees)
        return(
            <div>
                <h2>Listing Employees {this.state.employees.length}</h2>
                <table border='1px' cellPadding="7px">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.employees.map(employee=>{
                                return(
                                    <tr key={employee._id}>
                                        <td>{employee._id}</td>
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

                <button><Link to="/employees/new">Add Employee</Link></button>
            </div>
        )
    }
}

export default EmployeesList