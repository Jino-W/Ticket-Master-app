import React from 'react'
import axios from '../../config/axios'
import {Link, Redirect} from 'react-router-dom'

class List extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            department: '',
            tickets: "",
            employees: "",
            isEdit : false,
            name: "" ,
            redirectToReferrer: false
        }
    }

    handleBack=()=>{
        this.setState({redirectToReferrer:true})
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleDelete=(id)=>{
        const confirm = this.state.tickets.length > 0 || this.state.employees.length > 0 ? window.confirm('This department have associated employees and tickets which will also be deleted. Do you want to proceed?') : window.confirm('Do you want to delete this department details?')
        if(confirm){
            axios.delete(`/departments/${id}`,{
                headers:{
                    'x-auth': localStorage.getItem('authToken')
                }
            })
                .then(response=>{
                    alert(response.data)
                    // this.props.history.push('/departments')
                    window.location.reload()
                    //this.componentDidMount()
                    // this.setState((prevState)=>{
                    //     const newState = prevState.departments.filter(department=>department._id !== response.data._id)
                    //     console.log(newState)
                    //     return {departments: newState}
                    // })
                })
                .catch(err=>{
                    console.log(err)
                })
        } 
    }

    submitHandle=()=>{
        const id = this.props.match.params.id        
        axios.put(`/departments/${id}`, {name: this.state.name}, {
            headers:{
                "x-auth": localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log(response.data)
            this.setState({isEdit:false, department:response.data.department})
        })
        .catch(err=>{
            alert(err)
        })
    }

    editHandle=()=>{
        this.setState(prevState=>{
            return {isEdit:!prevState.isEdit}
        })
    }
    

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/departments/${id}` ,{
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                console.log("response", response.data)
                const department = response.data.department
                const tickets = response.data.tickets
                const employees = response.data.employees
                this.setState({department,tickets,employees, name:department.name})
            })
            .catch(err=>{
                console.log(err)
                
            })
    }

    
    render(){
        console.log("department",this.state.department)
        return(
            <div>
                <h2>Department</h2>
                {this.state.isEdit ?
                    (<div>
                        <input type= "text" name="name" value={this.state.name} placeholder="Enter category name" onChange={this.handleChange} />&nbsp;
                        <button onClick={this.submitHandle} >click ok!</button>
                    </div>):(
                    <p><strong>Name: </strong>{this.state.name}</p>)
                }
                
                <p><strong>Employees: </strong> {this.state.employees.length > 0  ? <span>{this.state.employees.map(employee=>{return <li key={employee._id}>{employee.name}</li>})}</span> : "--"}</p>

                <p><strong>Tickets: </strong> {this.state.tickets.length > 0  ? <span>{this.state.tickets.map(ticket=>{return <li key={ticket._id}>{ticket.title} - {ticket.message}</li>})}</span> : "--"}</p>
                
                <Link to='/departments' onClick={()=>{this.handleDelete(this.state.department._id)}}>Delete</Link> |
                {this.state.isEdit ? <Link to='#' onClick={this.editHandle}>Cancel</Link> : <Link to='#' onClick={this.editHandle}>Edit</Link>}

                <br/><br/>
                
                <button onClick = {this.handleBack}>Back</button>
                {this.state.redirectToReferrer && <Redirect to="/departments" />}

                <br/><br/>
            </div>
        )
    }
}

export default List