import { Component } from 'react';
import styled from 'styled-components';

import { getCookie, removeCookie } from '../lib/session';
import { login, redirectIfAuthenticated, redirectIfNotAuthenticated } from '../lib/auth';
import { apiGet, apiPost } from '../lib/api';

import Nav from '../components/Nav';
import Header from '../components/Header';
import Options from '../components/Options';

import firebase, { auth, provider } from '../../config/config.js';

const HomeStyle = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2rem 0 10rem;
    #sign-in-or-out-button {
        margin-left: 25px
    }

    #revoke-access-button {
        display: none; 
        margin-left: 25px;
    }

    #auth-status {
        display: inline; 
        padding-left: 25px
    }
    @media only screen and (max-width: 640px) {
        padding: 0 2rem;
    }
`;

class Home extends Component {
    static async getInitialProps(ctx) {
        if (redirectIfNotAuthenticated(ctx)) {
            return { };
        }
        return { };
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    logout = () =>{
        auth.signOut().then(() => {
            this.setState({
                user: [],
                isLoggedIn: false,
            })
        })
    }

    render() {
        return (
            <HomeStyle>
                <Nav/>
                <Header title="What App do you want to use?" />
                <Options />

            </HomeStyle>
        );
    }
}

export default Home;
