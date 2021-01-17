import React, { PureComponent } from 'react';
import configData from "../configData.json"
import { Statistic } from 'antd';

class Wallet extends PureComponent {
    constructor(){
        super()
        this.state = {
            token: localStorage.getItem('token'),
            wallet_balance: 0
        }
    }
    componentDidMount(){
        this.getWalletBalance()
    }

    getWalletBalance = () => {

        let fetchData = {
            method: 'GET',
            headers: {"Authorization" : this.state.token}
        }
        fetch(configData.SERVER_URL + "/wallet/api/balance/", fetchData)
            .then(response => {
                if (response.ok) {
                    console.log("ok")
                }
                return response.json()
            }).then(
                (result) => {
                    this.setState({
                        wallet_balance: result['balance']
                    })
                    console.log(result)
                },
                (error) => {
                    console.log(error)
                }
            )
    }
    render(){
        return (
            <>
            <Statistic title="Wallet Balance" prefix={'\u20B9'} value={ this.state.wallet_balance} precision={2} />
            </>
        )
    }
}
 
export default Wallet;