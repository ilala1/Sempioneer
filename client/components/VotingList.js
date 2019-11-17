import { Component } from 'react';
import styled from 'styled-components';
import Voting from './Voting';
import { apiPost } from '../lib/api';
import { getCookie } from '../lib/session';

const VotingListStyle = styled.div`
    padding-top: 2rem;
`;

class VotingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            user: '',
            nomId: '',
            prettyName: '',
            nominations: props.name,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.name !== this.props.name) {
            if (this.props.name.length > 0) {
                const token = getCookie({}, 'user');
                if (token) {
                    const user = token.split('@')[0];
                    this.setState({
                        loaded: true,
                        user,
                    });
                }
            }
            this.setState({
                nominations: this.props.name,
            });
        }
    }

    handleEvent = async (nominationId) => {
        const { nominations } = this.state;
        let nomId;
        let prettyName;
        const updatedList = nominations.map((nomination) => {
            if (nomination.id.id === nominationId) {
                nomId = nominationId;
                prettyName = nomination.id.title;
                console.log(nomination.id.title);
                // get who they are nominating
                this.setState({ nomId, prettyName });
            }
            return nomination;
        });

        this.setState({
            nominations: updatedList,
        });

        // get who is making the vote
        const token = getCookie({}, 'user');
        if (token) {
            const user = token.split('@')[0];
            this.setState({
                user,
            });
        }
        const { user } = this.state;

        const vote = { user, prettyName, nomId };
        console.log(vote);

        const response = await apiPost({}, '/vote', {
            vote,
        });

        console.log(response);

        this.props.getResponse(response);
    }

    render() {
        return (
            <VotingListStyle>
                {this.state.nominations && this.state.nominations.map(c => <Voting key={c._id} name={c.id.title} id={c.id.id} votes={c.votes} onVote={this.handleEvent} />)}
            </VotingListStyle>
        );
    }
}

export default VotingList;
