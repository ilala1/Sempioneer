import PropTypes from 'prop-types';
import { Component } from 'react';
import styled from 'styled-components';

const InputStyle = styled.div`
    padding-top: 0.6rem;

    .floatingLabel {
        position: relative;
        display: inline-block;

        width: 22rem;

        border: 1px solid #000000;

        padding: 1rem 0.8rem;
        margin-bottom: 0.8rem;

        label {
            position: absolute;

            pointer-events: none;

            top: 50%;
            transform: translateY(-50%);
            left: 0;

            padding: 0 0.8rem;

            background: white;

            transition: all .1s;
        }

        input {
            width: 100%;

            opacity: 0;
        }

        &.show {
            label {
                top: -11px;
                transform: none;

                font-size: 1.1rem;

                padding: 0 0.6rem;
                margin-left: 0.2rem;

                color: #333333;
            }

            input { opacity: 1; }
        }

        &.error {
            border-color: #FF0000;

            &.show label { color: #FF0000; }
        }

        &.disabled { opacity: 0.3; }
    }

    .helperMessage, .errorMessage {
        font-size: 1.2rem;

        padding-left: 0.6rem;
    }

    .errorMessage { color: #FF0000; }


    /*
        ----- RESPONSIVE -----
    */

    @media ${props => props.theme.mediaMinimum} {
        .floatingLabel { width: 100%; }
    }
`;

class Input extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        value: PropTypes.string,
        isValid: PropTypes.bool,
        disabled: PropTypes.bool,
        changeState: PropTypes.func.isRequired,
        helperMessage: PropTypes.string,
        errorMessage: PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            floatingLabelClass: (this.props.value.trim() !== '') ? ' show' : '',
            errorClass: '',
            disabledClass: '',
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

        // Value change - from parent only (not a bounce from child onchange event)
        if (prevProps.value !== this.props.value && this.props.value !== this.state.value) {
            if (this.props.name === document.activeElement.name) { // Currently in focus
                this.showFloatingLabel(true);
            } else {
                this.showFloatingLabel(this.props.value.trim().length > 0);
            }
        }

        // Disabed change
        if (prevProps.disabled !== this.props.disabled) {
            this.setState({
                disabledClass: (this.props.disabled) ? ' disabled' : '',
            });
        }
    }

    showFloatingLabel = (show) => {
        const floatingLabelClass = (show) ? ' show' : '';

        this.setState({ floatingLabelClass });
    };

    // Event handlers
    handleFocus = () => this.showFloatingLabel(true);

    handleChange = (e) => {
        const { value } = e.target;

        this.setState({ value });

        // Continue to parent
        this.props.changeState(value);
    }

    handleBlur = e => this.showFloatingLabel(e.target.value.trim().length > 0);

    // Output
    render() {
        return (
            <InputStyle>
                <div className={`floatingLabel${this.state.floatingLabelClass}${this.state.errorClass}${this.state.disabledClass}`}>
                    <label>{this.props.label}</label>
                    <input
                        type={this.props.type}
                        name={this.props.name}
                        value={this.props.value}
                        disabled={this.props.disabled}
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
