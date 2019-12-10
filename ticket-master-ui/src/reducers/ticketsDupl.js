const ticketsDuplInitialState=[]

const ticketsDuplReducer = (state= ticketsDuplInitialState, action)=>{
    switch (action.type) {
        case "GET_TICKETS":{
            return [...action.payload]
        }
        default:{
            return [...state]
        }
    }
}

export default ticketsDuplReducer