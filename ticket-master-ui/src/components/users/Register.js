import React from "react"
import {startUserRegister} from '../../actions/user'
import {connect} from 'react-redux'
import {Link} from "react-router-dom"

const validEmailRegex = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validPasswordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{5,})/i);

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
}

class Register extends React.Component{
    constructor(){
        super()
        this.state={
            username:'',
            email:'',
            mobile:'',
            password:'',
            errors: {
                username: '',
                email: '',
                mobile:'',
                password: '',
            }
        }
    }


    handleChange=(e)=>{
        e.preventDefault()
        const { name, value } = e.target;
        let errors = this.state.errors;
        switch (name) {
            case 'username': 
              errors.username = value.length < 5 ? 'Full Name must be 5 characters long!': '';
              break;
            case 'email': 
              errors.email = validEmailRegex.test(value) ? '': 'Email is not valid!';
              break;
            case 'mobile': 
              errors.mobile = value.length == 10 && Number(value) === +value ? '' : 'Invalid mobile number format';
            case 'password': 
              errors.password = validPasswordRegex.test(value) ?  '' : 'Weak password!';
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
            username:this.state.username,
            email:this.state.email,
            mobile:this.state.mobile,
            password:this.state.password
        }

        console.log(formData)

        if(validateForm(this.state.errors)) {
            console.info('Valid Form')
            this.props.dispatch(startUserRegister(formData,this.props))
            this.setState({
                username:'',
                email:'',
                mobile:'',
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
                <h2 class="display-0.5 py-2 text-truncate">SignUp</h2>
                <div className="px-2">
                <form id="form-style" className="justify-content-center" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label className="sr-only" >Name: </label>
                        <input placeholder="Jino" className="form-control" type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="sr-only" >Email: </label>
                        <input placeholder="jinoesther@gmail.com" className="form-control" type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                    <label className="sr-only" >Mobile : </label>
                        <input placeholder="9087654321" className="form-control" type="text" name="mobile" value={this.state.mobile} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="sr-only" >Password : </label>
                        <input placeholder="Jino@811*" className="form-control" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <div>
                        <Link className="float-left" to='/users/login'><ins>Login account</ins></Link>
                        <input type="submit"  className="btn" className="btn btn-primary btn-sm float-right"/>
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


export default connect()(Register)
