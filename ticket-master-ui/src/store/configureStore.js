import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from 'redux-thunk'
import ticketsReducer from '../reducers/tickets'
import ticketsDuplReducer from '../reducers/ticketsDupl'
import ticketReducer from '../reducers/ticket'
import customersReducer from '../reducers/customers'
import customerReducer from '../reducers/customer'
import departmentsReducer from '../reducers/departments'
import departmentReducer from '../reducers/department'
import employeesReducer from '../reducers/employees'
import employeeReducer from '../reducers/employee'
import userReducer from "../reducers/user"

const configureStore = () =>{
    const store = createStore(combineReducers({
        tickets: ticketsReducer,
        ticketsDupl: ticketsDuplReducer,
        ticket: ticketReducer,
        customers: customersReducer,
        customer: customerReducer,
        departments: departmentsReducer,
        department: departmentReducer,
        employees: employeesReducer,
        employee: employeeReducer,
        user: userReducer
    }), applyMiddleware(thunk))
    return store
}

export default configureStore