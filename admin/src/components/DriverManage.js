import React from "react"
import {Container, Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {toast} from 'react-toastify';
import config from '../config';

class DriverManage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            delName: 'Select a Route',
            selectDrivers: []
        }

    }

    componentDidMount() {
        fetch(config.baseUrl + "/transroute/drivers").then(res => res.json()).then(data => {
            this.setState({selectDrivers: data})
        })
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    handleSubmitOne = (event) => {
        event.preventDefault()
        event.stopPropagation()

        const body = {
            name: this.state.name
        }

        const option = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(config.baseUrl + "/transroute/driver", option).then(res => res.json()).then(res => {
            if (res.routeExist) {
                toast.error("Route Already Exist")
            } else {
                toast.success("Driver Created Successfully")
                setTimeout(() => {
                    window.location.reload();
                }, 2000)
            }
        });

    }

    handleSubmitTwo = (event) => {
        event.preventDefault()
        event.stopPropagation()

        if (this.state.stationName !== '') {

            const body = {
                name: this.state.selectName,
            }

            const option = {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            }

            fetch(config.baseUrl + "/transroute/driver", option).then(res => res.json()).then(res => {
                if (res.stationExist) {
                    toast.error("Station Already Exist")
                } else {
                    toast.success("Station Created Successfully")
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000)
                }
            });

        } else {
            toast.error("Station Name Empty")
        }

    }

    handleSubmitThree = (event) => {
        event.preventDefault()
        event.stopPropagation()

        const body = {
            name: this.state.delName
        }

        const option = {
            method: "DELETE",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(config.baseUrl + "/transroute/driver", option).then(res => res.json()).then(res => {
            if (res.status) {
                toast.success("Driver Deleted Successfully")
                setTimeout(() => {
                    window.location.reload();
                }, 2000)
            } else {
                toast.error("Error Deleting the Route")
            }
        });

    }


    render() {
        console.log(this.state)
        const routeSelect = this.state.selectDrivers.map(route => {
            return <option key={route._id} value={route.name}>{route.name}</option>
        })

        return (
            <Container style={{width: "80%", marginTop: "1%", marginBottom: "1%"}}>
                <Row
                    style={{
                        width: '100%',
                        borderBottom: '1px solid rgb(200,200,200)',
                        marginBottom: 20,
                        paddingTop: 5
                    }}>
                    <h4>Manage&nbsp;Routes</h4>
                </Row>
                <Row>
                    <Col sm style={{marginTop: "2%", paddingRight: "10%"}}>
                        <h6 style={{width: '75%', textDecoration: 'underline', marginBottom: 20, fontWeight: "bold"}}>
                            Add New Drivers
                        </h6>
                        <Form onSubmit={this.handleSubmitOne}>
                            <FormGroup>
                                <Label for="routeName">Driver Name</Label>
                                <Input type="text" name="name" id="routeName"
                                       placeholder="New Driver Name" value={this.state.name}
                                       onChange={this.handleChange}/>
                            </FormGroup>
                            {this.state.name !== '' &&
                            <FormGroup>
                                <Button color="primary">Create Driver</Button>
                            </FormGroup>
                            }
                        </Form>
                    </Col>
                    <Col sm style={{marginTop: "2%", paddingRight: "10%"}}>
                        <h6 style={{width: '75%', textDecoration: 'underline', marginBottom: 20, fontWeight: "bold"}}>
                            Delete Drivers
                        </h6>
                        <Form onSubmit={this.handleSubmitThree}>
                            <FormGroup>
                                <Label for="routeDeleteSelect">Driver Name</Label>
                                <Input type="select" name="delName" id="routeDeleteSelect"
                                       value={this.state.delName} onChange={this.handleChange}>
                                    <option>Select a Driver</option>
                                    {routeSelect}
                                </Input>
                            </FormGroup>
                            {this.state.delName !== "Select a Route" && (
                                <FormGroup>
                                    <Button color="danger">Delete Driver</Button>
                                </FormGroup>
                            )}
                        </Form>
                    </Col>
                </Row>
                <br/>
            </Container>
        );
    }
}

export default DriverManage;
