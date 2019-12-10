const departmentInititalState={}

const departmentReducer=(state=departmentInititalState,action)=>{
    switch(action.type){
        case "SHOW_DEPARTMENT":{
            return {...action.payload}
        }
        default:{
            return {...state}
        }
    }
}

export default departmentReducer