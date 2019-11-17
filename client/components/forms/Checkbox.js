import styled from 'styled-components';
// const { string, arrayOf, shape } = PropTypes;

const { Component, PropTypes } = React;

const CheckboxWrapper = styled.div`
body {
  box-sizing: border-box;
  margin: 10px;
  color: #081f2c;
  font: 400 13px/20px 'Source Sans Pro', sans-serif;
}  

svg {
  display: block;
  width: 1em;
  height: 1em;
  fill: currentColor;
}

.select {
  position: relative;
  display: inline-block;
  width: 320px;
  
  &:focus {
    outline: 0;
    
    & .selection {
      box-shadow: 0 0 1px 1px #00a9e0;
    }
  }
}

.label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
}

.selection {
  position: relative;
  padding: 5px;
  border: 1px solid #000;
  background: #fff;
}

.value {
  position: relative;
  display: inline-block;
  padding: 5px 10px;
}

.multiple {
  padding-right: 30px;
  margin-right: 5px;
  background: #d9f2fb;
  color: #00a9e0;
}

.delete {
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  padding: 10px;
  font-size: 10px;
  cursor: pointer;
}

.placeholder {
  padding: 5px;
  color: #000;
  text-align: left;
}

.arrow {
  position: absolute;
  top: 5px;
  right: 5px;
  display: block;
  padding: 10px;
  font-size: 10px;
  color: #000
}

.options {
  position: relative;
  text-align: left;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  border: 1px solid #000;
  border-width: 0 1px;
  background: #fff;
}

.option {
  padding: 10px 15px;
  border-bottom: 1px solid #000;
  cursor: pointer;

  &.selected {
    border: 1px solid #00a9e0;
    margin: -1px -1px 0;
    background: #d9f2fb;
  }
  
  &.focused {
    background: #f5f5f5;
  }
}

.checkbox {
  content: '';
  vertical-align: top;
  display: inline-block;
  width: 16px;
  height: 16px;
  padding: 2px;
  border: 1px solid #000;
  border-radius: 2px;
  margin: 2px 12px 0 0;
  color: #fff;
  font-size: 10px;
  
  .selected & {
    border-color: #007da6;
    background: #00a9e0;
  }
}
`;

class Checkbox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            values: [],
            focusedValue: -1,
            isFocused: false,
            isOpen: false,
            typed: '',
        };

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);

        this.onClick = this.onClick.bind(this);
        this.onDeleteOption = this.onDeleteOption.bind(this);
        this.onHoverOption = this.onHoverOption.bind(this);
        this.onClickOption = this.onClickOption.bind(this);

        this.renderOption = this.renderOption.bind(this);
    }

    onFocus() {
        this.setState({
            isFocused: true,
        });
    }

    onBlur() {
        const { options, multiple } = this.props;

        this.setState((prevState) => {
            const { values } = prevState;

            if (multiple) {
                return {
                    focusedValue: -1,
                    isFocused: false,
                    isOpen: false,
                };
            }
            const value = values[0];

            let focusedValue = -1;

            if (value) {
                focusedValue = options.findIndex(option => option.value === value);
            }

            return {
                focusedValue,
                isFocused: false,
                isOpen: false,
            };
        });
    }

    onKeyDown(e) {
        const { options, multiple } = this.props;
        const { isOpen } = this.state;

        switch (e.key) {
        case ' ':
            e.preventDefault();
            if (isOpen) {
                if (multiple) {
                    this.setState((prevState) => {
                        const { focusedValue } = prevState;

                        if (focusedValue !== -1) {
                            const [...values] = prevState.values;
                            const value = options[focusedValue];
                            const index = values.indexOf(value);

                            if (index === -1) {
                                values.push(value);
                            } else {
                                values.splice(index, 1);
                            }
                            console.log(values);
                            return { values };
                        }
                    });
                }
            } else {
                this.setState({
                    isOpen: true,
                });
            }
            break;
        case 'Escape':
        case 'Tab':
            if (isOpen) {
                e.preventDefault();
                this.setState({
                    isOpen: false,
                });
            }
            break;
        case 'Enter':
            this.setState(prevState => ({
                isOpen: !prevState.isOpen,
            }));
            break;
        case 'ArrowDown':
            e.preventDefault();
            this.setState((prevState) => {
                let { focusedValue } = prevState;

                if (focusedValue < options.length - 1) {
                    focusedValue++;

                    if (multiple) {
                        return {
                            focusedValue,
                        };
                    }
                    return {
                        values: [options[focusedValue].value],
                        focusedValue,
                    };
                }
            });
            break;
        case 'ArrowUp':
            e.preventDefault();
            this.setState((prevState) => {
                let { focusedValue } = prevState;

                if (focusedValue > 0) {
                    focusedValue--;

                    if (multiple) {
                        return {
                            focusedValue,
                        };
                    }
                    return {
                        values: [options[focusedValue].value],
                        focusedValue,
                    };
                }
            });
            break;
        default:
            if (/^[a-z0-9]$/i.test(e.key)) {
                const char = e.key;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.setState({
                        typed: '',
                    });
                }, 1000);

                this.setState((prevState) => {
                    const typed = prevState.typed + char;
                    const re = new RegExp(`^${typed}`, 'i');
                    const index = options.findIndex(option => re.test(option.value));

                    if (index === -1) {
                        return {
                            typed,
                        };
                    }

                    if (multiple) {
                        return {
                            focusedValue: index,
                            typed,
                        };
                    }
                    return {
                        values: [options[index].value],
                        focusedValue: index,
                        typed,
                    };
                });
            }
            break;
        }
    }

    onClick() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
        }));
    }

    onDeleteOption(e) {
        const { value } = e.currentTarget.dataset;

        this.setState((prevState) => {
            const [...values] = prevState.values;
            const index = values.indexOf(value);

            values.splice(index, 1);

            return { values };
        });
    }

    onHoverOption(e) {
        const { options } = this.props;

        const { value } = e.currentTarget.dataset;
        const index = options.findIndex(option => option.value === value);

        this.setState({
            focusedValue: index,
        });
    }

    onClickOption(e) {
        const { multiple } = this.props;

        const { value } = e.currentTarget.dataset;
        console.log(value);

        this.setState((prevState) => {
            if (!multiple) {
                return {
                    values: [value],
                    isOpen: false,
                };
            }

            const [...values] = prevState.values;
            const index = values.indexOf(value);

            if (index === -1) {
                values.push(value);
            } else {
                values.splice(index, 1);
            }
            this.props.sendData(values);
            return { values };
        });
    }

    stopPropagation(e) {
        e.stopPropagation();
    }

    renderValues() {
        const { placeholder, multiple } = this.props;
        const { values } = this.state;

        if (values.length === 0) {
            return (
                <CheckboxWrapper className="placeholder">
                    { placeholder }
                </CheckboxWrapper>
            );
        }

        if (multiple) {
            return values.map(value => (
                <CheckboxWrapper>
                    <span
                        key={ value }
                        onClick={ this.stopPropagation }
                        className="multiple value"
                    >
                        { value }
                        <span
                            data-value={ value }
                            onClick={ this.onDeleteOption }
                            className="delete"
                        >
                            <X />
                        </span>
                    </span>

                </CheckboxWrapper>
            ));
        }

        return (
            <CheckboxWrapper className="value">
                { values[0] }
            </CheckboxWrapper>
        );
    }

    renderOptions() {
        const { options } = this.props;
        const { isOpen } = this.state;

        if (!isOpen) {
            return null;
        }

        return (
            <CheckboxWrapper className="options">
                { options.map(this.renderOption) }
            </CheckboxWrapper>
        );
    }

    renderOption(option, index) {
        const { multiple } = this.props;
        const { values, focusedValue } = this.state;

        const { value } = option;

        const selected = values.includes(value);

        let className = 'option';
        if (selected) className += ' selected';
        if (index === focusedValue) className += ' focused';

        return (
            <CheckboxWrapper
                key={ value }
                data-value={ value }
                className={ className }
                onMouseOver={ this.onHoverOption }
                onClick={ this.onClickOption }
            >
                { multiple
                    ? <span className="checkbox">
                        { selected ? <Check /> : null }
                    </span>
                    : null
                }
                { value }
            </CheckboxWrapper>
        );
    }

    render() {
        const { label } = this.props;
        const { isOpen } = this.state;

        return (
            <CheckboxWrapper
                className="select"
                tabIndex="0"
                onFocus={ this.onFocus }
                onBlur={ this.onBlur }
                onKeyDown={ this.onKeyDown }
            >
                <label className="label">{ label }</label>
                <CheckboxWrapper className="selection" onClick={ this.onClick }>
                    { this.renderValues() }
                    <span className="arrow">
                        { isOpen ? <ChevronUp /> : <ChevronDown /> }
                    </span>
                </CheckboxWrapper>
                { this.renderOptions() }
            </CheckboxWrapper>
        );
    }
}

export default Checkbox;

const ChevronDown = () => (
    <svg viewBox="0 0 10 7">
        <path d="M2.08578644,6.5 C1.69526215,6.89052429 1.69526215,7.52368927 2.08578644,7.91421356 C2.47631073,8.30473785 3.10947571,8.30473785 3.5,7.91421356 L8.20710678,3.20710678 L3.5,-1.5 C3.10947571,-1.89052429 2.47631073,-1.89052429 2.08578644,-1.5 C1.69526215,-1.10947571 1.69526215,-0.476310729 2.08578644,-0.0857864376 L5.37867966,3.20710678 L2.08578644,6.5 Z" transform="translate(5.000000, 3.207107) rotate(90.000000) translate(-5.000000, -3.207107) " />
    </svg>
);

const ChevronUp = () => (
    <svg viewBox="0 0 10 8">
        <path d="M2.08578644,7.29289322 C1.69526215,7.68341751 1.69526215,8.31658249 2.08578644,8.70710678 C2.47631073,9.09763107 3.10947571,9.09763107 3.5,8.70710678 L8.20710678,4 L3.5,-0.707106781 C3.10947571,-1.09763107 2.47631073,-1.09763107 2.08578644,-0.707106781 C1.69526215,-0.316582489 1.69526215,0.316582489 2.08578644,0.707106781 L5.37867966,4 L2.08578644,7.29289322 Z" transform="translate(5.000000, 4.000000) rotate(-90.000000) translate(-5.000000, -4.000000) " />
    </svg>
);

const X = () => (
    <svg viewBox="0 0 16 16">
        <path d="M2 .594l-1.406 1.406.688.719 5.281 5.281-5.281 5.281-.688.719 1.406 1.406.719-.688 5.281-5.281 5.281 5.281.719.688 1.406-1.406-.688-.719-5.281-5.281 5.281-5.281.688-.719-1.406-1.406-.719.688-5.281 5.281-5.281-5.281-.719-.688z" />
    </svg>
);

const Check = () => (
    <svg viewBox="0 0 16 16">
        <path d="M13 .156l-1.406 1.438-5.594 5.594-1.594-1.594-1.406-1.438-2.844 2.844 1.438 1.406 3 3 1.406 1.438 1.406-1.438 7-7 1.438-1.406-2.844-2.844z" transform="translate(0 1)" />
    </svg>
);
