import { Component, createRef } from 'react';
import styled from 'styled-components';

import Textarea from './forms/Textarea';
import Checkbox from './forms/Checkbox';
import Select from './forms/Select';
import Flashes from './Flashes';

import { createFlash } from '../lib/flashes';
import { apiPost } from '../lib/api';

import nominationNames from '../data/users/nominationNames.json';
import compValues from '../data/users/values.json';

const FormWrapper = styled.div`
    &.inView {
            &.formwrapper {
                opacity:1;
                transform:translateY(0);
                transition:all 1.5s ease;
            }
    }
    &.formwrapper {
            opacity:0.01;
            transform:translateY(-50%);
            transition:all 1.5s ease;
    }
    #nominationForm {
        text-align: center;
    }
    .submitBtn {
        padding: 2rem 0;
    }

    .flash {
        padding-top: 2rem;
    }

    button {
        :hover {
            background: #00a9e0;
            color: #fff;
        }
    }

    a.voteBtn {
        display: none;
    }

`;

const listOfNames = nominationNames.map(name => ({
    value: name.id,
    label: name.title,
}));

listOfNames.unshift({
    value: '',
    label: 'Select one',
});

const listOfValues = compValues.map(value => ({
    value: value.id,
    label: value.title,
}));

listOfValues.unshift({
    value: '',
    label: 'Select one',
});

class Nomination extends Component {
    constructor(props) {
        super(props);
        this.flashesComponent = createRef();
        this.state = {
            nomId: '',
            nomIdisValid: true,
            name: '',
            textarea: '',
            textValid: true,
            status: 'active',
            isValid: true,
            valueId: '',
            values: [],
            valueValid: true,
            isOpen: false,
        };
    }

    componentDidMount() {
        $.fn.isInViewport = function () {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();

            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            return elementBottom > viewportTop && elementTop < viewportBottom;
        };

        $('.formwrapper').each(function () {
            if ($(this).isInViewport()) {
                $(this).addClass('inView');
            } else {
                $(this).removeClass('inView');
            }
        });
    }

    // State handlers
    getValues = (value) => {
        const allValues = [];
        allValues.push(value);
        this.setState({
            values: allValues,
        });
    }

    updateListofNamesState = (e) => {
        const { value } = e.target;
        const prettyName = listOfNames.map((name) => {
            if (value === name.value) {
                this.setState({ nomId: value, name: name.label });
            }
        });
    }

    updateListofValueState = (e) => {
        const { value } = e.target;
        const prettyValue = listOfValues.map((val) => {
            if (value === val.value) {
                this.setState({ valueId: value, value: val.label });
            }
        });
    }

    updateTextareaState = (e) => {
        const { value } = e.target;

        if (value.length < 0) {
            this.validateText(value);
        }

        this.setState({ textarea: value });
    }

    handleCheckboxChange = (e) => {
        this.setState({ checked: e.target.checked });
    }

    // Validation
    listOfNamesValid = () => {
        let { nomIdisValid } = this.state;
        if (this.state.nomId === '') {
            nomIdisValid = false;
        }
        return nomIdisValid;
    }

    listOfValuesValid = () => {
        let { valueIsValid } = this.state;
        if (this.state.value === '') {
            valueIsValid = false;
        }
        return valueIsValid;
    }

    textareaValid = () => {
        let { textValid } = this.state;
        if (this.state.textarea === '') {
            textValid = false;
        }
        return textValid;
    }

    valuesValid = () => {
        let { valueValid } = this.state;
        if (this.state.values === '') {
            valueValid = false;
        }
        return valueValid;
    }


    validateForm = () => {
        let { isValid } = this.state;
        const { nomId, textarea, values } = this.state;
        if (nomId === '') {
            isValid = false;
            // Add a flash error
            const flash = createFlash('error', 'Must give a reason for nomination.');

            this.flashesComponent.current.addFlash(flash);
        }
        if (textarea === '') {
            isValid = false;
            // Add a flash error
            const flash = createFlash('error', 'Must give a reason for nomination.');

            this.flashesComponent.current.addFlash(flash);
        }
        if (values.length === 0) {
            isValid = false;
            // Add a flash error
            const flash = createFlash('error', 'Must give a reason for nomination.');

            this.flashesComponent.current.addFlash(flash);
        }
        return isValid;
    };

    submitForm = async (e) => {
        e.preventDefault();
        const { nomIdisValid } = this.state;
        if (this.validateForm()) {
            const { user } = this.props;
            const {
                status,
                nomId,
                name,
                textarea,
                values,
            } = this.state;

            const response = await apiPost({}, '/nomination', {
                user,
                status,
                nomId,
                name,
                textarea,
                values,
            });

            if (response.status === 200) {
                const flash = createFlash('success', 'Nomination submitted');
                document.querySelector('button.submit').disabled = true;
                document.querySelector('.voteBtn').style.display = 'block';

                this.flashesComponent.current.addFlash(flash);
                return true;
            } if (response.status === 400) {
                const flash = createFlash('error', 'Email must be company email');

                this.flashesComponent.current.addFlash(flash);
            }
        } else {
            const flash = createFlash('error', 'Please fill in all fields.');
            this.flashesComponent.current.addFlash(flash);
            return nomIdisValid;
        }
    };

    render() {
        return (
            <FormWrapper className="formwrapper">
                <form id="nominationForm" onSubmit={this.submitForm}>
                    <Select
                        label="Who?"
                        name="nominationName"
                        value={this.state.nomId}
                        options={listOfNames}
                        changeState={this.updateListofNamesState}
                        isValid={this.state.listOfNamesValid}
                        errorMessage="Must choose a name"
                    />
                    <Textarea
                        class="textbox"
                        label="Why?"
                        name="textarea"
                        isValid={this.state.textareaValid}
                        value={this.state.textarea}
                        changeState={this.updateTextareaState}
                        errorMessage="Must give a reason"
                    />
                    <Checkbox
                        className="checkbox"
                        placeholder="Pick some values"
                        options={[
                            { value: 'Supportive' },
                            { value: 'Customer Centric' },
                            { value: 'Responsible' },
                            { value: 'Innovative' },
                            { value: 'Passionate' },
                            { value: 'Team Oriented' },
                        ]}
                        sendData={this.getValues}
                        onMouseLeave={this.handleHoverOff}
                        multiple
                    />
                    <div className="flash">
                        <Flashes
                            ref={this.flashesComponent}
                            flashes={this.props.flashes}
                        />
                    </div>
                    <div className="submitBtn">
                        <button type="submit" className="submit">Submit</button>
                    </div>
                    <a className="voteBtn" href='/voting'>Make a vote!</a>
                </form>
            </FormWrapper>
        );
    }
}

export default Nomination;
