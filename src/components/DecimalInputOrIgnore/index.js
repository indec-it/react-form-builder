import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Checkbox, Row, Col, ControlLabel, FormControl, FormGroup} from 'react-bootstrap';
import classNames from 'classnames';

import {TextWithBadge} from '..';
import {getInputValue, handleChangeNumber} from '../../util';

const handlePress = ({name, ignoreValue}, answer, onChange) => (onChange({
    [name]: answer !== ignoreValue ? ignoreValue : null
}));

const isIgnored = ({ignoreValue}, answer) => answer === ignoreValue;

const DecimalInputOrIgnore = ({
    answer, question, onChange, disabled
}) => (
    <Row
        className={classNames(
            'height-question-separation',
            'decimal-ignore-question',
            {'question-disabled': disabled})
        }
    >
        <Col sm={7}>
            {question.text && <TextWithBadge
                question={question}
            />}
        </Col>
        <Col sm={5}>

            {isIgnored(question, answer) ? '(Deshabilitado)' : (
                <Fragment>
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
                    <Row>
                        {question.textAfterInput}
                    </Row>}
                </Fragment>
            )}
            <Checkbox
                onChange={() => handlePress(question, answer, onChange)}
                checked={isIgnored(question, answer)}
            >
                <div className="label-checkbox-radio">Ignorar</div>
            </Checkbox>
        </Col>
    </Row>
);

DecimalInputOrIgnore.displayName = 'decimalInputOrIgnore';

DecimalInputOrIgnore.propTypes = {
    question: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
    answer: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.bool
    ]),
    disabled: PropTypes.bool
};

DecimalInputOrIgnore.defaultProps = {
    answer: null,
    disabled: false
};

export default DecimalInputOrIgnore;
