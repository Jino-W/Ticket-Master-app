const customersInitialState = []

const customersReducer = (state = customersInitialState, action)=>{
    switch (action.type) {
        case "GET_CUSTOMERS":{
            return [...action.payload]
        }
        case "DELETE_CUSTOMER":{
            return [...state].filter(customer => customer._id !== action.payload.customer_id)
        }
        case "EDIT_CUSTOMER":{
            return [...state].map(customer=> {
                if(action.payload.customer_id == customer._id){
                    return Object.assign(customer, action.payload.formData)
                }
                return customer
            })
        }
        case "CREATE_CUSTOMER":{
            return [...state, action.payload.formData]
        }
        default:{
            return [...state]
        }
    }
}

export default customersReducer