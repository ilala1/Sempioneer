import { Component } from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2rem 0;
    h1 {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        text-align: center;
        letter-spacing: 0.6rem;
        padding: 7rem 0 5rem;
        font-size: 2rem;
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

class Header extends Component {
    render() {
        return (
            <HeaderWrapper>
                <h1><span>D</span>o&nbsp;<span>G</span>reat&nbsp;<span>W</span>ork&nbsp;<span>W</span>in&nbsp;<span>P</span>rizes</h1>
                <img src="./static/images/logo.png" alt="logo" />
                <h3>{this.props.title}</h3>
            </HeaderWrapper>
        );
    }
}

export default Header;
