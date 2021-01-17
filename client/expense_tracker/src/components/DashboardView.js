import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
const { Header, Sider, Content } = Layout;


class DashboardView extends Component {
    constructor(){
        super()
    }
    
    render() {
        let view_content
        if(this.props.view_name === "analysis"){
            view_content = "Analysis coming soon!"
        }else if(this.props.view_name === "wallet"){
            view_content = "Wallet coming soon!"
        }else if(this.props.view_name === "expense"){
            view_content = "Expense coming soon!"
        }
        return (
            <Content
            className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
            }}
            >
            {view_content}
            </Content>
        )
    }
}
 
export default DashboardView;