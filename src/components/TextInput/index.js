import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, ControlLabel, FormControl, FormGroup} from 'react-bootstrap';
import classNames from 'classnames';

import {getInputValue, handleChangeText} from '../../util';
import {TextWithBadge} from '..';

const TextInput = ({
    answer, question, onChange, disabled
}) => (
    <Row className={classNames('height-question-separation', 'textinput-question', {'question-disabled': disabled})}>
        <Col sm={7}>
            {question.text && <TextWithBadge
                question={question}
            />}
        </Col>
        <Col sm={5}>
            <FormGroup>
                {question.floatingLabel && (
                    <ControlLabel>{question.floatingLabel}</ControlLabel>)
                }
                <FormControl
                    type="text"
                    value={getInputValue(answer)}
                    required
                    maxLength={question.maxLength}
                    onChange={text => handleChangeText(question.name, text, onChange)}
                    disabled={disabled}
                />
                <FormControl.Feedback/>
            </FormGroup>
            {question.textAfterInput && (
                <p>
                    {question.textAfterInput}
                </p>)
            }
        </Col>
    </Row>
);

TextInput.displayName = 'textInput';

TextInput.propTypes = {
    question: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
    answer: PropTypes.string,
    disabled: PropTypes.bool
};

TextInput.defaultProps = {
    answer: null,
    disabled: false
};

export default TextInput;
