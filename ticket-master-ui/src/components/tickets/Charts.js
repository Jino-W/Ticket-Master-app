import React from 'react'
import { Chart } from "react-google-charts"

class Charts extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            tickets: props.tickets,
            departments: props.departments
        }
        console.log("p",props, props.department)
    }

    render(){
        console.log("dept", this.state.departments)
        const deptData = [['Department', 'High', 'Medium', 'Low']]
        this.state.departments.forEach(dept => {
            const highCount = this.state.tickets.filter(tckt=>tckt.department===dept._id && tckt.priority==='High').length
            const mediumCount = this.state.tickets.filter(tckt=>tckt.department===dept._id && tckt.priority==='Medium').length
            const lowCount = this.state.tickets.filter(tckt=>tckt.department===dept._id && tckt.priority==='Low').length
            deptData.push([dept.name,highCount,mediumCount,lowCount])
        })

        return(
            <div>
                <div>
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Priority','Count'],
                            ['High', this.state.tickets.filter(item=>item.priority==='High').length],
                            ['Medium', this.state.tickets.filter(item=>item.priority==='Medium').length],
                            ['Low', this.state.tickets.filter(item=>item.priority==='Low').length]
                        ]}
                        options={{
                            title: 'My Daily Activities',
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </div>

                <div>
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="Bar"
                        loader={<div>Loading Chart</div>}
                        data={deptData}
                        options={{
                            // Material design options
                            chart: {
                            title: 'Tickets by Department',
                            subtitle: 'Priority- High, Medium and Low',
                            },
                        }}
                        // For tests
                        rootProps={{ 'data-testid': '2' }}
                    />
                </div>
            </div>
        )
    }
}


export default Charts