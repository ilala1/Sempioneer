import { Component } from 'react';
import styled from 'styled-components';

import { getCookie, removeCookie } from '../lib/session';
import { login, redirectIfAuthenticated, redirectIfNotAuthenticated } from '../lib/auth';
import { apiGet, apiPost } from '../lib/api';

import Nav from '../components/Nav';
import Header from '../components/Header';
import Options from '../components/Options';
import Websites from '../components/Websites';

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
    // static async getInitialProps(ctx) {
    //     if (redirectIfNotAuthenticated(ctx)) {
    //         return { };
    //     }
    //     return { };
    // }

    constructor(props) {
        super(props);
        this.state = {
            user: '',
        };
    }

    componentDidMount() {
        // redirectIfNotAuthenticated();
        this.getUser()
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
        console.log(userCookie);
        if (userCookie === 'undefined') {
            console.log('no users present')
            // window.location.replace("/login");
        } else {

            // login(oneUser.uid);
        }

        const oneUser = await apiGet({}, '/oneUser', {userCookie});
        console.log(oneUser)

    }

    logout = () => {
        const userCookie = getCookie({}, 'user');
        if (userCookie) {
            removeCookie({}, 'user');
            window.location.href = "localhost:3000/login";
        }
    }



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

export default Home;
