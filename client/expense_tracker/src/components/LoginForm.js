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
            token_created: false
          }
    }

    onFinish = (values) => {
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
              }
            },
            (error) => {
              console.log(error)
            }
          )
    }

    render() {
        var login_form = (
        <Form name="normal_login"
        className="login-form"
        id="signInF"
        initialValues={{
            remember: true,
        }}
        onFinish={this.onFinish}
        >
        <Form.Item
            name="username"
            rules={[
            {
                required: true,
                message: 'Please input your Username!',
            },
            ]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[
            {
                required: true,
                message: 'Please input your Password!',
            },
            ]}
        >
            <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            />
        </Form.Item>
        <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
            Forgot password
            </a>
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
            </Button>
        </Form.Item>
        </Form>
        )
        if (this.state.user_validated && this.state.token_created){
            return <Redirect to={this.state.redirect} /> 
        }else{
            return login_form
        }
        
    }
}

export default LoginForm