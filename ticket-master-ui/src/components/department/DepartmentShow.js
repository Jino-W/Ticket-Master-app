import React from 'react'
import {Link} from 'react-router-dom'
import {startShowDepartment} from "../../actions/department"
import {startEditDepartment, startDeleteDepartment} from "../../actions/departments"
import {connect} from "react-redux"

class List extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            department: '',
            tickets: "",
            employees: "",
            isEdit : false,
            name: "" ,
        }
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleDelete=(id)=>{
        this.props.dispatch(startDeleteDepartment(id, this.props))

        // const confirm = this.state.tickets.length > 0 || this.state.employees.length > 0 ? window.confirm('This department have associated employees and tickets which will also be deleted. Do you want to proceed?') : window.confirm('Do you want to delete this department details?')
        // if(confirm){
        //     axios.delete(`/departments/${id}`,{
        //         headers:{
        //             'x-auth': localStorage.getItem('authToken')
        //         }
        //     })
        //         .then(response=>{
        //             alert(response.data)
        //             // this.props.history.push('/departments')
        //             window.location.reload()
        //             //this.componentDidMount()
        //             // this.setState((prevState)=>{
        //             //     const newState = prevState.departments.filter(department=>department._id !== response.data._id)
        //             //     return {departments: newState}
        //             // })
        //         })
        //         .catch(err=>{
        //             alert(err)
        //         })
        // } 
    }

    submitHandle=()=>{
        const id = this.props.match.params.id 
        this.props.dispatch(startEditDepartment(id, {name: this.state.name}, this.props))
        this.setState(prevState=>{
            return {isEdit:!prevState.isEdit}
        })

        // axios.put(`/departments/${id}`, {name: this.state.name}, {
        //     headers:{
        //         "x-auth": localStorage.getItem('authToken')
        //     }
        // })
        // .then(response=>{
        //     this.setState({isEdit:false, department:response.data.department})
        // })
        // .catch(err=>{
        //     alert(err)
        // })
    }

    editHandle=()=>{
        this.setState(prevState=>{
            return {isEdit:!prevState.isEdit}
        })
    }
    

    componentDidMount(){
        const id = this.props.match.params.id
        this.props.dispatch(startShowDepartment(id))

        // axios.get(`/departments/${id}` ,{
        //     headers:{
        //         'x-auth': localStorage.getItem('authToken')
        //     }
        // })
        //     .then(response=>{
        //         const department = response.data.department
        //         const tickets = response.data.tickets
        //         const employees = response.data.employees
        //         this.setState({department,tickets,employees, name:department.name})
        //     })
        //     .catch(err=>{
        //         alert(err)
        //     })
    }

    

    componentDidUpdate(prevProps){
        if(prevProps.department.name!==this.props.department.name){
            this.setState({isEdit:false})
        }
    }

    
    render(){
        return(
            <>{this.props.department &&
                <div className='showDiv'>
                    {this.state.isEdit && <Link className='float-right' to={`/departments/${this.props.match.params.id}`} onClick={()=>{this.setState({isEdit: false})}}><i style={{color:'#007bff'}} className="fas fa-arrow-circle-left fa-lg"></i></Link>}
                    <h2 className='text-center font-weight-bold'>Department Information</h2>
                    {this.state.isEdit ?
                        (<div>
                            <input type= "text" className="form-control" name="name" value={this.state.name || this.props.department.name} placeholder="Enter category name" onChange={this.handleChange} />&nbsp;
                            <button className="btn btn-primary mt-2" onClick={this.submitHandle} >click ok!</button>
                        </div>):(<div>
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'><span className='listHeading'>Id:</span> <span className='listContent'>{this.props.department._id}</span></li>
                                <li className='list-group-item'><span className='listHeading'>Name:</span> <span className='listContent'>{this.props.department.name}</span></li>
                            </ul>
                            <div className="btn-group btn-group-sm m-3 float-right" role="group">
                                <button type="button" className="btn btn-secondary">
                                    <Link style={{textDecoration:'none',color:'white'}} to={`/departments`} onClick={()=>{this.handleDelete(this.props.department._id)}}>Delete</Link>
                                </button>
                                <button type="button" className="btn btn-secondary">
                                    {this.state.isEdit ? <Link style={{textDecoration:'none',color:'white'}} to='#' onClick={this.editHandle}>Cancel</Link> : <Link style={{textDecoration:'none',color:'white'}} to='#' onClick={this.editHandle}>Edit</Link>}
                                </button>
                                <button type="button" className="btn btn-secondary"><Link style={{textDecoration:'none',color:'white'}} to={`/departments`} >Back</Link></button>
                            </div>
                        </div>)}
                </div>
            }</>
        )
    }
}



const mapStateToProps=(state, props)=>{
    return {
        department: state.departments.find(department=> department._id == props.match.params.id) || state.department
    }
}

export default connect(mapStateToProps)(List)