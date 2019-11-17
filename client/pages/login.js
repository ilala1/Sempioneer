import { Component, createRef } from 'react';
import styled from 'styled-components';
import Flashes from '../components/Flashes';
import Input from '../components/forms/Input';

import Header from '../components/Header';

import { createFlash } from '../lib/flashes';
import { login, redirectIfAuthenticated } from '../lib/auth';
import { emailValidate, passwordValidate } from '../lib/validation';
import { apiPost } from '../lib/api';

// import { login } from '../services/userApi';

const LoginStyle = styled.section`
    padding: 2rem 0 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .admin {
        margin-left: auto;
        padding-top: 2rem;
        padding-right: 2rem;
        .button {
            text-decoration: none;
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
        margin-bottom: 1.2rem;
    }

    button { 
        margin-top: 1.6rem; 
        text-align: center;
        :hover {
            background: #00a9e0;
            color: #fff;
        } 
    }

    >p { margin-top: 1.4rem; }

    .login {
        padding-top: 2rem;
    }

    .loginBtn {
        text-align: center;
    }

`;

class Login extends Component {
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
        if (email) {
            emailValid = (email.length > 0 && emailValidate(email));
            this.setState({ emailValid });
            return emailValid;
        }
        this.setState({ emailValid });
        return emailValid;
    };

    validatePassword = (value) => {
        const password = value;
        console.log(password);
        let passwordValid = '';
        if (password.endsWith('Test!234')) {
            passwordValid = (password.length > 0 && passwordValidate(password));
            this.setState({ passwordValid });
            return passwordValid;
        }
        this.setState({ passwordValid });
        console.log(this.state.passwordValid)
        return passwordValid;
    };

    validateForm = () => {
        let isValid = true;

        if (!this.validatePassword(this.state.password)) {
            isValid = false;
            // Add a flash error
            const flash = createFlash('error', 'Wrong Email or Password');

            this.flashesComponent.current.addFlash(flash);
        }

        return isValid;
    };

    // Event handlers
    submitForm = async (e) => {
        e.preventDefault();
        if (this.validateForm()) {
            const { email, password } = this.state;
            const response = await apiPost({}, '/valid', {
                email,
                password,
            });

            if (response.status === 200) {
                login(this.state.email);
            } else if (response.status === 400) {
                const flash = createFlash('error', 'Wrong Email and password');

                this.flashesComponent.current.addFlash(flash);
            }
        }

        return {};
    };

    render() {
        return (
            <LoginStyle>
                <div className="admin">
                    <a href="/admin" className='button'>Admin</a>
                </div>
                <Header title="Login"/>
                <Flashes
                    ref={this.flashesComponent}
                    flashes={this.props.flashes}
                />
                <form className="login" onSubmit={this.submitForm}>
                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        value={this.state.email}
                        changeState={this.updateEmailState}
                        isValid={this.state.emailValid}
                        helperMessage="* Required"
                        errorMessage="Must be a valid Enigma address"
                    />
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={this.state.password}
                        changeState={this.updatePasswordState}
                        isValid={this.state.passwordValid}
                        helperMessage="* Required"
                        errorMessage="Wrong password"
                    />
                    <div className="loginBtn">
                        <button type="submit">Login</button>
                    </div>
                </form>
            </LoginStyle>
        );
    }
}

export default Login;
