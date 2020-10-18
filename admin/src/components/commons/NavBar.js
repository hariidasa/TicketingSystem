import React, {Component} from 'react'

import {Navbar, Nav, NavDropdown, Image} from 'react-bootstrap'

class NavBar extends Component {

    render() {
        var user = localStorage.getItem('admin_user')
        if (user) {
            user = JSON.parse(user)
        }
        return (
            <Navbar  style={{backgroundColor: '#F58D3C'}}  expand="sm">
                <Navbar.Brand href="/">
                    <h3 style={{color:'rgba(255, 255, 255)'}}>
                     Public E - Ticketing - Administration
                  </h3>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {user ?
                            <>
                                <Nav.Link href="/"><h4>{'Home'}</h4></Nav.Link>
                                <Nav.Link href="/reports"><h5>{'Reports'}</h5></Nav.Link>
                                <Nav.Link href="/routeManage"><h5>{'Routes'}</h5></Nav.Link>
                                <Nav.Link href="/trainManage"><h5>{'Trains'}</h5></Nav.Link>
                                <Nav.Link href="/BusManage"><h5>{'Buses'}</h5></Nav.Link>
                                <Nav.Link href="/DriverManage"><h5>{'Drivers'}</h5></Nav.Link>
                                <Nav.Link href="/admins"><h5>{'Admins'}</h5></Nav.Link>
                                <Nav.Link href="/users"><h5>{'Users'}</h5></Nav.Link>
                                <NavDropdown title={user.fname} id="nav-dropdown" alignRight>
                                    <NavDropdown.Item onClick={this.props.logout}>Sign out</NavDropdown.Item>
                                </NavDropdown>
                                {(user.imageUrl) ? <Image src={user.imageUrl} width={40}/> :
                                    <Image src={require("../../images/login.png")} width={40}/>}
                            </>
                            :
                            <>
                                <Nav.Link href="" onClick={this.props.handleLoginShow}>Sign In</Nav.Link>
                            </>

                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavBar;