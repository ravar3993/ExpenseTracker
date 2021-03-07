import React, { PureComponent } from 'react';
import configData from "../configData.json"
import { Statistic, Button, Form, Input } from 'antd';
import '../styles/dashboard.css'
import Wallet from './Wallet'

class WalletActivity extends PureComponent {
    constructor(){
        super()
        this.state = {
            token: localStorage.getItem('token')
        }
    }
    componentDidMount(){
    }

    onEditButtonClick = () => {
        this.setState({
            edit_wallet: !this.state.edit_wallet
        })
    }

    
    render(){
        return (
            <>
            <div id="wallet-balance">
                <Wallet wallet_state="editable" />
            </div>
            </>
        )
    }
}
 
export default WalletActivity;