import { Component } from 'react';
import styled from 'styled-components';

import { getCookie, removeCookie } from '../lib/session';
import { login, redirectIfAuthenticated, redirectIfNotAuthenticated } from '../lib/auth';
import { handleClientLoad } from '../lib/gsc';
import { apiGet, apiPost } from '../lib/api';

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
        // if (redirectIfNotAuthenticated(ctx)) {
        //     return { };
        // }
        // login();
        return { };
    }

    constructor(props) {
        super(props);
        this.state = {
            user: '',
        };
        
    }

    // componentDidUpdate() {
    //     this.getTokens();
    // }

    getTokens = async () => {
        console.log('tokenss');
        const testTokens = await apiPost({}, '/test', {});

        // console.log("test" + test);
        // if (response) {
        //     login();
        // }
        console.log(testTokens);
    }

    logout = () => {
        const userCookie = getCookie({}, 'user');
        if (userCookie) {
            removeCookie({}, 'user');
            window.location.reload();
        }
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
