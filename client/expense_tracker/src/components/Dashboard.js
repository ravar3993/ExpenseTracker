import React, { Component } from 'react';
import Wallet from './Wallet'
import DashboardView from './DashboardView'
import 'antd/dist/antd.css';
import '../styles/dashboard.css';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Sider } = Layout;

class Dashboard extends Component {
    constructor(){
        super()
        this.state = {
            collapsed: false,
            view_name: "analysis"
        };
        
    }
      
    toggle = () => {
    this.setState({
        collapsed: !this.state.collapsed,
        });
    };

    render() {
    return (
        <Layout className="dashboard-layout">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />} onClick={() => {this.setState({view_name:"analysis"})}}>
                Analysis
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />} onClick={() => {this.setState({view_name:"wallet"})}}>
                Wallet
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />} onClick={() => {this.setState({view_name:"expense"})}}>
                Expenses
            </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: this.toggle,
            })}
          
            <div className="user-menu">
            <Menu mode="horizontal">
                <SubMenu key="SubMenu" icon={<UserOutlined />}>
                    <Menu.Item onClick={() => {this.setState({view_name:"profile"})}}>Profile</Menu.Item>
                    <Menu.Item >Logout</Menu.Item>
                </SubMenu>
            </Menu>
            </div>
            <div className="header-wallet">
                <Wallet />
            </div>
            </Header>
           
            <DashboardView view_name={this.state.view_name}/>
        </Layout>
        </Layout>
    );
    }
}
 
export default Dashboard;