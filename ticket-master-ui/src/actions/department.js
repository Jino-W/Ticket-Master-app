import axios from "../config/axios"


export const showDepartment=(department)=>{
    return {
        type:"SHOW_DEPARTMENT",
        payload: department
    }
}


export const startShowDepartment=(id)=>{
    return (dispatch)=>{
        axios.get(`/departments/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const department = response.data.department
            dispatch(showDepartment(department))
        })
        .catch(err=>{
            alert(err)
        })
    }
}


