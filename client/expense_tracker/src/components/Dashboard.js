import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Wallet from './Wallet'
import DashboardView from './DashboardView'
import 'antd/dist/antd.css';
import '../styles/dashboard.css';
import { Layout, Menu } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Navbar, Card, Row, Col, Nav, NavDropdown, InputGroup, FormControl} from 'react-bootstrap'
import user_logo from '../images/user.png'
import configData from "../configData.json"

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
            wallet_balance: 0,
            username: "test-user",
            email: "example@example.com",
            nav_key: "2" 
        };
        this.getUserProfile = this.getUserProfile.bind(this)
        
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
                },
                (error) => {
                    console.log(error)
                }
            )
    }


    componentDidMount() {
        this.getUserProfile()
        //setInterval(this.getUserProfile.bind(this), 3000)
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

    navClickHandler = (eventKey) => {
        this.setState({
            nav_key: eventKey
        })
    }

    render() { 
        if(this.state.token != null && typeof this.state.token !== 'undefined'){
            return (
                <>
                <Container fluid>
                    <Navbar bg="dark" variant="dark" sticky="top" expand="lg">
                        <Navbar.Brand href="/" className="mr-auto">ExpenseTracker</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <InputGroup className="justify-content-end" style={{width: "200px"}}>
                            <InputGroup.Prepend>
                                <InputGroup.Text>{'\u20B9'}</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="number"
                                placeholder={this.state.wallet_balance}
                                readOnly
                            />
                        </InputGroup>
                        <NavDropdown onSelect={(eventKey) => this.navClickHandler(eventKey)}
                                    className="user-dropdown justify-content-end" 
                                    title={
                                            <div className="pull-right">
                                                <img className="thumbnail-image"
                                                     src={user_logo}
                                                />
                                            </div>
                                            } >
                            <NavDropdown.Item >Logged in as <br /><p style={{color: "#6495ED"}}><b>{this.state.username}</b></p></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item eventKey="4.1">Edit Profile</NavDropdown.Item>
                            <NavDropdown.Item >Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={this.onLogout} >Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar>
                    <Row>
                        <Col>
                            <div className="dashboard-view">
                                <DashboardView nav_key={this.state.nav_key}/>
                            </div>
                        </Col>
                    </Row>
                    <Row className="fixed-bottom mb-4 dashboard-nav-row">
                        <Col>
                        <Nav onSelect={(eventKey) => this.navClickHandler(eventKey)} 
                            id="dashboard-nav" variant="pills" className="justify-content-center" activeKey={this.state.nav_key}>
                            <Nav.Item>
                                <Nav.Link eventKey="1">
                                    Analysis
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="2">
                                    Expenses
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="3">
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