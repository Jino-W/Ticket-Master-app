const employeesInitialState = []

const employeesReducer = (state = employeesInitialState, action)=>{
    switch (action.type) {
        case "GET_EMPLOYEES":{
            return [...action.payload]
        }
        case "DELETE_EMPLOYEE":{
            return [...state].filter(employee => employee._id !== action.payload.employee_id)
        }
        case "EDIT_EMPLOYEE":{
            return [...state].map(employee=> {
                if(action.payload.employee_id == employee._id){
                    return Object.assign(employee, action.payload.formData)
                }
                return employee
            })
        }
        case "CREATE_EMPLOYEE":{
            return [...state, action.payload.formData]
        }
        default:{
            return [...state]
        }
    }
}

export default employeesReducer