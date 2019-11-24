import React from "react"
import axios from '../../config/axios'


class Login extends React.Component{
    constructor(){
        super()
        this.state={
            email:'',
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
            email:this.state.email,
            password:this.state.password
        }

        console.log(formData)

        this.setState({
            email:'',
            password:''
        })

        axios.post('/users/login', formData)
            .then(response=>{
                console.log(response.data)
                localStorage.setItem('authToken',response.data.token)
                this.props.history.push('/')
                window.location.reload()
            })
            .catch(err=>{
                alert(err)
            })
    }

    render(){
        return(
            <div>
                <h2>Login Page</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Email: &nbsp;
                        <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
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



export default Login;