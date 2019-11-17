import { Component } from 'react';
import styled from 'styled-components';

import Input from './forms/Input';
import Textarea from './forms/Textarea';

import {
    apiGet,
    apiPut,
} from '../lib/api';
import { createFlash } from '../lib/flashes';
import { entryValidate } from '../lib/validation';

const AddFormStyles = styled.aside`
    margin-bottom: 3rem;
    display: none;
    .editForm {
        text-align:center;
        h1 {
            padding-bottom: 2rem;
        }

        .floatingLabel {
            padding: 1.2em 1rem;
        }
        .editBtn {
            margin-left: auto;
            margin-right: auto;
            :hover {
                background: #00a9e0;
                color: #fff;
            }
        }
    }
    .buttons {
        display: flex;
        justify-content: center;
        align-items: center;

        margin-top: 2rem;

        >* { flex: 0 0 auto; }

        button:not(:first-of-type) { margin-left: 2rem; }

        .confirm {
            display: flex;
            align-items: center;

            >* {
                flex: 0 0 auto;

                margin-left: 2rem;
            }
        }
    }

    @media only screen and (max-width: 640px) {
        margin-bottom: 0;
        .floatingLabel {
            width: 100%;
        }
    }

    @media only screen and (min-width: 641px) and (max-width: 900px) {
        margin-bottom: 0;
    }
`;

class EditForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nomId: '',
            name: '',
            nomIdValid: true,
            textarea: '',
            textareaValid: true,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            if (this.props.id !== '') {
                this.loadUser(this.props.id);
            }
        }
    }

    // State handlers
    nameState = (value) => {
        this.setState({
            nomId: value,
            nomIdValid: entryValidate(value),
        });
    }

    textareaState = (e) => {
        const { value } = e.target;
        this.setState({
            textarea: value,
            textareaValid: entryValidate(value),
        });
    }

    loadUser = async (id) => {
        const { nomination } = await apiGet({}, `/nomination/${id}`);
        console.log(nomination);
        const { name } = nomination;

        document.querySelector('.editFormWrapper').style.display = 'block';
        this.setState({
            name,
            textarea: nomination.textarea,
        });
    }

    deleteUser = async () => {
        const { id } = this.props;
        const { nomination } = await apiGet({}, `/nomination/${id}`);
        // Update
        const response = await apiPut({}, `/delete/${id}`, {
            nomination,
        });
        if (response.success) {
            setTimeout(() => {
                window.location.reload(1);
            }, 2000);
            this.props.addFlash(createFlash('success', response.success));
        }
        return response;
    }

    editUser = async (e) => {
        e.preventDefault();

        // Submit
        const {
            textarea,
        } = this.state;
        console.log(this.state);
        const { id } = this.props;

        const nomination = { textarea };

        // Update
        const response = await apiPut({}, `/nomination/${id}`, {
            nomination,
        });
        if (response.success) {
            setTimeout(() => {
                window.location.reload(1);
            }, 2000);
            this.props.addFlash(createFlash('success', response.success));
        }
        return response;
    }

    // Output
    render() {
        return (
            <AddFormStyles className="editFormWrapper">
                <form className="editForm" onSubmit={this.editUser}>
                    <h1>Edit Nomination</h1>
                    <Input
                        label="Nominee"
                        type="text"
                        name="firstName"
                        value={this.state.name}
                        changeState={this.nameState}
                        errorMessage="Must enter a first name"
                        disabled
                    />
                    <Textarea
                        class="textbox"
                        label="Why?"
                        name="textarea"
                        value={this.state.textarea}
                        changeState={this.textareaState}
                        errorMessage="Must enter a last name"
                    />

                    <div className="buttons">
                        <button className="editBtn" type="submit">Edit</button>
                    </div>
                </form>
                <div className="buttons">
                    <button className="deleteBtn" onClick={this.deleteUser}>Delete</button>
                </div>
            </AddFormStyles>
        );
    }
}

export default EditForm;
