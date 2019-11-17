import { Component, createRef } from 'react';
import styled from 'styled-components';
import Flashes from '../components/Flashes';
import { apiGet } from '../lib/api';
import { getCookie, removeCookie } from '../lib/session';
import dataNominees from '../data/users/nominationNames.json';

import { redirectIfNotAuthenticated } from '../lib/auth';
import { createFlash } from '../lib/flashes';
import VotingList from '../components/VotingList';
import Header from '../components/Header';
import Nav from '../components/Nav';

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
        const allNominations = await apiGet({}, '/nominations');
        const allNoms = allNominations.map(nominee => this.formatNominee(nominee));

        const { includeDeleted } = false;
        const updatedNominations = this.showHideDeleted(allNoms, includeDeleted);

        // only show nominations from current month
        const date = new Date();
        const month = date.getMonth() + 1;
        const thisMonthsNoms = [];
        const nominationsSplit = updatedNominations.map((nom) => {
            let extracted = null;
            const split = nom.createdAt.split('-');
            if (split.length === 3) {
                extracted = split[1];
                if (extracted.includes(month)) {
                    thisMonthsNoms.push(nom);
                }
            }
        });
        const cleanList = this.getUnique(thisMonthsNoms, 'id');
        console.log(cleanList);
        if (cleanList.length === 0) {
            console.log('empty');
            const flash = createFlash('message', 'No nominations made for current month. <a href="/nominate">Make a nomination</a>');
            this.flashesComponent.current.addFlash(flash);
        }
        this.setState({ updatedNominations: cleanList });
    }

    // get rid of duplicates in array
    getUnique = (nominations, comp) => {
        const unique = nominations
            .map(e => e[comp])

            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)

            // eliminate the dead keys & store unique objects
            .filter(e => nominations[e]).map(e => nominations[e]);

        return unique;
    }

    addFlash = (flash) => {
        console.log(flash);
        this.flashesComponent.current.addFlash(flash);
    };

    formatNominee = (nominee) => {
        const updatedNominee = nominee;
        const personObj = dataNominees.find(a => a.id === nominee.nomId);

        updatedNominee.id = personObj;

        return updatedNominee;
    };

    voteSuccess = (response) => {
        if (response.status === 200) {
            const flash = createFlash('success', 'Vote submitted');
            this.flashesComponent.current.addFlash(flash);
        }
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

    showHideDeleted = (nominations, include) => nominations.filter(user => (include || (!include && user.status !== 'deleted')));

    render() {
        return (
            <HomeStyle>
                <Nav/>
                <Header title="Submit your votes below" />
                <Flashes
                    ref={this.flashesComponent}
                    flashes={this.props.flashes}
                />
                <VotingList name={this.state.updatedNominations} getResponse={this.voteSuccess} />
            </HomeStyle>
        );
    }
}

export default voting;
