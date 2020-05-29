import { Component } from 'react';
import styled from 'styled-components';

import { getCookie, removeCookie } from '../lib/session';

const NavWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 2rem 0;
    width: 100%;
    a {
        border: 1px solid black;
        padding: 0.65rem 0.8rem;
        color: #000;
        text-decoration: none;
        font-size: 1.45rem;
        :hover {
            background: #00a9e0;
            color: #fff;
        }
    }
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
    @media only screen and (max-width: 640px) {

    }
`;

class Nav extends Component {
    logout = () => {
        const userCookie = getCookie({}, 'user');
        const adminCookie = getCookie({}, 'admin');
        if (userCookie || adminCookie) {
            removeCookie({}, 'user');
            removeCookie({}, 'admin');
        }
        window.location.href='http://localhost:3000/login';
    }

    render() {
        return (
            <NavWrapper>
                <a href='/index'>
                    Home
                </a>
                <a href='/websites'>
                    Websites
                </a>
                <a href='/dashboard'>
                    Dashboard
                </a>
                <a href='/experiment'>
                    Experiment
                </a>
                <div className="logout">
                    <button onClick={this.logout}>Logout</button>
                </div>
            </NavWrapper>
        );
    }
}

export default Nav;
