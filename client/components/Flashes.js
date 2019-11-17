import { Component } from 'react';
import styled from 'styled-components';

import { removeFlashes } from '../lib/flashes';

const FlashStyle = styled.aside`
    div {
        &:not(:first-of-type) { margin-top: 1.875rem; }

        display: flex;
        align-items: flex-start;
        justify-content: space-between;

        padding: 1rem 1.4rem;
        margin-top: 2rem;

        border: 2px solid #000000;

        font-size: 1.4rem;
        line-height: 2rem;
        color: #000000;

        p {
            flex: 1 1 auto;

            padding-right: 2rem;
        }

        button {
            flex: 0 0 auto;

            outline: none;
            border: none;

            cursor: pointer;

            font-size: 1.6rem;
        }

        &.success { border-color: #00FF00; }
        &.error { border-color: #FF0000; }
    }
`;

class Flash extends Component {
    constructor(props) {
        super(props);

        this.state = { flashes: this.props.flashes || [] };

        removeFlashes();
    }

    addFlash = (flash) => {
        const flashes = [...this.state.flashes];

        flashes.push(flash);

        this.setState({ flashes });
    }

    render() {
        if (this.state.flashes.length > 0) {
            return (
                <FlashStyle>
                    {this.state.flashes.map(flash => <div key={flash.key} className={flash.type}>
                        <p dangerouslySetInnerHTML={{ __html: flash.message }} />
                        <button onClick={() => { this.removeFlash(flash.key); }}>&#x2716;</button>
                    </div>)}
                </FlashStyle>
            );
        }

        return null;
    }

    removeFlash = (key) => {
        const flashes = [...this.state.flashes]
            .filter(flash => flash.key !== key);

        this.setState({ flashes });
    }
}

export default Flash;
