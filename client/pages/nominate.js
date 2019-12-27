import { Component } from 'react';
import styled from 'styled-components';

import { getCookie, removeCookie } from '../lib/session';

import { redirectIfNotAuthenticated } from '../lib/auth';
import Nomination from '../components/Nomination';
import Header from '../components/Header';
import Nav from '../components/Nav';
import { getWebsiteList } from '../../server/controllers/nominationController';

const HomeStyle = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2rem 0 10rem;
    h1 {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        text-align: center;
        letter-spacing: 0.6rem;
        padding: 7rem 0 5rem;
    }

    h3 {
        padding: 2rem 0;
    }

    span {
        color: #00a9e0;
    }
    @media only screen and (max-width: 640px) {
        h1 {
            padding-top: 2rem;
            letter-spacing: 0;
        }
    }
`;

class Nominate extends Component {
    static async getInitialProps(ctx) {
        if (redirectIfNotAuthenticated(ctx)) {
            return { };
        }
        return { };
    }

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         user: '',
    //     };
    // }

    componentDidMount() {
        // getWebsiteList();
        const userCookie = getCookie({}, 'user');
        // if (userCookie) {
        //     const user = userCookie.split('@')[0];
        //     this.setState({
        //         user,
        //     });
        // }
    }

    // getWebsiteList = async () => {
    //     const response = await apiPost({}, '/websites', {})
    //     console.log(response)
    //     return;
    // }

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
                <Header title="Submit your nomination" />
                <Nomination />
            </HomeStyle>
        );
    }
}

export default Nominate;
