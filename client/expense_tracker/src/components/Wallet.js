import React, { PureComponent } from 'react';
import configData from "../configData.json"
import {Card, Row, Nav, Container, Form, Button, Col} from 'react-bootstrap'

class Wallet extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            token: localStorage.getItem('token'),
            wallet_balance: 0,
            edit_wallet_nav: "1.1"
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

    onUpdateButtonClick = (values) => {
        values.preventDefault()
        let formData = new FormData();
        let update_amount_entered = document.getElementById("wallet-update-amount").value
        let update_amount
        switch(this.state.edit_wallet_nav) {
            case "1.1":
                update_amount = Number(this.state.wallet_balance) + Number(update_amount_entered)
                break;
            case "1.2":
                update_amount = Number(this.state.wallet_balance) - Number(update_amount_entered)
                break;
            default:
                update_amount = Number(this.state.wallet_balance)
        }
        formData.append('wallet_balance',(update_amount))

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
          
    }

    navClickHandler = (eventKey) => {
        this.setState({
            edit_wallet_nav: eventKey
        })
    }


    render(){
        let view_content

        var edit_wallet_content = (
            <Container>
                <Row>
                <Card className="col-md-3">
                    <Card.Body>
                        <Card.Title>Wallet Balance</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{this.state.wallet_balance}</Card.Subtitle>
                    </Card.Body>
                </Card> 
                </Row>
                <Row className="edit-wallet-nav">
                    <Nav fill className="col-md-3" onSelect={(eventKey) => this.navClickHandler(eventKey)} 
                        variant="tabs" defaultActiveKey={this.state.edit_wallet_nav}>
                        <Nav.Item>
                            <Nav.Link eventKey="1.1">Credit</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="1.2">Debit</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Row>
                <br />
                <Row>
                    <Form onSubmit={this.onUpdateButtonClick} method="POST">
                        <Form.Row>
                            <Col>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control id="wallet-update-amount" type="number" placeholder="Enter Amount" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Button variant="dark" type="submit">
                                Update
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Row>
            </Container>
            
        ) 

        switch(this.props.nav_key) {
            case "1":
                view_content = edit_wallet_content
                break;
            case "2":
                view_content = (
                    <h5> Transactions </h5>
                )
                break;
            default:
                view_content = edit_wallet_content
        }

        return(
            <>
            {view_content}
            </>
        )
    }
}
 
export default Wallet;