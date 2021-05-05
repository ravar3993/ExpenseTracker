import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import '../styles/welcome.css'
import 'antd/dist/antd.css';
import { Button, Nav } from 'react-bootstrap';


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
                <Nav justify variant="pills" defaultActiveKey="1">
                <Nav.Item>
                    <Nav.Link eventKey="1" onClick={this.loginClickHandler}>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="2" onClick={this.registerClickHandler}>Register</Nav.Link>
                </Nav.Item>
                </Nav>
                <div class="login-register-form">{comp}</div>
            </div>
        )
    }
}
 
export default Welcome;