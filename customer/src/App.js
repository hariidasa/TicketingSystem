import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";


class App extends Component {

    constructor(props, context) {
        super(props, context);

        this.state={
            showLogin: false,
            showRegister: false
        }
    }
    handleLoginShow = () => {
        this.setState({ showLogin: true })
    }

    handleLoginClose = () => {
        this.setState({ showLogin: false })
    }

    handleRegisterShow = () => {
        this.setState({ showRegister: true })
    }

    handleRegisterClose = () => {
        this.setState({ showRegister: false })
    }

    render() {
        return (
            <div>
                <LoginPage
                    showLogin={this.state.showLogin}
                    handleShow={this.handleLoginShow}
                    handleClose={this.handleLoginClose}
                    handleRegisterShow={this.handleRegisterShow}
                />

                <RegisterPage
                    showRegister={this.state.showRegister}
                    handleShow={this.handleRegisterShow}
                    handleClose={this.handleRegisterClose}
                    handleLoginShow={this.handleLoginShow}
                />
            </div>


    );
    }


}

export default App;
