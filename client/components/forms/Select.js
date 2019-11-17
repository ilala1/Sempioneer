import { Component } from 'react';
import styled from 'styled-components';

const SelectStyle = styled.div`
    padding-top: 0.6rem;

    &:not(:first-of-type) { margin-top: 1rem; }

    .floatingLabel {
        position: relative;
        display: inline-block;

        border: 1px solid #000000;

        /* padding: 1.2rem 2rem; */
        margin-bottom: 0.6rem;

        .arrow {
            position: relative;
            z-index: 1;
        }

        label {
            position: absolute;

            pointer-events: none;

            top: 48%;
            transform: translateY(-52%);
            left: 0;

            padding: 0 2.45rem 0 0.8rem;

            background: white;

            transition: all .1s;
        }

        select {
            position: relative;
            z-index: 2;
            padding: 1.2rem 2rem;
            opacity: 1;
            width: 24rem;
            /* width: 17.55rem; */
            /* margin-right: 2.45rem; */

            opacity: 0;
        }

        svg {
            position: absolute;

            top: 48%;
            transform: translateY(-52%);
            right: 0.8rem;
            width: 1.1rem;
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

            select { opacity: 1; }
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
            isOpen: false,
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
    handleFocus = () => {
        this.showFloatingLabel(true);
        this.setState({ isOpen: true });
    }

    handleChange = (e) => {
        this.showFloatingLabel(true);
        // Continue to handler
        this.props.changeState(e);
        this.setState({ isOpen: false });
    }

    handleBlur = () => {
        this.showFloatingLabel(true);
        this.setState({ isOpen: false });
    }

    // Output
    render() {
        const { isOpen } = this.state;
        return (
            <SelectStyle>
                <div className={`floatingLabel${this.state.floatingLabelClass}${this.state.errorClass}`}>
                    <label htmlFor="email">{this.props.label}</label>
                    <select
                        name={this.props.name}
                        value={this.props.value}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}>
                        {this.props.options.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <span className="arrow">
                        { isOpen ? <ChevronUp /> : <ChevronDown /> }
                    </span>

                </div>

                {this.state.showHelperMessage && !this.state.showErrorMessage && (
                    <p className="helperMessage">{this.props.helperMessage}</p>
                )}

                {this.state.showErrorMessage && (
                    <p className="errorMessage">{this.props.errorMessage}</p>
                )}
            </SelectStyle>
        );
    }
}

export default Input;

const ChevronUp = () => (
    <svg viewBox="0 0 10 8">
        <path d="M2.08578644,7.29289322 C1.69526215,7.68341751 1.69526215,8.31658249 2.08578644,8.70710678 C2.47631073,9.09763107 3.10947571,9.09763107 3.5,8.70710678 L8.20710678,4 L3.5,-0.707106781 C3.10947571,-1.09763107 2.47631073,-1.09763107 2.08578644,-0.707106781 C1.69526215,-0.316582489 1.69526215,0.316582489 2.08578644,0.707106781 L5.37867966,4 L2.08578644,7.29289322 Z" transform="translate(5.000000, 4.000000) rotate(-90.000000) translate(-5.000000, -4.000000) " />
    </svg>
);
const ChevronDown = () => (
    <svg viewBox="0 0 10 7">
        <path d="M2.08578644,6.5 C1.69526215,6.89052429 1.69526215,7.52368927 2.08578644,7.91421356 C2.47631073,8.30473785 3.10947571,8.30473785 3.5,7.91421356 L8.20710678,3.20710678 L3.5,-1.5 C3.10947571,-1.89052429 2.47631073,-1.89052429 2.08578644,-1.5 C1.69526215,-1.10947571 1.69526215,-0.476310729 2.08578644,-0.0857864376 L5.37867966,3.20710678 L2.08578644,6.5 Z" transform="translate(5.000000, 3.207107) rotate(90.000000) translate(-5.000000, -3.207107) " />
    </svg>
);
