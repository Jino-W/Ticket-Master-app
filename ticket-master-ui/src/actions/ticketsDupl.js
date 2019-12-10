import axios from '../config/axios'


export const getTicketsDupl =(tickets)=>{
    return {
        type: "GET_TICKETS",
        payload: tickets
    }
}



export const startGetTicketsDupl =()=>{
    return (dispatch)=>{
        axios.get(`/tickets`, {
            headers:{
                "x-auth" : localStorage.getItem("authToken")
            }
        })
        .then(response=>{
            const tickets = response.data
            dispatch(getTicketsDupl(tickets))
        })
        .catch(err=>{
            alert(err)
        })
    }
}
