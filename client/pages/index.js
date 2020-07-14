import { Component, createRef } from 'react';
import styled from 'styled-components';
import Flashes from '../components/Flashes';
import { apiGet, apiPost } from '../lib/api';
import { login, redirectIfAuthenticated, redirectIfNotAuthenticated } from '../lib/auth';
import { getCookie, removeCookie } from '../lib/session';

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
        if (redirectIfNotAuthenticated(ctx)) {
            return { };
        }
        return { };
    }

    constructor(props) {
        super(props);
        this.flashesComponent = createRef();
        this.state = {
            updatedNominations: [],
            user: ''
        };
    }

    componentDidMount() {
        this.getTokens();
    }

    getTokens = async () => {
        // get query from URL string
        var qs = (function(a) {
            if (a == "") return {};
            var b = {};
            for (var i = 0; i < a.length; ++i)
            {
                var p=a[i].split('=', 2);
                if (p.length == 1)
                    b[p[0]] = "";
                else
                    b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
            }
            return b;
        })(window.location.search.substr(1).split('&'));

        let authCode = qs["code"];
        console.log(authCode)
        if (authCode) {
            const response = await apiGet({}, '/index', {authCode});
            console.log(response);
    
            if (response) {
                login(response.uid);
                this.setState({
                    user: response.displayName
                })
            }
        }
    }

    getUser = async () => {
        const userCookie = getCookie({}, 'user');

        const oneUser = await apiGet({}, '/oneUser', {userCookie});
        console.log(oneUser)

        login(oneUser.uid);
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
