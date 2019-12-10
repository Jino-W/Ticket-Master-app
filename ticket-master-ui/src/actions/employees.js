import axios from '../config/axios'

export const getEmployees =(employees)=>{
    return {
        type: "GET_EMPLOYEES",
        payload: employees
    }
}


export const deleteEmployee =(id)=>{
    return {
        type: "DELETE_EMPLOYEE",
        payload: {
            employee_id : id
        }
    }
}


export const editEmployee =(id, formData)=>{
    return {
        type: "EDIT_EMPLOYEE",
        payload: {
            employee_id : id,
            formData
        }
    }
}


export const createEmployee =(formData)=>{
    return {
        type: "CREATE_EMPLOYEE",
        payload: {
            formData
        }
    }
}



export const startGetEmployees =()=>{
    return (dispatch)=>{
        axios.get(`/employees`, {
            headers:{
                "x-auth" : localStorage.getItem("authToken")
            }
        })
        .then(response=>{
            const employees = response.data
            dispatch(getEmployees(employees))
        })
        .catch(err=>{
            alert(err)
        })
    }
}


export const startDeleteEmployee =(id, props)=>{
    return (dispatch)=>{
        axios.delete(`/employees/${id}`,{
                headers:{
                    "x-auth" : localStorage.getItem('authToken')
                }
            })
            .then(response=>{
                dispatch(deleteEmployee(id))
                props.history.push('/employees')
            })
            .catch(err=>{
                alert(err)
            })
    }
}


export const startEditEmployee = (id, formData, props) => {
    return (dispatch)=>{
        axios.put(`/employees/${id}`, formData, {
            headers:{
                "x-auth" : localStorage.getItem("authToken")
            }
        })
        .then(response=>{
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.errors.errmsg)
            }
            else{
                dispatch(editEmployee(id, response.data))
                props.history.push(`/employees/${props.match.params.id}`)
            }
        })
        .catch(err=>{
            alert(err)
        })
    }
}


export const startCreateEmployee = (formData, props)=>{
    return (dispatch)=>{
        axios.post(`/employees`, formData, {
            headers:{
                "x-auth" : localStorage.getItem("authToken")
            }
        })
            .then(response=>{
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.errors.errmsg)
                }
                else{
                    dispatch(createEmployee(response.data))
                    props.history.push(`/employees`)

                }
            })
            .catch(err=>{
                alert(err)
            })
    }
}
