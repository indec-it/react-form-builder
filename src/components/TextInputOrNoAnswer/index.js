import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Grid, ControlLabel, FormControl, FormGroup, Button} from 'react-bootstrap';

import {TextWithBadge} from '..';
import {getInputValue} from '../../util';

class TextInputOrNoAnswer extends Component {
    static displayName = 'textInputOrNoAnswer';

    static propTypes = {
        question: PropTypes.shape({}).isRequired,
        onChange: PropTypes.func.isRequired,
        answer: PropTypes.string,
        disabled: PropTypes.bool
    };

    static defaultProps = {
        answer: null,
        disabled: false
    };

    constructor(props) {
        super(props);
        this.state = {block: false};
    }

    handleChange(obj) {
        this.props.onChange(obj);
    }

    handleBlock(obj) {
        this.setState(() => ({block: !this.state.block}));
        this.props.onChange(obj);
    }

    render() {
        const {
            question, answer, disabled
        } = this.props;
        return (
            <Grid>
                {question.text && <TextWithBadge
                    question={question}
                />}
                <Row>
                    {!this.state.block &&
                        <FormGroup>
                            {question.floatingLabel && (
                                <ControlLabel>{question.floatingLabel}</ControlLabel>)
                            }
                            <FormControl
                                type="text"
                                value={getInputValue(answer)}
                                required
                                maxLength={question.maxLength}
                                onChange={text => this.handleChange({[question.name]: text})}
                                disabled={disabled}
                            />
                            <FormControl.Feedback/>
                        </FormGroup>}
                    {this.state.block &&
                    <span>
                        (Sin Nombre)
                    </span>}
                    <Button
                        title="S/N"
                        onCLick={() => this.handleBlock({[`${question.name}NoAnswer`]: !this.state.block})}
                        disabled={disabled}
                    />
                </Row>
            </Grid>
        );
    }
}

export default TextInputOrNoAnswer;
