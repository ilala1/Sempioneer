import { Component, createRef } from 'react';
import styled from 'styled-components';

import Nominations from '../components/Nominations';
import Votes from '../components/Votes';
import Flashes from '../components/Flashes';

import { getCookie, removeCookie } from '../lib/session';
import { redirectIfNoAccess } from '../lib/auth';

const UserStyles = styled.aside`
    padding: 2rem;
    .logout {
        padding-top: 2rem;
        text-align: right;
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
    h2 {
        text-align:center;
        padding: 0rem 0 3rem;
    }
`;


class nominations extends Component {
    static async getInitialProps(ctx) {
        if (redirectIfNoAccess(ctx)) {
            return {};
        }

        return {};
    }

    constructor(props) {
        super(props);
        this.flashesComponent = createRef();
        this.state = { id: '' };
    }

    // State handlers
    idState = id => this.setState({ id });

    // Event handlers
    addFlash = (flash) => {
        console.log(flash);
        this.flashesComponent.current.addFlash(flash);
    };

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
            <UserStyles>
                <div className="logout">
                    <button onClick={this.logout}>Logout</button>
                </div>
                <Flashes
                    ref={this.flashesComponent}
                    flashes={this.props.flashes}
                />
                <Nominations
                    addFlash={this.addFlash}
                    selectForEdit={this.idState}
                />
                <Votes />
            </UserStyles>
        );
    }
}

export default nominations;
