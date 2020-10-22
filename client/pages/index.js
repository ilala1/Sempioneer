import { Component } from 'react';
import styled from 'styled-components';
import React from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";

import { getCookie, removeCookie } from '../lib/session';
import { login, redirectIfAuthenticated, redirectIfNotAuthenticated } from '../lib/auth';
import * as doneData from "../lib/doneloading.json";
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


  const defaultOptions2 = {
    loop: false,
    autoplay: true,
    animationData: doneData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  
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
            done: undefined
        };
    }

    componentDidMount() {
        // redirectIfNotAuthenticated();
        this.getUser()
        this.getTokens();

            this.setState({ loading: true });

            setTimeout(() => {
                const userCookie = getCookie({}, 'user');
                if (userCookie === undefined) {
                    console.log('no users present')
                    this.setState({
                        loading: true
                    })
                    window.location.replace("/login"); 
                } else {
                        console.log('user cookie present@')
                        this.setState({ done: true });
                        this.getUser(userCookie)
                        this.getTokens();
                    // const oneUser = await apiGet({}, '/oneUser', {userCookie});
                    
                    
                }
            }, 5000);
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

    getUser = async (cookie) => {
        console.log('getting user')
        const oneUser = await apiGet({}, '/oneUser', {cookie});
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
                {!this.state.done ? (
                    <FadeIn>
                        <div className="d-flex justify-content-center align-items-center">
                        <h1>Please wait</h1>
                        {!this.state.loading ? (
                            <h1>Testing</h1>
                        ) : (
                            <Lottie options={defaultOptions2} height={120} width={120} />
                        )}
                        </div>
                    </FadeIn>
                    ) : (

                    <Websites />
                )}
            </HomeStyle>
        );
    }
}

export default Home;
