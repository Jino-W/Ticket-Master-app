import React from 'react'
import TicketMasterForm from '../TicketMasterForm'
import axios from '../../config/axios'
import {Redirect} from 'react-router-dom'

class NewTicket extends React.Component{
    constructor(){
        super()
        this.state ={
            redirectToReferrer: false
        }
    }
        
    handleBack=()=>{
        this.setState({redirectToReferrer: true})
    }

    submitHandle=(formData)=>{
        axios.post("/tickets", formData,{
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log(response.data)
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            }else{
                this.props.history.push('/tickets')
                //https://stackoverflow.com/questions/44312437/react-router-v4-this-props-history-push-not-working
            }
        })
        .catch(err=>{
            console.log(err)
            alert(err)
        })
    }

    render(){
        return(
            <div>
                <h2>Add Tickets</h2>
                <TicketMasterForm submitHandle={this.submitHandle} />
                <button onClick = {this.handleBack}>Back</button>
                {this.state.redirectToReferrer && <Redirect to="/tickets" />}
            </div>
        )
    }
}

export default NewTicket