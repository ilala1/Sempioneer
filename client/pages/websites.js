import { Component, createRef } from 'react';
import styled from 'styled-components';
import Flashes from '../components/Flashes';
import { apiGet, apiPost } from '../lib/api';
import { getCookie, removeCookie } from '../lib/session';

import { redirectIfNotAuthenticated } from '../lib/auth';
import { createFlash } from '../lib/flashes';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Websites from '../components/Websites';

const axios = require('axios');

const HomeStyle = styled.section`
    padding: 2rem 0 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .buttonContainer {
        width: 100%;
        display: flex;
        align-items: center;
        .logout {
            margin-left: auto;
            padding-right: 2rem;
            button {
                border: 1px solid black;
                padding: 0.6rem 0.8rem;
                :hover {
                    background: #00a9e0;
                    color: #fff;
                }
            }
        }
        .nominate {
            justify-content: flex-start;
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

    }

    h1 {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        text-align: center;
        letter-spacing: 0.6rem;
        padding-top: 7rem;
    }

    h2 {
        padding-top: 2rem;
    }

    h3 {
        padding: 2rem 0;
    }

    button {
        border: 2px solid #000;
        padding: 1rem 2rem;
        :hover {
            background: #00a9e0;
            color: #fff;
        }
    }

`;

class websites extends Component {
    static async getInitialProps(ctx) {
        // redirectIfNotAuthenticated(ctx);
        // if (redirectIfNotAuthenticated(ctx)) {
        //     console.log('helloo')
        //     return { };
        // } else {
        //     console.log('not hello')
        // }
        return { };
    }

    constructor(props) {
        super(props);
        this.flashesComponent = createRef();
        this.state = {
            updatedNominations: [],
        };
    }

    logout = () => {
        const userCookie = getCookie({}, 'user');
        const adminCookie = getCookie({}, 'admin');
        if (userCookie || adminCookie) {
            removeCookie({}, 'user');
            removeCookie({}, 'admin');
            window.location.reload();
        }
    }

    // showHideDeleted = (nominations, include) => nominations.filter(user => (include || (!include && user.status !== 'deleted')));

    render() {
        return (
            <HomeStyle>
                <Nav/>
                <Header title="Select one website below to start creating your A/B tests." />
                <Websites />
            </HomeStyle>
        );
    }
}

export default websites;
