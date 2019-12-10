import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';

import PrivateRoute from './components/common/PrivateRoute'

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
import NavBar from './components/common/Navbar';


function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <h2>Contact Manager Application</h2>
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
        } */}
        <NavBar />

        <Switch>
          <Route exact path = "/" render ={()=>{
            if(localStorage.getItem('authToken')){
              return <Redirect to='/tickets'/>
            }else{
              return <Redirect to ='/users/login'/>
            }
          }} />

          <Route exact path='/users/register' component={Register} />
          <Route exact path='/users/login' component={Login} />

          <PrivateRoute path = "/tickets" component ={TicketList} exact={true} />
          <PrivateRoute path = "/tickets/new" component ={NewTicket} />
          <PrivateRoute path = "/tickets/1/:id" component = {EditTicket} />
          <PrivateRoute path = "/tickets/:id" component ={TicketInfo} exact={true}/>

          <PrivateRoute path = "/customers" component ={CustomersList}   exact={true}/>
          <PrivateRoute path = "/customers/new" component ={NewCustomer} />
          <PrivateRoute path = "/customers/1/:id" component = {EditCustomer} exact={true} />
          <PrivateRoute path = "/customers/:id" component ={CustomerInfo} exact={true} />
          
          <PrivateRoute exact path = "/departments" component ={DepartmentList} />
          <PrivateRoute exact path = "/departments/:id" component ={DepartmentShow} />          

          <PrivateRoute path = "/employees" component ={EmployeesList} exact={true}/>
          <PrivateRoute path = "/employees/new" component ={NewEmployee} />
          <PrivateRoute path = "/employees/1/:id" component = {EditEmployee} />
          <PrivateRoute path = "/employees/:id" component ={EmployeeInfo} exact={true}/>

        </Switch>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
