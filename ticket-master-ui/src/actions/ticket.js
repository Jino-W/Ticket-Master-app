import axios from "../config/axios"


export const showTicket=(ticket)=>{
    return {
        type:"SHOW_TICKET",
        payload: ticket
    }
}


export const startShowTicket=(id)=>{
    return (dispatch)=>{
        axios.get(`/tickets/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const ticket=response.data
            dispatch(showTicket(ticket))
        })
        .catch(err=>{
            alert(err)
        })
    }
}


