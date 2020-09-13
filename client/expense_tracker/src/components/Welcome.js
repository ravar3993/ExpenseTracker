import React, { Component } from 'react';
import LoginPage from './LoginPage'
import '../styles/welcome.css'

class Welcome extends Component {
    constructor(){
        super()
    }
    render(){
        return (
            <>
            <LoginPage />
            </>
        )
    }
}
 
export default Welcome;