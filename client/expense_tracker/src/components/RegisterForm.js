import React, { Component, useState } from 'react'
import 'antd/dist/antd.css';
import '../styles/registerForm.css'
import configData from "../configData.json"
import { Redirect } from "react-router-dom";
import {Row, Col, Form, Button, Container, Alert } from 'react-bootstrap'


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
        formData.append('username',document.getElementById('username').value)
        formData.append('email',document.getElementById('email').value)
        formData.append('password',document.getElementById('password').value)
        formData.append('confirm_password',document.getElementById('confirm_password').value)

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
        let register_form = (
           <>
            <Container>
            <Row xs={8} className="justify-content-center error_message">
             {error_message}
            </Row>
            <Row className="justify-content-center">
              <Form onSubmit={this.onFinish} method="POST">
              <Form.Group as={Row} controlId="formPlaintextEmail">
                  <Col sm="15">
                    <Form.Control id="email" name="email" type="Email" placeholder="Email" />
                  </Col>
                </Form.Group>
                
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
                <Form.Group as={Row} controlId="formPlaintextPassword">
                  <Col sm="15">
                    <Form.Control id="confirm_password" name="confirm_password" type="password" placeholder="Confirm Password" />
                  </Col>
                </Form.Group>
                <Button variant="dark" type="submit">
                    Register
                </Button>
              </Form>
            </Row>
          
          </Container>
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