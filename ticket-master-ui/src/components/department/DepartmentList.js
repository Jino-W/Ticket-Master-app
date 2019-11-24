import React from "react"
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class EmployeesList extends React.Component{
    constructor(){
        super()
        this.state ={
            departments : [],
            department: {"name" : ""}
        }
        console.log("constructor")
    }

    handleChange=(e)=>{
        const value = e.target.value
        this.setState(prevState=>{
            prevState.department.name = value
            return {department:prevState.department}
        })
    }

    handleSubmit=(e)=>{
        this.setState(prevState=>{
            const formData = prevState.department
            axios.post(`/departments`,formData,{
                headers:{
                    'x-auth': localStorage.getItem('authToken')
                }
            })
            .then(response=>{
                console.log(response.data)
                //this.componentDidMount()   -> use concat method

                this.setState(prevState=>{
                    prevState.departments.push(response.data)
                    return {departments:prevState.departments,department:{"name" : ""}}
                })
            })
            .catch(err=>{
                console.log(err)
            })
        }) 
    }

    componentDidMount(){
        console.log("componentDidMount")
        console.log("authToken",localStorage.getItem('authToken'))
        axios.get("/departments",{
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log("response",response.data)
            const departments = response.data
            this.setState({departments})
        })
        .catch(err=>{
            console.log(err)
            
        })
    }



    render(){
        console.log("render")
        return(
            <div>
                {this.state.departments && 
                <div>
                    <h2>Listing Departments {this.state.departments.length}</h2>
                    <table border='1px' cellPadding="7px">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.departments.map(department=>{
                                    return(
                                        <tr key={department._id}>
                                            <td>{department._id}</td>
                                            <td>{department.name}</td>
                                            <td><Link to={{pathname:`departments/${department._id}`}}>Show</Link></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                    <input type ="text" value={this.state.department.name} onChange={this.handleChange}/>
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>}
            </div>
        )
    }
}

export default EmployeesList