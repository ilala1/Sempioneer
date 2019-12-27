import { Component, createRef } from 'react';
import styled from 'styled-components';
import Flashes from '../components/Flashes';
import { apiGet, apiPost } from '../lib/api';
import { getCookie, removeCookie } from '../lib/session';
import dataNominees from '../data/users/nominationNames.json';

import { redirectIfNotAuthenticated } from '../lib/auth';
import { createFlash } from '../lib/flashes';
import VotingList from '../components/VotingList';
import Header from '../components/Header';
import Nav from '../components/Nav';

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

class voting extends Component {
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
        };
    }

    async componentDidMount() {

        axios.post('http://flask-env.idjm3vkzsw.us-east-2.elasticbeanstalk.com/api/gsc_data/get_website_list/', {
            "Access_Token": "ya29.Il-3B-WV9EyrI3e9TojGv36WPHyWSWLc0Sp5MkD0eWTxHOveQwtA5q-fneubIhkF8deS7h_7ecglwtbp9KoBqsEmb2gW4kQPRLsabPnqjvn3-pd0640ih4zZ4xAY7--1qw",
            "Refresh_Token": "three",
            "Client_Secret": "two",
            "Authorization_Code": "one"
        })
        .then((res) => {
          console.log(`statusCode: ${res.statusCode}`)
          console.log(res)
        })
        .catch((error) => {
          console.error(error)
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

    // showHideDeleted = (nominations, include) => nominations.filter(user => (include || (!include && user.status !== 'deleted')));

    render() {
        return (
            <HomeStyle>
                <Nav/>
                <Header title="Submit your votes below" />
                <Flashes
                    ref={this.flashesComponent}
                    flashes={this.props.flashes}
                />
            </HomeStyle>
        );
    }
}

export default voting;
