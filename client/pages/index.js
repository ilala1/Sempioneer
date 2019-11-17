import { Component } from 'react';
import styled from 'styled-components';

import { getCookie, removeCookie } from '../lib/session';
import { redirectIfNotAuthenticated } from '../lib/auth';
import { handleClientLoad } from '../lib/gsc';

import Nav from '../components/Nav';
import Header from '../components/Header';
import Options from '../components/Options';

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
            user: '',
        };
    }

    componentDidMount() {
        const userCookie = getCookie({}, 'user');
        if (userCookie) {
            const user = userCookie.split('@')[0];
            this.setState({
                user,
            });
        }
    }

    googleSign = () => {
        document.querySelector('#sign-in-or-out-button').addEventListener('click', function() {
            console.log('hello');
        })
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



    render() {
        return (
            <HomeStyle>
                <Nav/>
                <Header title="What App do you want to use?" />
                <Options />
                
                <button id="sign-in-or-out-button">Sign In/Authorize</button>
                <button id="revoke-access-button">Revoke access</button>

                <div id="auth-status"></div><hr></hr>
            </HomeStyle>
        );
    }
}

export default Home;
