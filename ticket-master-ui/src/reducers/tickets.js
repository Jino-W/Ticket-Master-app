const ticketsInitialState = []

const ticketsReducer = (state = ticketsInitialState, action)=>{
    switch (action.type) {
        case "GET_TICKETS":{
            return [...action.payload]
        }
        case "DELETE_TICKET":{
            return [...state].filter(ticket => ticket._id !== action.payload.ticket_id)
        }
        case "EDIT_TICKET":{
            return [...state].map(ticket=> {
                if(action.payload.ticket_id == ticket._id){
                    return Object.assign(ticket, action.payload.formData)
                }
                return ticket
            })
        }
        case "CREATE_TICKET":{
            return [...state, action.payload.formData]
        }
        case "ALL":{
            return [...action.payload]
        }
        case "HIGH":{
            return [...action.payload.filter(item=>item.priority=== "High")]
        }
        case "MEDIUM":{
            return [...action.payload.filter(item=>item.priority=== "Medium")]
        }
        case "LOW":{
            return [...action.payload.filter(item=>item.priority=== "Low")]
        }
        case "CODE":{
            return [...action.payload.ticketsDupl.filter(item => item.code.toLowerCase().includes(action.payload.code.toLowerCase()))]
        }
        default:{
            return [...state]
        }
    }
}

export default ticketsReducer