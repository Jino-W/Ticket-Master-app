const departmentsInitialState = []

const departmentsReducer = (state = departmentsInitialState, action)=>{
    switch (action.type) {
        case "GET_DEPARTMENTS":{
            return [...action.payload]
        }
        case "DELETE_DEPARTMENT":{
            return [...state].filter(department => department._id !== action.payload.department_id)
        }
        case "EDIT_DEPARTMENT":{
            return [...state].map(department=> {
                if(action.payload.department_id == department._id){
                    return Object.assign(department, action.payload.formData)
                }
                return department
            })
        }
        case "CREATE_DEPARTMENT":{
            return [...state, action.payload.formData]
        }
        default:{
            return [...state]
        }
    }
}

export default departmentsReducer