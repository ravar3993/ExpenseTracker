import React, { Component } from 'react'
import 'antd/dist/antd.css';
import '../styles/loginForm.css'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import configData from "../configData.json"
import { Redirect } from "react-router-dom";
import RegisterForm from './RegisterForm'

class LoginForm extends Component {
    constructor(){
        super()
        this.state = {
            redirect: "/dashboard",
            user_validated: false,
            token_created: false,
            error_message: null
          }
        this.onFinish = this.onFinish.bind(this)
    }

    onFinish = (values) => {
        values.preventDefault();
        console.log('Received values of form: ', values);
        let formData = new FormData();
        formData.append('username',values['username'])
        formData.append('password',values['password'])
  
        let fetchData = { 
          method: 'POST',
          body: formData
        }
        fetch(configData.SERVER_URL + "/user/api/sign_in/", fetchData)
          .then(response => {
            if(response.ok){
              this.setState({            
                user_validated: true
              })
            }
            return response.json()
          })
          .then(
            (result) => {
              console.log(result)
              if(this.state.user_validated){
                localStorage.setItem('token',JSON.stringify(result['token']));
                this.setState({
                  token_created: true
                })
              }else{
                this.setState({
                  error_message: result['resp_msg']
                })
              }
            },
            (error) => {
              console.log(error)
            }
          )
    }

    render() {
        
        var login_form = (
          <>
          <div id="login-form-error" className="login-form-error">
            {this.state.error_message}
          </div>
          <div className="login-form">
            <form onSubmit={this.onFinish} method="POST">
              <label for="username">UserName:</label>
              <input type="text" id="username" name="username" /><br />
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" /><br /><br />
              <input type="submit" value="Submit" />
            </form>
          </div>
          </>
        )
        if (this.state.user_validated && this.state.token_created){
            return <Redirect to={this.state.redirect} /> 
        }else{
            return login_form
        }
        
    }
}

export default LoginForm