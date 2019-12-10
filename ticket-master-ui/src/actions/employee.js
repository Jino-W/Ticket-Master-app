import axios from "../config/axios"


export const showEmployee=(employee)=>{
    return {
        type:"SHOW_EMPLOYEE",
        payload: employee
    }
}


export const startShowEmployee=(id)=>{
    return (dispatch)=>{
        axios.get(`/employees/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const {employee,tickets} = response.data
            dispatch(showEmployee(employee))
        })
        .catch(err=>{
            alert(err)
        })
    }
}


