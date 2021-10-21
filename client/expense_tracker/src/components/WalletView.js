import React, { PureComponent } from 'react';
import configData from "../configData.json"
import { Statistic, Button, Form, Input } from 'antd';
import '../styles/dashboard.css'
import Wallet from './Wallet'
import { Container, Row, Col, Nav } from 'react-bootstrap';

class WalletView extends PureComponent {
    constructor(){
        super()
        this.state = {
            token: localStorage.getItem('token'),
            nav_key: "1"
        }
    }
    componentDidMount(){
    }

    onEditButtonClick = () => {
        this.setState({
            edit_wallet: !this.state.edit_wallet
        })
    }

    navClickHandler = (eventKey) => {
        this.setState({
            nav_key: eventKey
        })
    }

    
    render(){
        return (
            <>
            <Container fluid>
                <Row>
                    <Col xs={2} className="aside-nav">
                    <Nav fill onSelect={(eventKey) => this.navClickHandler(eventKey)} 
                        defaultActiveKey={this.state.nav_key} className="flex-column">
                        <Nav.Link eventKey="1">Edit Wallet</Nav.Link>
                        <Nav.Link eventKey="2">Transactions</Nav.Link>
                    </Nav>
                    </Col>
                    <Col className="dashboard-content-view">
                        <Wallet nav_key={this.state.nav_key} />
                    </Col>
                </Row>
            </Container>
            </>
        )
    }
}
 
export default WalletView;