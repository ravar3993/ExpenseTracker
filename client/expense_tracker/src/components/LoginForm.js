import React, { Component, useState } from 'react'
import 'antd/dist/antd.css';
import '../styles/loginForm.css'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import configData from "../configData.json"
import { Redirect } from "react-router-dom";
import RegisterForm from './RegisterForm'
import {Row, Col, Form, Button, Container, Alert } from 'react-bootstrap'

function AlertDismissible(props) {
  const [show, setShow] = useState(true);
  let message = props.message
  if (show && message !== null) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        {message}
      </Alert>
    );
  }
  return null
}

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
        
        console.log('Received values of form: ', values['username'], values['password']);
        let formData = new FormData();
        let username = document.getElementById('username').value
        let password = document.getElementById('password').value
        formData.append('username',username)
        formData.append('password',password)
  
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
          values.preventDefault();
    }

    render() {
        let error_message = null
        if (this.state.error_message !== null){
            error_message = (
              <Alert variant="danger" onClose={() => {this.setState({
                error_message: null
              })}} dismissible>
                {this.state.error_message}
              </Alert>
            )
        }
        var login_form = (
          <>
          <Container>
            <Row xs={8} className="justify-content-center error_message">
             {error_message}
            </Row>
            <Row className="justify-content-center">
              <Form onSubmit={this.onFinish} method="POST">
                <Form.Group as={Row} controlId="formPlaintextEmail">
                  <Col sm="15">
                    <Form.Control id="username" name="username" placeholder="Username" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextPassword">
                  <Col sm="15">
                    <Form.Control id="password" name="password" type="password" placeholder="Password" />
                  </Col>
                </Form.Group>
                <Button variant="dark" type="submit">
                  Login
                </Button>
              </Form>
            </Row>
          
          </Container>
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