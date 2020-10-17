import React, { Component } from 'react'
import { routes, route, trainsByRoute, classes, schedules, getBookedSeatsCount , buses} from '../Services'
import {Button, Form, Col, Row, Table, Tabs, Tab} from 'react-bootstrap'
import {Input} from 'reactstrap';
import Select from 'react-select'
import DatePicker from "react-datepicker"
import moment from 'moment'
import TimePicker from 'react-bootstrap-time-picker';
import config from '../config.json'
import { withRouter } from "react-router-dom";
class Home extends Component {

    constructor(props) {
        super(props);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.state = {
            qty: '',
            fromOptionsB: [],
            toOptionsB: [],
            classesB:[],
            selClassB:'',
            buses: [],
            fromOptions: [],
            toOptions: [],
            classes:[],
            selClass:'',
            trains: [],
            errMsg: 'Required fields empty or invalid!!!',
            showErr: false,
            time: 0,
            trainClasses:[
                {values:'First Class',label:'First Class'},
                {values:'Second Class',label:'Second Class'},
                {values:'Third Class',label:'Third Class'}
            ]




        };


    }

    handleTimeChange(time) {
        console.log(time);     // <- prints "3600" if "01:00" is picked
        this.setState({ time });
    }

    componentDidMount() {
        var options = []
        routes()
            .then(res => {
                res.map((item, i) => {
                    return item.route.map((station, i) => {
                        return options.push({
                            value: station.name,
                            label: station.name,
                            route: item._id,
                            id: i,
                            fair: station.fair
                        })
                    })
                })
                this.setState({ fromOptions: options })
            })
            .catch(err => {
                console.log(err)
            });
        var optionsB = []
        routes()
            .then(res => {
                res.map((item, i) => {
                    return item.route.map((station, i) => {
                        return optionsB.push({
                            value: station.name,
                            label: station.name,
                            route: item._id,
                            id: i,
                            fair: station.fair
                        })
                    })
                })
                this.setState({ fromOptionsB: optionsB })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleChange = type => async selectedOption => {
        await this.setState({ [type]: selectedOption, showErr: false }, () => {
            this.calculateFair()
        });
        if (type === 'from') {
            this.setState({ to: '', train: '' })
            route(selectedOption.route)
                .then(res => {
                    var options = [];
                    res.route.map((station, i) => {
                        if (selectedOption.value !== station.name) {
                            return options.push({
                                value: station.name,
                                label: station.name,
                                route: res._id,
                                id: i,
                                fair: station.fair
                            })
                        } else {
                            return null
                        }
                    })
                    this.setState({ toOptions: options })
                })
                .catch(err => {
                    console.log(err)
                })
            trainsByRoute(selectedOption.route)
                .then(res => {
                    var options = [];
                    res.map((train, i) => {
                        return options.push({
                            value: train.name,
                            label: train.name,
                            id: train._id,
                            classes: train.classes
                        })
                    })
                    this.setState({ trains: options })
                })
                .catch(err => {
                    console.log(err)
                })
        }

        this.updateAvailableSeats()

    }

    updateAvailableSeats = () => {
        if (this.state.date && this.state.time && this.state.trainClass && this.state.trains) {
            const tc = this.state.trains.find(item => item.value === this.state.train.value)
            if (tc && tc.classes) {
                const seats = tc.classes.find(item => item.name === this.state.trainClass.value).seats
                const state = this.state
                getBookedSeatsCount(state.train.value, state.trainClass.value, state.date, state.time.value).then(res => {
                    const bookings = res.bookings
                    const availableSeats = seats - bookings
                    this.setState({ availableSeats })
                })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }

    handleQtyChange = () => event => {
        if (event.target.value === "") {
            this.setState({ qty: 0 }, () => this.calculateFair())
        }
        if (Number.isInteger(parseInt(event.target.value))) {
            this.setState({ qty: parseInt(event.target.value) }, () => this.calculateFair())
        }
    }

    calculateFair = () => {
        var user = localStorage.getItem('user')
        if (user) {
            user = JSON.parse(user)
        }
        if (this.state.to && this.state.from && this.state.trainClass && this.state.qty) {
            console.log(this.state.trainClass)
            var amount = Math.abs(this.state.to.fair - this.state.from.fair) * this.state.trainClass.fairRatio * this.state.qty
            amount = amount.toFixed(2)
            var discount = (user && user.discount ? 0.1 * amount : 0).toFixed(2)
            var total = (amount - discount).toFixed(2)
            this.setState({ amount: amount, discount: discount, total: total })
        }
    }

    handleSubmit = event => {
        this.setState({ showErr: false })
        const state = this.state
        var user = localStorage.getItem('user')
        if (!user) {
            alert("Please Sign In Before Make a Reservation!!!")
            this.props.history.push('/')
        } else if (state.from && state.to && state.train && state.trainClass && state.time && state.qty && state.qty !== 0 && state.date) {
            event.preventDefault()
            this.props.history.push("/payment",{ ...this.state } )


        } else {
            this.setState({ showErr: true })
        }
        event.preventDefault()
        //event.stopPropagation()

    }

    handleDateChange = async dt => {
        const date = moment(dt).format('YYYY-MM-DD')
        await this.setState({ date: date })
        this.updateAvailableSeats()
    }
    handleChangeOne = type => async selectedOption => {
        await this.setState({ [type]: selectedOption, showErr: false }, () => {
            this.calculateFair()
        });
        if (type === 'from') {
            this.setState({ to: '', train: '' })
            route(selectedOption.route)
                .then(res => {
                    var options = [];
                    res.route.map((station, i) => {
                        if (selectedOption.value !== station.name) {
                            return options.push({
                                value: station.name,
                                label: station.name,
                                route: res._id,
                                id: i,
                                fair: station.fair
                            })
                        } else {
                            return null
                        }
                    })
                    this.setState({ toOptionsB: options })
                })
                .catch(err => {
                    console.log(err)
                })
            trainsByRoute(selectedOption.route)
                .then(res => {
                    var options = [];
                    res.map((train, i) => {
                        return options.push({
                            value: train.name,
                            label: train.name,
                            id: train._id,
                            classes: train.classes
                        })
                    })
                    this.setState({ buses: options })
                })
                .catch(err => {
                    console.log(err)
                })
        }

        this.updateAvailableSeats()

    }

    handleSubmitOne = event => {
        this.setState({ showErr: false })
        const state = this.state
        var user = localStorage.getItem('user')
        if (!user) {
            alert("Please Sign In Before Make a Reservation!!!")
            this.props.history.push('/')
        } else if (state.from && state.to && state.train && state.time && state.qty && state.qty !== 0 && state.date) {
            this.props.history.push("/payment", { ...this.state })
        } else {
            this.setState({ showErr: true })
        }
        event.preventDefault()
        event.stopPropagation()

    }
    handleQtyChangeOne = () => event => {
        if (event.target.value === "") {
            this.setState({ qty: 0 }, () => this.calculateFair())
        }
        if (Number.isInteger(parseInt(event.target.value))) {
            this.setState({ qty: parseInt(event.target.value) }, () => this.calculateFair())
        }
    }
    render() {
        const asColor = this.state.availableSeats < this.state.qty ? "red" : "black"
        const bookingDisable = this.state.availableSeats < this.state.qty
        return (
            <Tabs defaultActiveKey="bus" id="home">
                <Tab eventKey="bus" title="Bus Ticket">
                    <Form style={{ padding: 20 }} onSubmit={(e) => this.handleSubmitOne(e)}>
                    <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Form.Row style={{ width: '75%' }}>
                            <Form.Group as={Col} controlId="from">
                                <Form.Label>From</Form.Label>
                                <Select options={this.state.fromOptionsB} onChange={this.handleChangeOne("from")}
                                        value={this.state.from}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="to">
                                <Form.Label>To</Form.Label>
                                <Select options={this.state.toOptionsB} onChange={this.handleChangeOne("to")}
                                        value={this.state.to} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row style={{ width: '75%' }}>
                            <Form.Group as={Col} controlId="buses">
                                <Form.Label>Bus</Form.Label>
                                <Select options={this.state.buses} onChange={this.handleChangeOne("train")}
                                        value={this.state.train} />
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
                                <TimePicker onChange={this.handleTimeChange} value={this.state.time} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row style={{ width: '75%', paddingBottom: 20 }}>
                            <Col md={6} lg={6} xl={6}>
                                <Form.Label>No of Tickets</Form.Label>
                                <Form.Control placeholder="qty" value={this.state.qty} onChange={this.handleQtyChangeOne()} />
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
                                    }}>{this.state.availableSeats}</td>
                                </tr>
                                <tr style={{ border: "none" }}>
                                    <td style={{ border: "none" }} height="40" />
                                </tr>
                                <tr>
                                    <td align='right' style={{ border: "1px solid #dee2e6" }}>Amount</td>
                                    <td align='right' style={{ border: "1px solid #dee2e6" }}>200 LKR</td>
                                </tr>
                                <tr>
                                    <td align='right' style={{ border: "1px solid #dee2e6" }}>Discount</td>
                                    <td align='right' style={{ border: "1px solid #dee2e6" }}>10 LKR</td>
                                </tr>
                                <tr>
                                    <td align='right' style={{ border: "1px solid #dee2e6" }}>Total</td>
                                    <td align='right' style={{ border: "1px solid #dee2e6" }}>190 LKR</td>
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
                </Tab>
                <Tab eventKey="train" title="Train Ticket">
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
                                    <Select options={this.state.trainClasses} onChange={this.handleChange("trainClass")}
                                            value={this.state.trainClass}/>
                                    {/*<Input type="select" name="classes" id="routeClass"*/}
                                    {/*       value={this.state.classes} onChange={this.handleChange("trainClass")}*/}
                                    {/*>*/}

                                    {/*    <option>First Class</option>*/}
                                    {/*    <option>Second Class</option>*/}
                                    {/*    <option>Third Class</option>*/}
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
                                    <TimePicker onChange={this.handleTimeChange} value={this.state.time} />
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
                                        <td align='right' style={{ border: "1px solid #dee2e6" }}>500</td>
                                    </tr>
                                    <tr>
                                        <td align='right' style={{ border: "1px solid #dee2e6" }}>Discount</td>
                                        <td align='right' style={{ border: "1px solid #dee2e6" }}>0</td>
                                    </tr>
                                    <tr>
                                        <td align='right' style={{ border: "1px solid #dee2e6" }}>Total</td>
                                        <td align='right' style={{ border: "1px solid #dee2e6" }}>500</td>
                                    </tr>
                                    </tbody>
                                </Table>
                                }
                            </Form.Row>
                            <Form.Row style={{ width: '75%' }}>
                                {this.state.showErr && <p style={{ color: 'red' }}>{this.state.errMsg}</p>}
                            </Form.Row>
                            <Form.Row style={{ width: '75%', padding: 5 }}>
                                <Button variant="primary" type="submit" disabled={bookingDisable} >
                                    Make Reservation
                                </Button>
                            </Form.Row>
                        </Row>
                    </Form>
                </Tab>

            </Tabs>


        );
    }
}

export default withRouter(Home);
