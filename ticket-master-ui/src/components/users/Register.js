import React from "react"
import axios from '../../config/axios'

class Register extends React.Component{
    constructor(){
        super()
        this.state={
            username:'',
            email:'',
            mobile:'',
            password:''
        }
    }


    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const formData = {
            username:this.state.username,
            email:this.state.email,
            mobile:this.state.mobile,
            password:this.state.password
        }

        console.log(formData)

        this.setState({
            username:'',
            email:'',
            mobile:'',
            password:''
        })
        axios.post('/users/register', formData)
            .then(response=>{
                console.log(response.data)
                this.props.history.push('/')
            })
            .catch(err=>{
                alert(err)
            })

    }


    render(){
        return(
            <div>
                <h2>Register Page</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Name: &nbsp;
                        <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    </label><br/><br/>
                    <label>Email: &nbsp;
                        <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                    </label><br/><br/>
                    <label>Mobile :&nbsp;
                        <input type="text" name="mobile" value={this.state.mobile} onChange={this.handleChange} />
                    </label><br/><br/>
                    <label>Password :&nbsp;
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </label><br/><br/>
                    <input type="submit" />
                </form>
            </div>
        )
    }
}



export default Register;