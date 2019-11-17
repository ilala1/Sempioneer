import { Component } from 'react';
import styled from 'styled-components';

const VoteWrapper = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    margin-bottom: 2rem;
    h4 {
        text-align: left;
        padding-left: 2rem;
        width: 130px;
        /* word-wrap: break-word; */
    }
    button {
        border: 0;
        align-items: center;
        font-size: 2rem;
        padding: .5rem 1rem;
        :hover {
            background: #00a9e0;
            color: #fff;
        }
    }
`;

class Voting extends Component {
    handleClick = () => {
        this.props.onVote(this.props.id);
        const allButtons = document.querySelectorAll('.vote');

        for (let i = 0; i < allButtons.length; i++) {
            allButtons[i].disabled = true;
            allButtons[i].style.background = '#fefefe';
            allButtons[i].style.hover = '#fefefe';
        }
    }

    render() {
        return (
            <VoteWrapper>
                <button className="vote" onClick={this.handleClick}>+</button>
                <h4>{this.props.name}</h4>
            </VoteWrapper>
        );
    }
}

export default Voting;
