import axios from '../config/axios'

export const getCustomers =(customers)=>{
    return {
        type: "GET_CUSTOMERS",
        payload: customers
    }
}


export const deleteCustomer =(id)=>{
    return {
        type: "DELETE_CUSTOMER",
        payload: {
            customer_id : id
        }
    }
}


export const editCustomer=(id, formData)=>{
    return {
        type: "EDIT_CUSTOMER",
        payload: {
            customer_id : id,
            formData
        }
    }
}


export const createCustomer=(formData)=>{
    return {
        type: "CREATE_CUSTOMER",
        payload: {
            formData
        }
    }
}



export const startGetCustomers =()=>{
    return (dispatch)=>{
        axios.get(`/customers`, {
            headers:{
                "x-auth" : localStorage.getItem("authToken")
            }
        })
        .then(response=>{
            const customers = response.data
            dispatch(getCustomers(customers))
        })
        .catch(err=>{
            alert(err)
        })
    }
}


export const startDeleteCustomer =(id, props)=>{
    return (dispatch)=>{
        axios.delete(`/customers/${id}`,{
                headers:{
                    "x-auth" : localStorage.getItem('authToken')
                }
            })
            .then(response=>{
                dispatch(deleteCustomer(id))
                props.history.push('/customers')
            })
            .catch(err=>{
                alert(err)
            })
    }
}


export const startEditCustomer = (id, formData, props) => {
    return (dispatch)=>{
        axios.put(`/customers/${id}`, formData, {
            headers:{
                "x-auth" : localStorage.getItem("authToken")
            }
        })
        .then(response=>{
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }
            else{
                dispatch(editCustomer(id, response.data))
                props.history.push(`/customers/${props.match.params.id}`)
            }
        })
        .catch(err=>{
            alert(err)
        })
    }
}


export const startCreateCustomer= (formData, props)=>{
    return (dispatch)=>{
        axios.post(`/customers`, formData, {
            headers:{
                "x-auth" : localStorage.getItem("authToken")
            }
        })
            .then(response=>{
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.message)
                }
                else{
                    dispatch(createCustomer(response.data))
                    props.history.push('/customers')
                }
            })
            .catch(err=>{
                alert(err)
            })
    }
}
