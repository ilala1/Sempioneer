import { Component } from 'react';
import 'babel-polyfill';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import Meta from './Meta';

const theme = {
    mediaMinimum: 'screen and (max-width: 640px)',
    mediaSmall: 'screen and (min-width: 640px) and (max-width: 900px)',
    mediaSmallDown: 'screen and (max-width: 900px)',
    mediaNormal: 'screen and (min-width: 901px) and (max-width: 1440px)',
    mediaMaximum: 'screen and (min-width: 1441px)',
    paddingMinimum: '1.2rem',
    paddingSmall: '2rem',
    paddingNormal: '3rem',
    paddingMaximum: 'calc(50vw - 144rem / 2)',
};

const GlobalStyle = createGlobalStyle`
    *, *:before, *:after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html {
        @media ${theme.mediaMinimum} { font-size: 3vw; }
        @media ${theme.mediaSmall} { font-size: 1.5vw; }
        @media ${theme.mediaNormal} { font-size: 10px; }
        @media ${theme.mediaMaximum} { font-size: 10px; }
    }

    body {
        font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
        font-size: 1.4rem;

        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        text-size-adjust: 100%;

            /*
        ----- FORM -----
    */

    input[type="text"],
    input[type="email"],
    input[type="number"],
    input[type="password"],
    input[type="date"],
    input[type="radio"],
    input[type="checkbox"],
    input[type="submit"],
    select,
    textarea {
        appearance: none;
        background: none;

        border: none;
        border-radius: 0;
        outline: none;

        font-size: 1.4rem;
    }
    
    button {
        background: none;

        outline: none;
        border: none;

        font-size: 1.4rem;
    }

    button,
    input[type="submit"],
    input[type="button"] { cursor: pointer; }

    form button {
        border: 1px solid black;

        padding: 0.6rem 0.8rem;
    }
    }
`;

class Page extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <>
                    <Meta />
                    <GlobalStyle />
                    {this.props.children}
                </>
            </ThemeProvider>
        );
    }
}

export default Page;
