import React, { Component } from 'react';
import { Descriptions } from 'antd';
import configData from "../configData.json"

class Profile extends Component {
    constructor(){
        super()
        this.state = {
            token: localStorage.getItem('token'),
            username: null,
            email: null,
            wallet_balance: null
        }
    }

    componentDidMount(){
        this.getUserProfile()
    }

    getUserProfile = () => {
        let fetchData = {
            method: 'GET',
            headers: {"Authorization" : this.state.token}
        }
        fetch(configData.SERVER_URL + "/user/api/profile/", fetchData)
            .then(response => {
                return response.json()
            }).then(
                (result) => {
                    this.setState({
                        wallet_balance: result['wallet_balance'],
                        username: result['username'],
                        email: result['email']
                    })
                    console.log(result)
                },
                (error) => {
                    console.log(error)
                }
            )
    }
    
    render() {
        return (
            <Descriptions title="User Profile" layout="horizontal" column={1} bordered={true}>
                <Descriptions.Item label="UserName">{this.state.username}</Descriptions.Item>
                <Descriptions.Item label="Email">{this.state.email}</Descriptions.Item>
                <Descriptions.Item label="Wallet Balance">{'\u20B9' + this.state.wallet_balance}</Descriptions.Item>
            </Descriptions>
        )
    }
}
 
export default Profile;