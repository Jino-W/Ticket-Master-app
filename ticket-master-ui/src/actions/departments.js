import axios from '../config/axios'

export const getDepartments =(departments)=>{
    return {
        type: "GET_DEPARTMENTS",
        payload: departments
    }
}


export const deleteDepartment =(id)=>{
    return {
        type: "DELETE_DEPARTMENT",
        payload: {
            department_id : id
        }
    }
}


export const editDepartment =(id, formData)=>{
    return {
        type: "EDIT_DEPARTMENT",
        payload: {
            department_id : id,
            formData
        }
    }
}


export const createDepartment =(formData)=>{
    return {
        type: "CREATE_DEPARTMENT",
        payload: {
            formData
        }
    }
}



export const startGetDepartments =()=>{
    return (dispatch)=>{
        axios.get(`/departments`, {
            headers:{
                "x-auth" : localStorage.getItem("authToken")
            }
        })
        .then(response=>{
            const departments = response.data
            dispatch(getDepartments(departments))
        })
        .catch(err=>{
            alert(err)
        })
    }
}


export const startDeleteDepartment =(id, props)=>{
    return (dispatch)=>{
        axios.delete(`/departments/${id}`,{
                headers:{
                    "x-auth" : localStorage.getItem('authToken')
                }
            })
            .then(response=>{
                dispatch(deleteDepartment(id))
                props.history.push('/departments')
            })
            .catch(err=>{
                alert(err)
            })
    }
}


export const startEditDepartment = (id, formData, props) => {
    return (dispatch)=>{
        axios.put(`/departments/${id}`, formData, {
            headers:{
                "x-auth" : localStorage.getItem("authToken")
            }
        })
        .then(response=>{
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.errors)
            }
            else{
                dispatch(editDepartment(id, response.data))
                props.history.push(`/departments/${props.match.params.id}`)
            }
        })
        .catch(err=>{
            alert(err)
        })
    }
}


export const startCreateDepartment = (formData)=>{
    return (dispatch)=>{
        axios.post(`/departments`, formData, {
            headers:{
                "x-auth" : localStorage.getItem("authToken")
            }
        })
            .then(response=>{
                if(response.data.hasOwnProperty('errors')){
                    alert(response.data.errors.errmsg)
                }
                else{
                    dispatch(createDepartment(response.data))
                    window.location.reload()
                }
            })
            .catch(err=>{
                alert(err)
            })
    }
}
