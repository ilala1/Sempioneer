import { Component, createRef } from 'react';
import styled from 'styled-components';

import Input from '../components/forms/Input';
import Header from '../components/Header';
import Flashes from '../components/Flashes';

import { createFlash } from '../lib/flashes';
import { adminLogin, redirectIfAuthenticated } from '../lib/auth';
import { emailValidate, passwordValidate } from '../lib/validation';

const LoginStyle = styled.section`
    padding: 2rem 0 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .login {
        padding-top: 2rem;
        margin-right: auto;
            padding-left: 2rem;
            .button {
                text-decoration:none;
                color: #000;
                border: 1px solid black;
                padding: 0.6rem 0.8rem;
                :hover {
                    background: #00a9e0;
                    color: #fff;
                }
            }
    }

    h2 { 
        padding-top: 7rem;
        margin: 2rem 0 1.2rem; 
    }

    button { margin-top: 1.6rem; }

    p { 
        margin-bottom: 1.4rem; 
    }

    .adminBtn {
        text-align: center;
    }

    .adminForm {
        padding-top: 2rem;
    }
`;

class Admin extends Component {
    static async getInitialProps(ctx) {
        if (redirectIfAuthenticated(ctx)) {
            return {};
        }

        return {};
    }

    constructor(props) {
        super(props);

        this.flashesComponent = createRef();

        this.state = {
            email: '',
            emailValid: true,
            password: '',
            passwordValid: true,
        };
    }

    // State handlers
    updateEmailState = (value) => {
        if (value.length === 0 || value.length > 2) {
            this.validateEmail(value);
        }
        this.setState({ email: value });
    }

    updatePasswordState = (value) => {
        if (value.length === 0 || value.length > 2) {
            this.validatePassword(value);
        }
        this.setState({ password: value });
    }

    // Validation
    validateEmail = (value) => {
        const email = value.trim();
        let emailValid = '';
        if (email === 'gareth@enigma.tech') {
            emailValid = (email.length > 0 && emailValidate(email));
            this.setState({ emailValid });
            return emailValid;
        }
        this.setState({ emailValid });
        return emailValid;
    };

    validatePassword = (value) => {
        const password = value.trim();
        let passwordValid = '';
        if (password === 'Test!234') {
            passwordValid = (password.length > 0 && passwordValidate(password));
            this.setState({ passwordValid });
            return passwordValid;
        }
        this.setState({ passwordValid });
        return passwordValid;
    }

    validateForm = () => {
        let isValid = true;

        if (!this.validateEmail(this.state.email)) {
            isValid = false;
            // Add a flash error
            const flash = createFlash('error', 'Incorrect email or password.');

            this.flashesComponent.current.addFlash(flash);
        }

        if (!this.validatePassword(this.state.password)) {
            isValid = false;
        }

        return isValid;
    };

    // Event handlers
    submitForm = async (e) => {
        e.preventDefault();
        if (this.validateForm()) {
            adminLogin(this.state.email, this.state.password);
        } else {
            return {};
        }
    };

    render() {
        return (
            <LoginStyle>
                <div className="login">
                    <a href="/login" className='button'>Back to Login</a>
                </div>
                <Header title="Admin Login" />
                <Flashes
                    ref={this.flashesComponent}
                    flashes={this.props.flashes}
                />
                <form className="adminForm" onSubmit={this.submitForm}>
                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        value={this.state.email}
                        changeState={this.updateEmailState}
                        isValid={this.state.emailValid}
                        helperMessage="* Required"
                        errorMessage="Please enter correct email address"
                    />

                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={this.state.password}
                        changeState={this.updatePasswordState}
                        isValid={this.state.passwordValid}
                        helperMessage="* Required"
                        errorMessage="Please enter correct password"
                    />
                    <div className="adminBtn">
                        <button type="submit">Login</button>
                    </div>
                </form>
            </LoginStyle>
        );
    }
}

export default Admin;
