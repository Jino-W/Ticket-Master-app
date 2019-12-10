import React from "react"
import axios from '../config/axios'
import Select from 'react-select';

class TicketMasterForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isEdit : props.isEdit || false,
            code: props.ticket ? props.ticket.code : null,
            selectValue: props.department ? props.department.name : '',
            customer: props.customer || "",
            priority: props.ticket ? props.ticket.priority : 'High',
            departments :  "",
            message: props.ticket ? props.ticket.message : '',
            title: props.ticket ? props.ticket.title : '',
            customers:  "",
            selectedOption: props.customer ? {label: props.customer.name, value: props.customer.name} : null,
            options: []
        }
    }

    

    handleSelect=(selectedOption) => {
        this.setState({ selectedOption});
    };


    handleChange=(e)=>{
        if(e.target.value !== "-- select department --"){
            this.setState({[e.target.name]: e.target.value})
        }
    }


    handleSubmit=(e)=>{
        e.preventDefault()
        let result = "DCT-"
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for ( var i = 0; i < 3; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        let code = this.state.isEdit ? this.state.code : result

        const item = this.state.departments.find(dept=>{
            return dept.name === this.state.selectValue
        })

        const item1 = this.state.customers.find(cust=>{
            return cust.name === this.state.selectedOption.value
        })

        const formData = {
            code: code,
            priority:this.state.priority,
            message: this.state.message,
            title: this.state.title,
            department: item._id,
            customer: item1._id
        }
        this.props.submitHandle(formData)
    }


    handleReset=(e)=>{
        e.preventDefault()
        console.log('reset')
        this.setState({
            selectValue: '',
            priority: 'High',
            message:'',
            title:"",
            selectedOption: null,
        })
    }

    
    componentDidMount(){
        const headerData = {
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        }
        let URL1 = "/customers"
        let URL2 = "/departments"

        const promise1 = axios.get(URL1, headerData);
        const promise2 = axios.get(URL2, headerData);

        Promise.all([promise1, promise2]).then((values)=> {
            const customers = values[0].data
            const departments= values[1].data

            this.setState({customers, departments})
        })
        .catch(err=>{
           alert(err)
        })
    }

    render(){
        const options = []
            if(this.state.customers){
                this.state.customers.map(customer=>{
                    options.push({"label":customer.name, "value":customer.name})
                })
            }
        return (
            <div>{this.state.customers &&
                <form>
                    <div className = 'form-group'>
                        <label>Name </label>
                        <Select value={this.state.selectedOption} onChange={this.handleSelect} options={options} isSearchable={true}/>
                    </div>
                    <div className = 'form-group'>
                        <label>Priority</label>
                        <div className='form-check form-check-inline form-control'>
                            <label><input className="ml-3 form-check-input" type="radio" name="priority" value="High" onChange={this.handleChange} checked={this.state.priority === "High"} />High &nbsp;</label>
                            <label><input className="form-check-input" type="radio" name="priority" value="Medium" onChange={this.handleChange} checked={this.state.priority === "Medium"}  />Medium &nbsp;</label>
                            <label><input className="form-check-input" type="radio" name="priority" value="Low" onChange={this.handleChange}  checked={this.state.priority === "Low"} />Low &nbsp;</label>
                        </div>
                    </div>
                    <div className = 'form-group'>
                        <label>Title </label>
                        <input className="form-control" type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
                    </div>
                    <div className = 'form-group'>
                        <label>Meassage </label>
                        <textarea className="form-control" name="message" value={this.state.message} onChange={this.handleChange}></textarea>
                    </div>
                    <div className = 'form-group'>
                        <label>Department </label>
                        <select className="form-control" value={this.state.selectValue} name="selectValue" onChange={this.handleChange}>
                            <option name="department" value="-- select department --">-- select department --</option>
                            {this.state.departments.map(department=>{
                                return (
                                    <option key={department._id} value = {department.name}>{department.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div>
                        <input className="btn btn-primary mr-2" name="submit" type="submit" onClick = {this.handleSubmit}/>
                        {this.state.isEdit && <button className="btn btn-primary" name="reset" type="button" onClick = {this.handleReset}>reset</button>}
                    </div>
                </form>}
            </div>
            
        )
    }

}

export default TicketMasterForm