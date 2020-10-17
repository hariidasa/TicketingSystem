import React from "react"
import {Container, Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {toast} from 'react-toastify';
import config from '../config';

class RouteManage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            from: '',
            to: '',
            selectName: 'Select a Route',
            route: [],
            stationName: '',
            fair: 0,
            delName: 'Select a Route',
            selectRoutes: []
        }

    }

    componentDidMount() {
        fetch(config.baseUrl + "/transroute/routes").then(res => res.json()).then(data => {
            this.setState({selectRoutes: data})
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
            from: this.state.from,
            to: this.state.to
        }

        const option = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(config.baseUrl + "/transroute/route", option).then(res => res.json()).then(res => {
            if (res.routeExist) {
                toast.error("Route Already Exist")
            } else {
                toast.success("Route Created Successfully")
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
                station: this.state.stationName,
                fair: this.state.fair
            }

            const option = {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            }

            fetch(config.baseUrl + "/transroute/route", option).then(res => res.json()).then(res => {
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

        fetch(config.baseUrl + "/transroute/route", option).then(res => res.json()).then(res => {
            if (res.status) {
                toast.success("Route Deleted Successfully")
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
        const routeSelect = this.state.selectRoutes.map(route => {
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
                            Add New Routes
                        </h6>
                        <Form onSubmit={this.handleSubmitOne}>
                            <FormGroup>
                                <Label for="routeNum">Route ID</Label>
                                <Input type="text" name="name" id="routeNum"
                                       placeholder="New Route ID" value={this.state.name}
                                       onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="routeFrom">From</Label>
                                <Input type="text" name="from" id="routeFrom"
                                       placeholder="New Route From" value={this.state.from}
                                       onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="routeTo">Route To</Label>
                                <Input type="text" name="to" id="routeTo"
                                       placeholder="New Route To" value={this.state.to}
                                       onChange={this.handleChange}/>
                            </FormGroup>
                            {this.state.name !== '' && this.state.from !== '' && this.state.to !== '' &&
                            <FormGroup>
                                <Button color="primary">Create Route</Button>
                            </FormGroup>
                            }
                        </Form>
                    </Col>
                    <Col sm style={{marginTop: "2%", paddingRight: "10%"}}>
                        <h6 style={{width: '75%', textDecoration: 'underline', marginBottom: 20, fontWeight: "bold"}}>
                            Delete Routes
                        </h6>
                        <Form onSubmit={this.handleSubmitThree}>
                            <FormGroup>
                                <Label for="routeDeleteSelect">Route Name</Label>
                                <Input type="select" name="delName" id="routeDeleteSelect"
                                       value={this.state.delName} onChange={this.handleChange}>
                                    <option>Select a Route</option>
                                    {routeSelect}
                                </Input>
                            </FormGroup>
                            {this.state.delName !== "Select a Route" && (
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

export default RouteManage;
