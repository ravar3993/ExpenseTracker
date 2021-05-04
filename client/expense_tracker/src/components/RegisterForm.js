import React, { Component, useState } from 'react'
import 'antd/dist/antd.css';
import '../styles/registerForm.css'
import { Form,Input,Button } from 'antd';
import configData from "../configData.json"
import { Redirect } from "react-router-dom";


class RegisterForm extends Component {
    constructor(){
        super()
        this.state = {
            redirect: "/dashboard",
            user_validated: false,
            token_created: false,
            error_message: null
          }
    }
    //form = () => {return Form.useForm()}
    onFinish = (values) => {
        values.preventDefault()
        console.log('Received values of form: ', values);
        let formData = new FormData();
        formData.append('username',values['username'])
        formData.append('email',values['email'])
        formData.append('password',values['password'])
        formData.append('confirm_password',values['confirm_password'])

        let fetchData = { 
          method: 'POST',
          body: formData
        }
        fetch(configData.SERVER_URL + "/user/api/sign_up/", fetchData)
          .then(response => {
            if (response.ok) {
              this.setState({
                user_validated: true
              })
            }
            console.log(response)
            return response.json()      
          })
          .then(
            (result) => {
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
              alert(error) 
            }
          )
      }
  
    render() {
        let register_form = (
           <>
            <div id="login-form-error" className="login-form-error">
            {this.state.error_message}
            </div>
            <div className="register-form">
                <form onSubmit={this.onFinish} method="POST">
                    <label for="username">UserName: </label>
                    <input type="text" id="username" name="username" /><br />
                    <label for="email">Email: </label>
                    <input type="text" id="email" name="email" /><br />
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" /><br />
                    <label for="confirm_password">Confirm Password:</label>
                    <input type="password" id="confirm_password" name="confirm_password" /><br /><br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
           </>
        )

        if (this.state.user_validated && this.state.token_created){
          return <Redirect to={this.state.redirect} /> 
        }else{
            return register_form
        }
    }
}

export default RegisterForm