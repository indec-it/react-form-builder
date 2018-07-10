import React from 'react';
import PropTypes from 'prop-types';
import {Row, ControlLabel, FormControl, FormGroup, Col} from 'react-bootstrap';
import classNames from 'classnames';
import {TextWithBadge} from '..';
import {getInputValue, handleChangeNumber} from '../../util';

const DecimalInput = ({
    answer,
    question,
    onChange,
    disabled
}) => (

    <Row className={classNames('height-question-separation', 'decimal-question', {'question-disabled': disabled})}>
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
                    type="number"
                    value={getInputValue(answer)}
                    required
                    min={question.min}
                    max={question.max}
                    maxLength={question.maxLength}
                    onChange={text => handleChangeNumber(question, text, onChange)}
                    disabled={disabled}
                />
                <FormControl.Feedback/>
            </FormGroup>
            {question.textAfterInput &&
            <p>
                {question.textAfterInput}
            </p>}
        </Col>
    </Row>
);
DecimalInput.displayName = 'decimalInput';
DecimalInput.propTypes = {
    question: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
    answer: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    disabled: PropTypes.bool
};
DecimalInput.defaultProps = {
    answer: null,
    disabled: false
};
export default DecimalInput;
