import axios from '../config/axios'
import swal from 'sweetalert'

export const startUserRegister=(data,props)=>{
    return ()=>{axios.post('/users/register',data)
        .then(response=>{
            if(response.data.hasOwnProperty('errors')){
                swal(response.data.errors,{icon:'error'})
            }else{
                props.history.push('/users/login')
            }
        })
    }
    
}

export const startUserLogin=(data,props)=>{
    return ()=>{axios.post('/users/login',data)
        .then(response=>{
            if(response.data.hasOwnProperty('errors')){
                swal(response.data.errors,{icon:'error'})
            }else{
                const token=response.data.token
                localStorage.setItem('authToken',token)
                props.history.push('/')
                window.location.reload()
            }
        })
        .catch(err=>{
            alert(err)
        })
    }
}