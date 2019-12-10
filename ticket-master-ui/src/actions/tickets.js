import axios from '../config/axios'

export const getTickets =(tickets)=>{
    return {
        type: "GET_TICKETS",
        payload: tickets
    }
}

export const filterTickets = (action, ticketsDupl)=>{
    return{
        type: action.toUpperCase(),
        payload: ticketsDupl
    }
}

export const filterTicketsByCode = (action, code, ticketsDupl)=>{
    console.log("c1", ticketsDupl, code, action)
    return{
        type: action.toUpperCase(),
        payload: {
            ticketsDupl,
            code
        }
    }
}

export const deleteTicket =(id)=>{
    return {
        type: "DELETE_TICKET",
        payload: {
            ticket_id : id
        }
    }
}


export const editTicket =(id, formData)=>{
    return {
        type: "EDIT_TICKET",
        payload: {
            ticket_id : id,
            formData
        }
    }
}


export const createTicket =(formData)=>{
    return {
        type: "CREATE_TICKET",
        payload: {
            formData
        }
    }
}



export const startGetTickets =()=>{
    return (dispatch)=>{
        axios.get(`/tickets`, {
            headers:{
                "x-auth" : localStorage.getItem("authToken")
            }
        })
        .then(response=>{
            const tickets = response.data
            dispatch(getTickets(tickets))
        })
        .catch(err=>{
            alert(err)
        })
    }
}


export const startDeleteTicket =(id, props)=>{
    return (dispatch)=>{
        axios.delete(`/tickets/${id}`,{
                headers:{
                    "x-auth" : localStorage.getItem('authToken')
                }
            })
            .then(response=>{
                dispatch(deleteTicket(id))
                props.history.push('/tickets')
            })
            .catch(err=>{
                alert(err)
            })
    }
}


export const startEditTicket = (id, formData, props) => {
    return (dispatch)=>{
        axios.put(`/tickets/${id}`, formData, {
            headers:{
                "x-auth" : localStorage.getItem("authToken")
            }
        })
        .then(response=>{
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }
            else{
                dispatch(editTicket(id, response.data))
                props.match.params.id && props.history.push(`/tickets/${props.match.params.id}`)
            }
        })
        .catch(err=>{
            alert(err)
        })
    }
}


export const startCreateTicket = (formData, props)=>{
    return (dispatch)=>{
        axios.post(`/tickets`, formData, {
            headers:{
                "x-auth" : localStorage.getItem("authToken")
            }
        })
            .then(response=>{
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.message)
                }
                else{
                    dispatch(createTicket(response.data))
                    props.history.push(`/tickets`)
                }
            })
            .catch(err=>{
                alert(err)
            })
    }
}
