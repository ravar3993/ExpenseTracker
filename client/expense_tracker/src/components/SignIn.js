import React, { Component } from 'react'
import '../styles/loginPage.css'
import { Redirect } from "react-router-dom";
import configData from "../configData.json"

class SignIn extends Component {
    constructor(){
        super()
        this.state = {
          username: "",
          password: "",
          redirect: "/dashboard",
          user_validated: false
        }
    }

    handleSubmit = (e) => {
      let signUpForm = document.getElementById('signInF');
      let formData = new FormData(signUpForm);

      let fetchData = { 
        method: 'POST',
        body: formData
      }
      e.preventDefault()
      fetch(configData.SERVER_URL + "/login/api/sign_in/", fetchData)
        .then(response => {
          if (response.ok) {
            this.setState({
              user_validated: true
            })
          }
          return response.json()
        })
        .then(
          (result) => {
            if (this.state.user_validated){
              console.log("user validated");
            }else{
              console.log("user not validated");
            }
          },
          (error) => {
            alert(error)
          }
        )
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value.trim()
      })
    }


    render() {
      var login_form = 
      <div>
      <h3 id="login-tag">LOGIN</h3>
      <form className="signInForm" id="signInF">
        <table>
          <tbody>
          <tr>
            <td><span>UserName</span></td>
            <td>
              <input type="text" placeholder="UserName" name="username" value={this.state.username} onChange={this.handleChange} />
            </td>
          </tr>
          <tr>
            <td><span>Password</span></td>
            <td>
              <input type="text" placeholder="Password1" name="password" value={this.state.password} onChange={this.handleChange} /><br/>
            </td>
          </tr>
          <tr>
            <td><button type='submit' onClick={this.handleSubmit}>Get Started !</button></td>
          </tr>
          </tbody>
        </table>
      </form>
    </div>


    if (this.state.user_validated){
      return <Redirect to={this.state.redirect} /> 
    }else{
      return login_form
    }
       
    }
}

export default SignIn