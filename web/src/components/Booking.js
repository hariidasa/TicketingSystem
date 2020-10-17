import React from "react"
import {Container, Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {toast} from 'react-toastify';
import config from '../config';
import Select from "react-select";
import DatePicker from "react-datepicker";
import {Tab, Table} from "react-bootstrap";

class Booking extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            qty: '',
            fromOptions: 'Select ',
            toOptions: 'Select',
            trains: 'Select',
            classes:'Select a Class',
            time:'',
            date:'',
            errMsg: 'Required fields empty or invalid!!!',
            showErr: false,
        }

    }

    componentDidMount() {
        fetch(config.baseUrl + "/transroute/routes").then(res => res.json()).then(data => {
            this.setState({selectRoutes: data})
        })
        fetch(config.baseUrl + "/transroute/trains").then(res => res.json()).then(data => {
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
            fromOptions: this.state.fromOptions,
            toOptions: this.state.toOptions,
            trains: this.state.trains,
            classes: this.state.classes,
            time: this.state.time,
            date:this.state.date,
            qty:this.state.qty
        }

        const option = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(config.baseUrl + "/transroute/booking", option).then(res => res.json()).then(res => {
            if (res.routeExist) {
                toast.error("Route Already Exist")
            } else {
                toast.success("Train Created Successfully")
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

        fetch(config.baseUrl + "/transroute/booking", option).then(res => res.json()).then(res => {
            if (res.status) {
                toast.success("Train Deleted Successfully")
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

        const driverSelect = this.state.selectDrivers.map(driver => {
            return <option key={driver._id} value={driver.name}>{driver.name}</option>
        })

        const trainSelect = this.state.selectTrains.map(train => {
            return <option key={train._id} value={train.name}>{train.name}</option>
        })
        return (
                    <Form style={{ padding: 20 }} onSubmit={(e) => this.handleSubmit(e)}>
                        <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Form.Row style={{ width: '75%' }}>
                                <Form.Group as={Col} controlId="from">
                                    <Form.Label>From</Form.Label>
                                    <Select options={this.state.fromOptions} onChange={this.handleChange("from")} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="to">
                                    <Form.Label>To</Form.Label>
                                    <Select options={this.state.toOptions} onChange={this.handleChange("to")}
                                            value={this.state.to} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row style={{ width: '75%' }}>
                                <Form.Group as={Col} controlId="from">
                                    <Form.Label>Train</Form.Label>
                                    <Select options={this.state.trains} onChange={this.handleChange("train")}
                                            value={this.state.train} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="to">
                                    <Form.Label>Class</Form.Label>
                                    <Input type="select" name="classes" id="routeClass"
                                           value={this.state.classes} onChange={this.handleChange("trainClass")}>
                                        <option>Select a Class</option>
                                        <option>First Class</option>
                                        <option>Second Class</option>
                                        <option>Third Class</option>
                                    </Input>
                                    {/*<Input options={this.state.classes} value={this.state.trainClass} onChange={this.handleChange("trainClass")}>*/}
                                    {/*</Input>*/}
                                </Form.Group>
                            </Form.Row>
                            <Form.Row style={{ width: '75%' }}>
                                <Col md={6} lg={6} xl={6}>
                                    <Form.Label>Date</Form.Label>
                                    <DatePicker
                                        className="form-control"
                                        onChange={this.handleDateChange}
                                        minDate={new Date()}
                                        value={this.state.date}
                                        placeholderText="YYYY-MM-DD"
                                    />
                                </Col>
                                <Form.Group as={Col} controlId="time">
                                    <Form.Label>Time</Form.Label>
                                    <Input type="time"
                                           value={this.state.time} onChange={this.handleChange("time")}></Input>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row style={{ width: '75%', paddingBottom: 20 }}>
                                <Col md={6} lg={6} xl={6}>
                                    <Form.Label>No of Tickets</Form.Label>
                                    <Form.Control placeholder="qty" value={this.state.qty} onChange={this.handleQtyChange()} />
                                </Col>
                            </Form.Row>
                            <Form.Row style={{ width: '75%', paddingLeft: 5, align: 'right' }}>
                                {this.state.amount &&
                                <Table striped size="sm">
                                    <tbody>
                                    <tr>
                                        <td align='right' style={{ border: "1px solid #dee2e6" }}>Available Seats</td>
                                        <td align='right' style={{
                                            border: "1px solid #dee2e6",
                                            color: asColor
                                        }}>2</td>
                                    </tr>
                                    <tr style={{ border: "none" }}>
                                        <td style={{ border: "none" }} height="40" />
                                    </tr>
                                    <tr>
                                        <td align='right' style={{ border: "1px solid #dee2e6" }}>Amount</td>
                                        <td align='right' style={{ border: "1px solid #dee2e6" }}>500 LKR</td>
                                    </tr>
                                    <tr>
                                        <td align='right' style={{ border: "1px solid #dee2e6" }}>Discount</td>
                                        <td align='right' style={{ border: "1px solid #dee2e6" }}>0 LKR</td>
                                    </tr>
                                    <tr>
                                        <td align='right' style={{ border: "1px solid #dee2e6" }}>Total</td>
                                        <td align='right' style={{ border: "1px solid #dee2e6" }}>500 LKR</td>
                                    </tr>
                                    </tbody>
                                </Table>
                                }
                            </Form.Row>
                            <Form.Row style={{ width: '75%' }}>
                                {this.state.showErr && <p style={{ color: 'red' }}>{this.state.errMsg}</p>}
                            </Form.Row>
                            <Form.Row style={{ width: '75%', padding: 5 }}>
                                <Button variant="primary" type="submit" disabled={bookingDisable}>
                                    Make Reservation
                                </Button>
                            </Form.Row>
                        </Row>
                    </Form>

        );
    }
}

export default Booking;
