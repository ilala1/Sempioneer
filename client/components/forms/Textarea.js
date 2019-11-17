import { Component } from 'react';
import styled from 'styled-components';

const InputStyle = styled.div`
    padding: 0.6rem 0 1rem;

    &:not(:first-of-type) { margin-top: 1rem; }

    .floatingLabel {
        position: relative;
        display: inline-block;

        border: 1px solid #000000;

        padding: 1.2rem 2rem;
        margin-bottom: 0.6rem;

        label {
            position: absolute;

            pointer-events: none;

            top: 48%;
            transform: translateY(-52%);
            left: 0;

            padding: 0 0.8rem;

            background: white;

            transition: all .1s;
        }

        textarea {
            width: 20rem;
            opacity: 0;
        }

        &.show {
            label {
                top: -7px;
                transform: none;

                font-size: 1.1rem;

                padding: 0 0.6rem;
                margin-left: 0.2rem;

                color: #333333;
            }

            textarea { opacity: 1; }
        }

        &.error {
            border-color: #FF0000;

            &.show label { color: #FF0000; }
        }
    }

    .helperMessage, .errorMessage {
        font-size: 1.2rem;

        padding-left: 0.6rem;
    }

    .errorMessage { color: #FF0000; }
`;

class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            floatingLabelClass: (this.props.value.trim() !== '') ? ' show' : '',
            errorClass: '',
            showHelperMessage: true,
            showErrorMessage: false,
        };
    }

    componentDidUpdate(prevProps) {
        // Validation change
        if (prevProps.isValid !== this.props.isValid) {
            this.setState({
                showErrorMessage: !this.props.isValid,
                errorClass: (this.props.isValid) ? '' : ' error',
            });
        }

        // Value change
        if (prevProps.value !== this.props.value) {
            this.showFloatingLabel(this.props.value.trim().length > 0);
        }
    }

    showFloatingLabel = (show) => {
        const floatingLabelClass = (show) ? ' show' : '';

        this.setState({ floatingLabelClass });
    };

    // Event handlers
    handleFocus = () => this.showFloatingLabel(true);

    handleChange = (e) => {
        this.showFloatingLabel(e.target.value.trim().length > 0);

        // Continue to parent handler
        this.props.changeState(e);
    }

    handleBlur = e => this.showFloatingLabel(e.target.value.trim().length > 0);

    // Output
    render() {
        return (
            <InputStyle>
                <div className={`floatingLabel${this.state.floatingLabelClass}${this.state.errorClass}`}>
                    <label htmlFor="email">{this.props.label}</label>
                    <textarea
                        className={this.props.class}
                        name={this.props.name}
                        form={this.props.form}
                        value={this.props.value}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                    />
                </div>

                {this.state.showHelperMessage && !this.state.showErrorMessage && (
                    <p className="helperMessage">{this.props.helperMessage}</p>
                )}

                {this.state.showErrorMessage && (
                    <p className="errorMessage">{this.props.errorMessage}</p>
                )}
            </InputStyle>
        );
    }
}

export default Input;
