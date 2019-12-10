import React from "react"
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import {startGetDepartments, startCreateDepartment} from "../../actions/departments"

class EmployeesList extends React.Component{
    constructor(){
        super()
        this.state ={
            department: {"name" : ""}
        }
    }

    handleChange=(e)=>{
        const value = e.target.value
        this.setState(prevState=>{
            prevState.department.name = value
            return {department: prevState.department}
        })
    }

    handleSubmit=(formData)=>{
        this.props.dispatch(startCreateDepartment(this.state.department, this.props))
        this.setState({"name" : ""})

        // this.setState(prevState=>{
        //     const formData = prevState.department
        //     axios.post(`/departments`,formData,{
        //         headers:{
        //             'x-auth': localStorage.getItem('authToken')
        //         }
        //     })
        //     .then(response=>{
        //         this.setState(prevState=>{
        //             prevState.departments.push(response.data)
        //             return {departments:prevState.departments,department:{"name" : ""}}
        //         })
        //     })
        //     .catch(err=>{
        //         alert(err)
        //     })
        // }) 
    }

    componentDidMount(){
        this.props.dispatch(startGetDepartments())
    }


    render(){
        return(
            <div className="row">
            <div className="container">
                {this.props.departments && 
                <div>
                    <div className="row mt-5">
                        <h2 className="col-md-7 mr-5">Listing Departments {this.props.departments.length}</h2>
                        <div className="col-md-4 btn-group btn-sm justify-content-end" >
                            <input className="col-md-9 form-control mr-2" placeholder="Add Department" type ="text" value={this.state.department.name} onChange={this.handleChange}/>
                            <button className="col-md-3 btn btn-primary btn-sm" ><a onClick={this.handleSubmit} style={{color:"white", textDecoration:"none"}} href="# " >Add +</a></button>
                        </div>
                    </div>
                    <div className="row">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.props.departments.map(department=>{
                                        return(
                                            <tr key={department._id}>
                                                <td>{department.name}</td>
                                                <td><Link to={{pathname:`departments/${department._id}`}}>Show</Link></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>}
            </div>
            </div>
        )
    }
}


const mapStateToProps=(state)=>{
    return {
        departments: state.departments
    }
}

export default connect(mapStateToProps)(EmployeesList)