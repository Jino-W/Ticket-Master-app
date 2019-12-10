import React from 'react'
import TicketMasterForm from '../TicketMasterForm'
import {Redirect,Link} from 'react-router-dom'
import {startCreateTicket} from "../../actions/tickets"
import {connect} from "react-redux"

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
        this.props.dispatch(startCreateTicket(formData, this.props))

        // axios.post("/tickets", formData,{
        //     headers:{
        //         'x-auth': localStorage.getItem('authToken')
        //     }
        // })
        // .then(response=>{
        //     if(response.data.hasOwnProperty('errors')){
        //         alert(response.data.message)
        //     }else{
        //         this.props.history.push('/tickets')
        //         //https://stackoverflow.com/questions/44312437/react-router-v4-this-props-history-push-not-working
        //     }
        // })
        // .catch(err=>{
        //     alert(err)
        // })
    }

    render(){
        return(
            <div className='showDiv'>
                <Link className='float-right' to='# ' onClick = {this.handleBack}><i style={{color:'#007bff'}} className="fas fa-arrow-circle-left fa-lg"></i></Link>
                <h2 className='text-center font-weight-bold'>Add Tickets</h2>
                <TicketMasterForm submitHandle={this.submitHandle} />
                {this.state.redirectToReferrer && <Redirect to="/tickets" />}
            </div>
        )
    }
}

export default connect()(NewTicket)