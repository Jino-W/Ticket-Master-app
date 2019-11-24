import React from 'react';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import axios from './config/axios'
//import './App.css';
import HomePage from './components/common/HomePage'

import Register from "./components/users/Register"
import Login from "./components/users/Login"

import CustomersList from './components/customers/CustomersList'
import CustomerInfo from './components/customers/CustomerInfo'
import EditCustomer from './components/customers/EditCustomer'
import NewCustomer from './components/customers/NewCustomer'

import DepartmentList from './components/department/DepartmentList'
import DepartmentShow from './components/department/DepartmentShow'

import EmployeesList from './components/employees/EmployeesList'
import EmployeeInfo from './components/employees/EmployeeInfo'
import EditEmployee from './components/employees/EditEmployee'
import NewEmployee from './components/employees/NewEmployee'

import TicketList from './components/tickets/TicketList'
import TicketInfo from './components/tickets/TicketInfo'
import EditTicket from './components/tickets/EditTicket'
import NewTicket from './components/tickets/NewTicket'


function App() {
  function handleLogout(){
    axios.delete('/users/logout', {
        headers:{
            "x-auth" : localStorage.getItem("authToken")
        }
    })
    .then(response=>{
        console.log(response.data)
        localStorage.removeItem("authToken")
        window.location.reload()
        window.location.href = "/"   
    })
    .catch(err=>{
        alert(err)
    })
  }
  return (
    <BrowserRouter>
      <div>
        <h2>Contact Manager Application</h2>
        <li><Link to ="/">Home</Link></li> | 
        {localStorage.getItem('authToken') ? 
          (<div>
            <li><Link to ="/customers">Customers</Link></li> | 
            <li><Link to ="/departments">Department</Link></li> | 
            <li><Link to ="/employees">Employees</Link></li> | 
            <li><Link to ="/tickets">Tickets</Link></li> |
            <li><Link to='#' onClick={handleLogout}>Logout</Link></li>
          </div>):(
          <div>
            <li><Link to='/users/register'>Register</Link></li>
            <li><Link to='/users/login'>Login</Link></li>
          </div>)
        }

        <Switch>
          <Route exact path = "/" component ={HomePage} />

          <Route exact path='/users/register' component={Register} />
          <Route exact path='/users/login' component={Login} />

          <Route path = "/customers" component ={CustomersList}   exact={true}/>
          <Route path = "/customers/new" component ={NewCustomer} />
          <Route path = "/customers/1/:id" component = {EditCustomer} exact={true} />
          <Route path = "/customers/:id" component ={CustomerInfo} exact={true} />
          
          <Route exact path = "/departments" component ={DepartmentList} />
          <Route path = "/departments/:id" component ={DepartmentShow} />          

          <Route path = "/employees" component ={EmployeesList} exact={true}/>
          <Route path = "/employees/new" component ={NewEmployee} />
          <Route path = "/employees/1/:id" component = {EditEmployee} />
          <Route path = "/employees/:id" component ={EmployeeInfo} exact={true}/>

          <Route path = "/tickets" component ={TicketList} exact={true} />
          <Route path = "/tickets/new" component ={NewTicket} />
          <Route path = "/tickets/1/:id" component = {EditTicket} />
          <Route path = "/tickets/:id" component ={TicketInfo} exact={true}/>

        </Switch>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
