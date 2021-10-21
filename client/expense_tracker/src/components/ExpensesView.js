import React, { PureComponent } from 'react';
import '../styles/dashboard.css'
import Expenses from './Expenses'
import { Container, Row, Col, Nav } from 'react-bootstrap';

class ExpensesView extends PureComponent {
    constructor(){
        super()
        this.state = {
            token: localStorage.getItem('token')
        }
    }
    componentDidMount(){
    }

    
    render(){
        return (
            <>
            <Container fluid>
                <Row>
                    <Col xs={2} className="aside-nav">
                    <Nav fill defaultActiveKey="1" className="flex-column">
                        <Nav.Link eventKey="1">View Expenses</Nav.Link>
                        <Nav.Link eventKey="2">Add Expenses</Nav.Link>
                    </Nav>
                    </Col>
                    <Col>
                    <p>Expenses</p>
                    </Col>
                </Row>
            </Container>
            </>
        )
    }
}
 
export default ExpensesView;