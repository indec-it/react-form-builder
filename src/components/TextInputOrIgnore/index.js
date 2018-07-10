import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Checkbox, Row, ControlLabel, FormControl, FormGroup, Col} from 'react-bootstrap';
import classNames from 'classnames';

import {TextWithBadge} from '..';
import {getInputValue, handleChange} from '../../util';

const handlePress = ({name, ignoreValue}, answer, onChange) => (onChange({
    [name]: answer !== ignoreValue ? ignoreValue : null
}));

const isIgnored = ({ignoreValue}, answer) => answer === ignoreValue;

const TextInputOrIgnore = ({
    answer, question, onChange, disabled
}) => (
    <Row
        className={classNames(
            'height-question-separation',
            'textinput-ignore-question',
            {'question-disabled': disabled}
        )}
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
                            type="text"
                            value={getInputValue(answer)}
                            required
                            maxLength={question.maxLength}
                            onChange={text => handleChange(question, text, onChange)}
                            disabled={disabled}
                        />
                        <FormControl.Feedback/>
                    </FormGroup>
                    {question.textAfterInput &&
                    <p>
                        {question.textAfterInput}
                    </p>}
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

TextInputOrIgnore.displayName = 'textInputOrIgnore';

TextInputOrIgnore.propTypes = {
    question: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
    answer: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number
    ]),
    disabled: PropTypes.bool
};

TextInputOrIgnore.defaultProps = {
    answer: null,
    disabled: false
};

export default TextInputOrIgnore;
