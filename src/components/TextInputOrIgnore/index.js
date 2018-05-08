import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Checkbox, Row, Grid, ControlLabel, FormControl, FormGroup} from 'react-bootstrap';
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
    <Grid className={classNames('', {disabled})}>
        {question.text && <TextWithBadge
            question={question}
        />}
        <Row>
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
                onPress={() => handlePress(question, answer, onChange)}
                checked={isIgnored(question, answer)}
            />
        </Row>
    </Grid>
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
