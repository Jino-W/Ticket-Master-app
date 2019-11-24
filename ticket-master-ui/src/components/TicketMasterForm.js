import React from "react"
import axios from '../config/axios'
import Select from 'react-select';

class TicketMasterForm extends React.Component{
    constructor(props){
        super(props)
        console.log(props)
        this.state={
            isEdit : props.isEdit || false,
            code: props.ticket ? props.ticket.code : null,
            selectValue: props.department || '',
            customer: props.customer || "",
            priority: props.ticket ? props.ticket.priority : 'High',
            departments :  "",
            message: props.ticket ? props.ticket.message : '',
            title: props.ticket ? props.ticket.title : '',
            customers:  "",
            selectedOption: props.customer ? {label: props.customer, value: props.customer} : null,
            options: []
        }
        console.log("constructor")
    }

    

    handleSelect=(selectedOption) => {
        this.setState({ selectedOption});
        console.log(`Option selected:`, selectedOption);
    };


    handleChange=(e)=>{
        this.setState({[e.target.name]: e.target.value})
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
        console.log("formdata",formData)
        this.props.submitHandle(formData)
    }


    handleReset=()=>{
        this.setState({
            selectValue: '',
            priority: 'High',
            message:'',
            title:"",
            customers:"",
            departments:"",
            selectedOption: null,
        })
    }

    
    componentDidMount(){
        console.log("comp")
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
            console.log("values", values)
            const customers = values[0].data
            const departments= values[1].data

            this.setState({customers, departments})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    render(){
        console.log("render")
        const options = []
            console.log(options)
            if(this.state.customers){
                console.log(this.state.departments, this.state.customers)
                this.state.customers.map(customer=>{
                    options.push({"label":customer.name, "value":customer.name})
                })
            }
        return (
            <div>{this.state.customers &&
                <div>
                    <h2>Fill the details</h2>
                    <form>
                        <div>
                            <label>Name </label>
                            <Select value={this.state.selectedOption} onChange={this.handleSelect} options={options} isSearchable={true}/>
                        </div>
                        <div>
                            <label>Priority </label>
                            <label><input type="radio" name="priority" value="High" onChange={this.handleChange} checked={this.state.priority === "High"} /> High</label>
                            <label><input type="radio" name="priority" value="Medium" onChange={this.handleChange} checked={this.state.priority === "Medium"}  /> Medium</label>
                            <label><input type="radio" name="priority" value="Low" onChange={this.handleChange}  checked={this.state.priority === "Low"} /> Low</label>
                        </div>
                        <div>
                            <label>Title </label>
                            <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
                        </div>
                        <div>
                            <label>Meassage </label>
                            <textarea name="message" value={this.state.message} onChange={this.handleChange}></textarea>
                        </div>
                        <div>
                            <label>Department </label>
                            <select value={this.state.selectValue} name="selectValue" onChange={this.handleChange}>
                                {this.state.departments.map(department=>{
                                    return (
                                        <option value = {department.name}>{department.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div>
                            <input name="submit" type="submit" onClick = {this.handleSubmit}/>
                        </div>
                        {this.state.isEdit &&
                            <div>
                                <input name="reset" type="reset" onClick = {this.handleReset}/>
                            </div>
                        }
                    </form>
                </div>
                }
            </div>
            
        )
    }

}

export default TicketMasterForm