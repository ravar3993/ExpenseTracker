import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
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
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Navbar, Card, Row, Col, Nav} from 'react-bootstrap'

const { SubMenu } = Menu;
const { Header, Sider } = Layout;

class Dashboard extends Component {
    constructor(){
        super()
        this.state = {
            collapsed: false,
            view_name: "analysis",
            token: localStorage.getItem('token'),
            redirect: '/',
        };
        
    }
      
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            });
    };

    onLogout = () => {
        localStorage.removeItem("token");
        window.location.reload(false);
    }

    render() {
        if(this.state.token != null && typeof this.state.token !== 'undefined'){
            return (
                <>
                <Container fluid>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand className="mr-auto" href="/">ExpenseTracker</Navbar.Brand>
                        <Card className="mr-sm-2 wallet-card" bg="light" border="light">
                            <Card.Title style={{fontSize: "18px"}}>Wallet Balance :</Card.Title>
                            <Card.Subtitle md>300</Card.Subtitle>
                        </Card>
                    </Navbar>
                    <Row>
                        <Col>
                            <Card className="dashboard-view">
                            <Card.Title>{this.state.view_name}</Card.Title>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Nav variant="pills" className="justify-content-center" activeKey="1">
                            <Nav.Item>
                                <Nav.Link eventKey="1" href="/">
                                    Analysis
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="2" href="/">
                                    Expenses
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="3" href="/">
                                    Wallet
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        </Col>
                        
                    </Row>

                </Container>
                
                </>
            )
        }
        else{
            return <Redirect to={this.state.redirect} />
        }
    }
}
 
export default Dashboard;