import React from "react"
import {Link} from "react-router-dom"
import {startUserLogin} from '../../actions/user'
import {connect} from 'react-redux'
import "../../bootstrap.css"
import "../../formBoot.css"


const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validPasswordRegex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/i);

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
}

class Login extends React.Component{
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            errors: {
                email: '',
                password: '',
            }
        }
    }

    handleChange=(e)=>{
        e.preventDefault()
        const { name, value } = e.target;
        let errors = this.state.errors;
        switch (name) {
            case 'email': 
              errors.email = validEmailRegex.test(value) ? '': 'Email is not valid!';
              break;
            case 'password': 
              errors.password = value.length < 5 && validPasswordRegex.test(value) ? 'Password must be 5 characters long!': '';
              break;
            default:
              break;
        }

        this.setState({errors, [name]: value}, ()=> {
            console.log(errors)
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const formData = {
            email:this.state.email,
            password:this.state.password
        }
        console.log(formData)

        if (validateForm(this.state.errors)){
            this.props.dispatch(startUserLogin(formData, this.props))
            this.setState({
                email:'',
                password:''
            })
        }else{
            alert('Invalid Form')
        }
    }

    render(){
        return(
            <section id="cover" className="min-vh-100">
            <div id="cover-caption">
            <div className="container">
            <div className="row text-white">
            <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                <h2 className="display-0.5 py-2 text-truncate">Login</h2>
                <div className="px-2">
                <form id="form-style" className="justify-content-center" onSubmit={this.handleSubmit}>
                    <div className="form-group"> 
                        <label  className="sr-only" htmlFor="email" >Email: </label>
                        <input placeholder="jinoesther@gmail.com" id="email" className="form-control" type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label  className="sr-only" htmlFor="pass">Password : </label>
                        <input id="pass" placeholder="Jino@811*" className="form-control" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <div>
                        <Link className="float-left" to='/users/register'><ins>Create new account</ins></Link>
                        <input type="submit" className="btn btn-primary btn-sm float-right" />
                    </div>
                </form>
                </div>
            </div>
            </div>
            </div>
            </div>
            </section>
        )
    }
}


export default connect()(Login)