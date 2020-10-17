import React, {Component} from 'react';
import {Button, Col, Form} from "react-bootstrap";

class TopUpCredit extends Component {
    constructor(props) {

        super(props);

        this.state = {
            cardNo: '',
            cvc: '',
            exp: '',

        };
    }

    handleChange = type => event => {
        var value = event.target.value
        if (type === 'card' || type === 'cash') {
            this.setState({ checked: type, showPaymentErr : false, showValidateErr : false })
        } else {
            this.setState({ [type]: value })
        }
    }
    render() {
        return (
            <div>
                <Form style={{margin:'50px'}} >
                <Form.Row style={{ width: '75%' }}>
                    <Form.Group as={Col} controlId="cardNo">
                        <Form.Label>Card Number</Form.Label>
                        <Form.Control required placeholder="card number" onChange={this.handleChange('cardNo')} value={this.state.cardNo} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="cvc">
                        <Form.Label>CVC Number</Form.Label>
                        <Form.Control required placeholder="CVC" onChange={this.handleChange('cvc')} value={this.state.cvc} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="exp">
                        <Form.Label>Exp Date</Form.Label>
                        <Form.Control required placeholder="dd/mm" onChange={this.handleChange('exp')} value={this.state.exp} />
                    </Form.Group>
                </Form.Row>
                <Button variant="primary" href={'/'} >
                  Make Payment
                </Button>
                </Form>
            </div>
        );
    }
}

export default TopUpCredit;