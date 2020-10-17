import React, {Component} from 'react'

import {Navbar, Nav, NavDropdown, Image, Row} from 'react-bootstrap'

class NavBar extends Component {

    render() {
        var user = localStorage.getItem('user')
        if (user) {
            console.log(JSON.stringify(user))
            user = JSON.parse(user)
        }
        return (
            <>
                <Navbar style={{backgroundColor: '#F58D3C'}} expand="sm">
                    <Navbar.Brand href="/">
                        Public E-Ticketing System
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {user ?
                                <>
                                    <Nav.Link href="/reservations">My Reservations</Nav.Link>
                                    <NavDropdown title={user.fname} id="nav-dropdown" alignRight>
                                        <NavDropdown.Item href="/account">Account Settings</NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item onClick={this.props.logout}>Sign out</NavDropdown.Item>
                                    </NavDropdown>
                                    {(user.imageUrl) ? <Image src={user.imageUrl} width={40}/> :
                                        <Image src={require("../../images/login.png")} width={40}/>}
                                </>
                                :
                                <>
                                    <Nav.Link href="" onClick={this.props.handleLoginShow}>Sign In</Nav.Link>
                                    <Nav.Link href="" onClick={this.props.handleRegisterShow}>Join Now</Nav.Link>
                                </>

                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Row style={{alignItems: 'center', justifyContent: 'center', width: '100%', margin: 0}}>
                    <div style={{width: '100%'}}>
                        <Image style={{width: '100%'}} src={require("../../images/publicTransport.jpg")}/>
                    </div>
                </Row>

                <Navbar style={{justifyContent: 'space-between',backgroundColor: '#E69D65'}} expand="sm">
                    <Navbar.Brand href="/"></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" data-collapsed="false">
                        <Nav className="mx-auto" >
                            <Nav.Link style={{color: 'rgba(255, 255, 255,0.8)'}} href="/"><h3>{'Home'}</h3></Nav.Link>
                            <Nav.Link style={{color: 'rgba(255, 255, 255,0.8)'}} href="/topUp"><h5>{'Reload Credits'}</h5></Nav.Link>
                            <Nav.Link style={{color: 'rgba(255, 255, 255,0.8)'}} href="/contact"><h5>{'Contact Us'}</h5></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        );
    }
}

export default NavBar;