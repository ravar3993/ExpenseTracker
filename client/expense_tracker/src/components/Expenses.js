import React, { PureComponent } from 'react';
import '../styles/dashboard.css'

class Expenses extends PureComponent {
    constructor(){
        super()
        this.state = {
            token: localStorage.getItem('token')
        }
    }
    componentDidMount(){
    }
    
    render(){
        return (
            <>
            <h3> My Expenses </h3>
            </>
        )
    }
}
 
export default Expenses;