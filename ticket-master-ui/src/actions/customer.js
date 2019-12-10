import axios from "../config/axios"


export const showCustomer=(customer)=>{
    return {
        type:"SHOW_CUSTOMER",
        payload: customer
    }
}


export const startShowCustomer=(id)=>{
    return (dispatch)=>{
        axios.get(`/customers/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const customer=response.data.customer
            dispatch(showCustomer(customer))
        })
        .catch(err=>{
            alert(err)
        })
    }
}


