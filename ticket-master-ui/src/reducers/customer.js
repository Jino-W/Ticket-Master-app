const customerInititalState={}

const customerReducer=(state=customerInititalState, action)=>{
    switch(action.type){
        case "SHOW_CUSTOMER":{
            return {...action.payload}
        }
        default:{
            return {...state}
        }
    }
}

export default customerReducer