import React from "react"
import {Container, Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {toast} from 'react-toastify';
import config from '../config';

class BusManage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            route: 'Select a Route',
            driver: 'Select a Driver',
            classes: 'Select a Class',
            quantity: '',
            delName: 'Select a Train',
            selectRoutes: [],
            selectDrivers: [],
            selectTrains: []
        }

    }

    componentDidMount() {
        fetch(config.baseUrl + "/transroute/routes").then(res => res.json()).then(data => {
            this.setState({selectRoutes: data})
        })
        fetch(config.baseUrl + "/transroute/buses").then(res => res.json()).then(data => {
            this.setState({selectTrains: data})
        })
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
            name: this.state.name,
            route: this.state.route,
            driver: this.state.driver,
            classes: this.state.classes,
            quantity: this.state.quantity
        }

        const option = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(config.baseUrl + "/transroute/bus", option).then(res => res.json()).then(res => {
            if (res.routeExist) {
                toast.error("Bus Already Exist")
            } else {
                toast.success("Bus Created Successfully")
                setTimeout(() => {
                    window.location.reload();
                }, 2000)
            }
        });

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

        fetch(config.baseUrl + "/transroute/bus", option).then(res => res.json()).then(res => {
            if (res.status) {
                toast.success("Bus Deleted Successfully")
                setTimeout(() => {
                    window.location.reload();
                }, 2000)
            } else {
                toast.error("Error Deleting the Bus")
            }
        });

    }


    render() {
        console.log(this.state)
        const routeSelect = this.state.selectRoutes.map(route => {
            return <option key={route._id} value={route.name}>{route.name}</option>
        })

        const driverSelect = this.state.selectDrivers.map(driver => {
            return <option key={driver._id} value={driver.name}>{driver.name}</option>
        })

        const busSelect = this.state.selectTrains.map(bus => {
            return <option key={bus._id} value={bus.name}>{bus.name}</option>
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
                    <h4>Manage&nbsp;Buses</h4>
                </Row>
                <Row>
                    <Col sm style={{marginTop: "2%", paddingRight: "10%"}}>
                        <h6 style={{width: '75%', textDecoration: 'underline', marginBottom: 20, fontWeight: "bold"}}>
                            Add New bus
                        </h6>
                        <Form onSubmit={this.handleSubmitOne}>
                            <FormGroup>
                                <Label for="busName">Bus Name</Label>
                                <Input type="text" name="name" id="busName" placeholder="New Bus Name"
                                       value={this.state.name} onChange={this.handleChange}>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="routeName">Route Name</Label>
                                <Input type="select" name="route" id="routeName"
                                       value={this.state.route} onChange={this.handleChange}>
                                    <option>Select a Route</option>
                                    {routeSelect}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="driverName">Driver Name</Label>
                                <Input type="select" name="driver" id="driverName"
                                       value={this.state.driver} onChange={this.handleChange}>
                                    <option>Select a Driver</option>
                                    {driverSelect}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="routeClass">Bus Class</Label>
                                <Input type="select" name="classes" id="routeClass"
                                       value={this.state.classes} onChange={this.handleChange}>
                                    <option>Select a Class</option>
                                    <option>First Class</option>
                                    <option>Second Class</option>
                                    <option>Third Class</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="quantity">No. of seats</Label>
                                <Input type="number" name="quantity" id="quantity"
                                       placeholder="Seats" value={this.state.quantity}
                                       onChange={this.handleChange}/>
                            </FormGroup>

                            {this.state.name !== "" && this.state.route !== "Select a Route" && this.state.class !== "Select a Class" && this.state.quantity !== "" && (
                                <div>
                                    <FormGroup>
                                        <Button color="primary">Create Bus</Button>
                                    </FormGroup>
                                </div>
                            )}
                        </Form>
                    </Col>
                    <Col sm style={{marginTop: "2%", paddingRight: "10%"}}>
                        <h6 style={{width: '75%', textDecoration: 'underline', marginBottom: 20, fontWeight: "bold"}}>
                            Delete Bus
                        </h6>
                        <Form onSubmit={this.handleSubmitThree}>
                            <FormGroup>
                                <Label for="routeDeleteSelect">Bus Name</Label>
                                <Input type="select" name="delName" id="routeDeleteSelect"
                                       value={this.state.delName} onChange={this.handleChange}>
                                    <option>Select a Bus</option>
                                    {busSelect}
                                </Input>
                            </FormGroup>
                            {this.state.delName !== "Select a Bus" && (
                                <FormGroup>
                                    <Button color="danger">Delete Route</Button>
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

export default BusManage;
