import React, { Component } from 'react';

import { Col, Button, Form, Card, Row } from 'react-bootstrap'
import { contact } from '../Services'
import { toast } from 'react-toastify'

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            phone: '',
            email: '',
            message: ''
        };
        this.baseState = this.state
    }

    handleChange = type => event => {
        let value = event
        if (event.target) {
            value = event.target.value
        }
        this.setState({ [type]: value })
    }

    handleSubmit = event => {
        event.preventDefault()
        event.stopPropagation()
        contact(this.state)
            .then(res => {
                toast.success("Your message has been sent..")
                this.setState({ ...this.baseState })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Col>
                    <Card style={{ padding: 20, margin: 10 }}>
                        <Form onSubmit={e => this.handleSubmit(e)}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridFName">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control required type="username" placeholder="Enter first name" onChange={this.handleChange('fname')} value={this.state.fname} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridLName">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control required type="username" placeholder="Enter last name" onChange={this.handleChange('lname')} value={this.state.lname} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPhone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="username" placeholder="Enter Phone Number" onChange={this.handleChange('phone')} value={this.state.phone} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control required type="email" placeholder="Enter email" onChange={this.handleChange('email')} value={this.state.email} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Group controlId="controlTextarea1">
                                <Form.Label>Message</Form.Label>
                                <Form.Control required as="textarea" rows="3" onChange={this.handleChange('message')} value={this.state.message} />
                            </Form.Group>
                            <Col style={{ paddingRight: 0 }} align='right'>
                                <Button variant="danger" type="submit">
                                    Send Message
                                </Button>
                            </Col>
                        </Form>
                    </Card>
                </Col>
                <Col>
                    <Row style={{ alignItems: 'center', justifyContent: 'center', margin: 30 }}>
                        <Col>
                            <div id="page">
                                <p><strong><span style={{ textDecoration: 'underline' }}>General Information</span></strong></p>
                                <p><strong>Telephones : </strong>+94 11 2 852852 <br /><strong>Fax Nos : </strong>+94 11 2 963963<br /><strong>Email : </strong>
                                    <a >srilankamotortraffic@ceylon.gov.lk</a>
                                    <span style={{ display: 'none' }}>This e-mail address is being protected from spambots. You need JavaScript enabled to view it
                                        </span>
                                </p>
                                <p><strong>Head Office Exchange Number</strong> : +94 11 1 123123</p>
                                <p><strong> Inquiries</strong> : +94 11 2 234234</p>
                                <p><strong>Technical Office</strong> : +94 11 3 345345</p>
                                <p className="MsoNormal"><strong>Manager (Technical Operation)</strong> : +94 11 2 222222</p>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default Contact;