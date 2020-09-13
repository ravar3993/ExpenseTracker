import React, { Component } from 'react'
import '../styles/loginPage.css'

class SignIn extends Component {
    constructor(){
        super()
        this.state = {
          username: "",
          password: ""
        }
    }

    handleSubmit = (e) => {
      e.preventDefault()
      alert('Values submitted')
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value.trim()
      })
    }

    render() {
        return (
          <div>
            <h3 id="login-tag">LOGIN</h3>
            <form className="signInForm">
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
                    <input type="text" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} /><br/>
                  </td>
                </tr>
                <tr>
                  <td><button type='submit' onClick={this.handleSubmit}>Get Started !</button></td>
                </tr>
                </tbody>
              </table>
            </form>
          </div>
        );
    }
}

export default SignIn