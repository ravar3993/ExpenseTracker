import React, { Component } from 'react';
import '../styles/loginPage.css'

class SignUp extends Component {
    constructor(){
      super()
      this.state = {
        email:"",
        username:"",
        password:"",
        confirm_password:""
      }
    }

    changeHandler = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    submitHandler = (e) => {
      e.preventDefault()
    }


    render() { 
        return (
          <div>
            <h3 id="login-tag">REGISTER</h3>
            <form className="signUpForm">
              <table>
                <tbody>
                <tr>
                  <td><span>Email</span></td>
                  <td>
                    <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.changeHandler}/>
                  </td>
                </tr>
                <tr>
                  <td><span>UserName</span></td>
                  <td>
                    <input type="text" name="username" placeholder="UserName" value={this.state.username} onChange={this.changeHandler}/>
                  </td>
                </tr>
                <tr>
                  <td><span>Password</span></td>
                  <td>
                    <input type="text" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler}/>
                  </td>
                </tr>
                <tr>
                  <td><span>Confirm Password</span></td>
                  <td>
                    <input type="text" name="confirm_password" placeholder="Confirm Password" value={this.state.confirm_password} onChange={this.changeHandler}/>
                  </td>
                </tr>
                <tr>
                  <td><button id="login-submit" type='submit'>Create Account</button></td>
                </tr>
                </tbody>
              </table>
            </form>
          </div>
        );
    }
}
 
export default SignUp;