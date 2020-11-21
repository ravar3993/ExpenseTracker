import React, { Component } from 'react';
import Wallet from './Wallet'

class Dashboard extends Component {
    constructor(){
        super()
    }
    render(){
        return (
            <>
            <Wallet />
            </>
        )
    }
}
 
export default Dashboard;