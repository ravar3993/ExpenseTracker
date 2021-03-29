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
            user_validated: false
          }
    }
    form = () => {return Form.useForm()}
    onFinish = (values) => {
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
              }
            },
            (error) => {
              alert(error) 
            }
          )
      }
  
    render() {
        let register_form = (
            <Form
        name="register"
        onFinish={this.onFinish}
        initialValues={{
            prefix: '86'
        }}
        scrollToFirstError
        >
        <Form.Item
            name="email"
            label="E-mail"
            rules={[
            {
                type: 'email',
                message: 'The input is not valid E-mail!',
            },
            {
                required: true,
                message: 'Please input your E-mail!',
            },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            name="password"
            label="Password"
            rules={[
            {
                required: true,
                message: 'Please input your password!',
            },
            ]}
            hasFeedback
        >
            <Input.Password />
        </Form.Item>

        <Form.Item
            name="confirm_password"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
            {
                required: true,
                message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
                validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }

                return Promise.reject('The two passwords that you entered do not match!');
                },
            }),
            ]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item
            name="username"
            label="Username"
            rules={[
            {
                required: true,
                message: 'Please input your username!',
                whitespace: true,
            },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" className="register-form-button">
            Register
            </Button>
        </Form.Item>
        </Form>
        )

        if (this.state.user_validated){
          return <Redirect to={this.state.redirect} /> 
        }else{
            return register_form
        }
    }
}

export default RegisterForm