const employeeInititalState={}

const employeeReducer=(state=employeeInititalState,action)=>{
    switch(action.type){
        case "SHOW_EMPLOYEE":{
            return {...action.payload}
        }
        default:{
            return {...state}
        }
    }
}

export default employeeReducer