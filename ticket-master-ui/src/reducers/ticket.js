const ticketInititalState={}

const ticketReducer=(state=ticketInititalState,action)=>{
    switch(action.type){
        case "SHOW_TICKET":{
            return {...action.payload}
        }
        default:{
            return {...state}
        }
    }
}

export default ticketReducer