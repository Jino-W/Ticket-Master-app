import React from 'react'
import {NavLink} from "react-router-dom"
import axios from "../../config/axios"
import "../../bootstrap.css"

function NavBar() {
    function handleLogout(){
      axios.delete('/users/logout', {
          headers:{
              "x-auth" : localStorage.getItem("authToken")
          }
      })
          .then(response=>{
              console.log(response.data)
              localStorage.removeItem("authToken")
              window.location.href = "/"  
              window.location.reload()
          })
          .catch(err=>{
              alert(err)
          })
    }

return (
    <div className='sticky-top'>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{backgroundColor:"#FFFFFF", borderBottom:"solid 1px white"}}>
            <a className="navbar-brand" href={null} style={{color:"white"}}><i className="fa fa-book mr-2" aria-hidden="true"></i><b>Tickect Master</b></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <ul className="navbar-nav">
                <li className="nav-item" >
                    <NavLink 
                        className="nav-link" 
                        exact 
                        to="/tickets" 
                        activeClassName="active"
                        >Tickets
                    </NavLink>
                </li>
                <li className="nav-item" >
                    <NavLink 
                        className="nav-link" 
                        exact 
                        to="/customers"
                        activeClassName="active"
                        >Customers
                    </NavLink>
                </li>
                <li className="nav-item" >
                    <NavLink 
                        className="nav-link" 
                        exact 
                        to="/departments" 
                        activeClassName="active"
                        >Departments
                    </NavLink>
                </li>
                <li className="nav-item" >
                    <NavLink 
                        className="nav-link" 
                        exact 
                        to="/employees" 
                        activeClassName="active"
                        >Employees
                    </NavLink>
                </li>
            </ul>
            {localStorage.getItem('authToken') && 
            <button
                className="position-absolute btn btn-sm btn-primary" 
                style={{right:'1vw'}}
                to="# " 
                onClick={handleLogout}>Logout
            </button>}
        </nav>
    </div>
)

}

export default NavBar 