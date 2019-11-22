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

    .passwordWrap {
        padding-top: 1rem;
    }

`;

class Login extends Component {
    static async getInitialProps(ctx) {
        if (redirectIfAuthenticated(ctx)) {
            return {};
        }

        return {};
    }

    componentDidMount() {
        this.getURL();
    }

    getURL = async () => {
        const response = await apiPost({}, '/valid', {});
        console.log("test" + response);

        document.querySelector('.vote').href = response;
    }

    constructor(props) {
        super(props);

        this.flashesComponent = createRef();
        this.state = {};
    }

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
                <a className="options vote">Google Login</a>
            </LoginStyle>
        );
    }
}

export default Login;
