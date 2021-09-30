import React, { PureComponent } from 'react';
import configData from "../configData.json"
import { Statistic, Button, Form, Input } from 'antd';

class Wallet extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            token: localStorage.getItem('token'),
            wallet_balance: 0,
            edit_wallet: false
        }
    }
    componentDidMount(){
        this.getWalletBalance()
        //setInterval(this.getWalletBalance.bind(this), 3000)
    }
    
    getWalletBalance = () => {

        let fetchData = {
            method: 'GET',
            headers: {"Authorization" : this.state.token}
        }
        fetch(configData.SERVER_URL + "/wallet/api/balance/", fetchData)
            .then(response => {
                return response.json()
            }).then(
                (result) => {
                    this.setState({
                        wallet_balance: result['balance']
                    })
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    onEditButtonClick = () => {
        this.setState({
            edit_wallet: !this.state.edit_wallet
        })
    }

    onUpdateButtonClick = (values) => {
        
        let formData = new FormData();
        formData.append('wallet_balance',values['wallet_balance'])

        let fetchData = { 
          method: 'POST',
          body: formData,
          headers: {"Authorization" : this.state.token}
        }
        fetch(configData.SERVER_URL + "/wallet/api/balance/", fetchData)
          .then(response => {
            return response.json()      
          })
          .then(
            (result) => {
                this.setState({
                    wallet_balance: result['balance']
                })
            },
            (error) => { 
            }
          )
          this.onEditButtonClick()
          
    }


    render(){
        if (this.props.wallet_state == "editable"){
            if(this.state.edit_wallet){
                return (
                    <>
                    <div class="ant-statistic-title">Wallet Balance</div>
                    <div id="wallet-balance">
                        <Form
                            id="wallet-balance-form"
                            name="customized_form_controls"
                            layout="inline"
                            onFinish={this.onUpdateButtonClick}
                            initialValues={{
                                wallet_balance: this.state.wallet_balance
                            }}
                        >   
                            <span id="balance-input-currency">{'\u20B9'}</span>
                            <Form.Item
                                name="wallet_balance"
                                label=""
                            >
                                <Input
                                    id="balance-input"
                                    type="number"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                Update Balance
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    </>
                )
            }else{
                return (
                    <>
                    <Statistic title="Wallet Balance" prefix={'\u20B9'} value={ this.state.wallet_balance} precision={2} />
                    <Button type="primary" onClick={this.onEditButtonClick}>Edit Balance</Button>
                    </>
                )
            }
        }else{
            return(
                <>
                <Statistic title="Wallet Balance" prefix={'\u20B9'} value={ this.state.wallet_balance} precision={2} />
                </>
            )
            
        }
        
    }
}
 
export default Wallet;