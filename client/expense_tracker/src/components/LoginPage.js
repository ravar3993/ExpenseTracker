import React, { Component } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import '../styles/loginPage.css'

class LoginPage extends Component {
    constructor(){
        super()

        this.state = {
            signIn: true,
        }
    }

    loginButtonHandler(){
        this.setState({
            signIn: true
        })
    }

    registerButtonHandler(){
        this.setState({
            signIn: false
        })
    }


    render() {
        var comp
        if (this.state.signIn) {
            comp = 
            <>
            <SignIn />
                <div className="account-query">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                <span>Don't have an Account ?</span>
                                </td>
                                <td>
                                <button onClick={() => this.registerButtonHandler()}>Register</button>
                                </td>
                            </tr>                            
                        </tbody>
                    </table>
                </div>
                <div className="forgot-password">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                <span>Forgot Password ?</span>
                                </td>
                                <td>
                                <button>Reset Password</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        } else {
            comp = 
            <>
            <SignUp />
            <div className="account-query">
                <table>
                    <tbody>
                        <tr>
                            <td>
                            <span>Already have an Account ?</span>
                            </td>
                            <td>
                            <button onClick={() => this.loginButtonHandler()}>Login</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </>
        }
        return (
            <div className="login-page">
                <h1 id="login-title">EXPENSE TRACKER</h1>
                {comp}
            </div>
        );
    }
}

export default LoginPage