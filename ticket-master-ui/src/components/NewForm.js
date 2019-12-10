import React from "react"
import axios from '../config/axios'


class NewForm extends React.Component{
    constructor(props){
        super()
        console.log(props)
        this.state={
            isEmployee : props.isEmployee || false,
            name: props ? props.name : '',
            email: props ? props.email : '',
            mobile: props ? props.mobile : '',
            selectValue: props.department ? props.department.name : "",
            departments : []
        }
    }

    handleChange=(e)=>{
        if(e.target.value !== "-- select department --"){
            this.setState({[e.target.name]: e.target.value})
        }
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const item = this.state.departments.find(dept=>{
            return dept.name === this.state.selectValue
        })
        const formData = this.state.isEmployee ? {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            department : item._id
        } : {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile
        }
        this.props.submitHandle(formData)
    }

    componentDidMount(){
        console.log("authToken",localStorage.getItem('authToken'))
        axios.get("/departments",{
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log(response.data)
            const departments = response.data
            this.setState({departments})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    render(){
        return (
            <div>
                <form>
                    <div className = 'form-group'>
                        <label>Name </label>
                        <input name="name" className="form-control" value={this.state.name} type="text" onChange={this.handleChange} />
                    </div>
                    <div className = 'form-group'>
                        <label>Email </label>
                        <input name="email" className="form-control" value={this.state.email} type="email" onChange={this.handleChange} />
                    </div>
                    <div className = 'form-group'>
                        <label>Mobile </label>
                        <input name="mobile" className="form-control" value={this.state.mobile} type="text" onChange={this.handleChange} />
                    </div>
                    {this.state.isEmployee && 
                        <div className = 'form-group'>
                            <label>Department </label>
                            <select className="form-control" value={this.state.selectValue} name="selectValue" onChange={this.handleChange}>
                                <option name="department" value="-- select department --">-- select department --</option>
                                {this.state.departments.map(department=>{
                                    return (
                                        <option key={department._id} name="department" value = {department.name}>{department.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                    }
                    <div>
                        <input name="submit" className="btn btn-primary" type="submit" onClick = {this.handleSubmit}/>
                    </div>
                </form>
            </div>
            
        )
    }

}

export default NewForm