import React, { Component } from 'react';
import { Descriptions } from 'antd';


class Profile extends Component {
    constructor(){
        super()
    }
    
    render() {
        return (
            <Descriptions title="User Info" layout="horizontal" column={1} bordered={true}>
                <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                <Descriptions.Item label="Email">xyz@admin.com</Descriptions.Item>
                <Descriptions.Item label="Wallet Balance">70</Descriptions.Item>
            </Descriptions>
        )
    }
}
 
export default Profile;