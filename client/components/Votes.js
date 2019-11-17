// import React from 'react';
import { Component, createRef } from 'react';

import ParticleEffectButton from 'react-particle-effect-button';
import styled from 'styled-components';
import { apiGet } from '../lib/api';

import Flashes from './Flashes';
import { createFlash } from '../lib/flashes';

const VoteStyles = styled.aside`
    padding: 2rem;
    text-align: center;
    button {
        padding: 1rem 2rem;
        border: 1px solid #000;
        :hover {
            background: #00a9e0;
            color: #fff;
        }

    }
    .result {
        margin-top: -6rem;
        font-size: 5rem;
    }

    .flash {
        padding-top: 10rem;
    }
`;

class Votes extends Component {
    constructor(props) {
        super(props);
        this.flashesComponent = createRef();
        this.state = {
            hidden: false,
        };
    }

    handleEvent = async () => {
        const allVotesObj = await apiGet({}, '/allVotes');
        if (allVotesObj.length === 0) {
            // Add a flash error
            const flash = createFlash('error', 'No votes.');

            this.flashesComponent.current.addFlash(flash);
        }
        // only show votes from current month
        const names = [];
        const date = new Date();
        const month = date.getMonth() + 1;
        const thisMonthsNoms = [];
        const votesSplit = allVotesObj.map((nom) => {
            let extracted = null;
            const split = nom.createdAt.split('-');
            if (split.length === 3) {
                extracted = split[1];
                if (extracted.includes(month)) {
                    thisMonthsNoms.push(nom);
                }
            }
        });

        // Puts all votes into array of just names
        const allNames = thisMonthsNoms.map((votee) => {
            names.push(votee.prettyName);
        });

        // count number of votes for each person and put into results object
        const result = { };
        for (let i = 0; i < names.length; ++i) {
            if (!result[names[i]]) { result[names[i]] = 0; }
            ++result[names[i]];
        }

        // Gets winner from results object
        if (names.length === 0) { return null; }
        const modeMap = {};
        let maxEl = names[0];
        let maxCount = 1;
        for (let i = 0; i < names.length; i++) {
            const el = names[i];
            if (modeMap[el] == null) { modeMap[el] = 1; } else { modeMap[el]++; }
            if (modeMap[el] > maxCount) {
                maxEl = el;
                maxCount = modeMap[el];
            }
        }
        const winner = maxEl;
        document.querySelector('.result').innerHTML = `${winner}!!`;
        this.setState({
            hidden: true,
        });
        return maxEl;
    }

    render() {
        return (
            <div>
                <VoteStyles>
                    <h2>The winner is: </h2>
                    <ParticleEffectButton
                        color='#121019'
                        hidden={this.state.hidden}
                    >
                        <button onClick={this.handleEvent}>Find out!</button>

                    </ParticleEffectButton>
                    <div className="result"></div>
                    <div className="flash">
                        <Flashes
                            ref={this.flashesComponent}
                            flashes={this.props.flashes}
                        />
                    </div>
                </VoteStyles>
            </div>
        );
    }
}

export default Votes;
