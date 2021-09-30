import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import '../styles/welcome.css'
import 'antd/dist/antd.css';
import { Button } from 'antd';


class Welcome extends Component {
    constructor(){
        super()
        this.state = {
            isLogin: true,
            token: localStorage.getItem('token'),
            redirect: '/dashboard'
        }
    }

    loginClickHandler = () => {
        if(!this.state.isLogin){
            this.setState({
                isLogin: true
            })
        }
    }

    registerClickHandler = () => {
        if(this.state.isLogin){
            this.setState({
                isLogin: false
            })
        }
    }

    render(){
        if(this.state.token != null){
            return <Redirect to={this.state.redirect} />
        }


        let comp;
        if(this.state.isLogin){
            comp = <LoginForm />
        }else{
            comp = <RegisterForm />
        }
        return (
            <div class="login-register">
                <div class="login-register-button">
                <span><Button type="primary" onClick={this.loginClickHandler}>Login</Button></span>
                <span><Button type="primary" onClick={this.registerClickHandler}>Register</Button></span>
                </div>
                <div class="login-register-form">{comp}</div>
            </div>
        )
    }
}
 
export default Welcome;