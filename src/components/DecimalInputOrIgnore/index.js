import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Checkbox, Row, Grid, ControlLabel, FormControl, FormGroup} from 'react-bootstrap';
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
                onPress={() => handlePress(question, answer, onChange)}
                checked={isIgnored(question, answer)}
            />
        </Row>
    </Grid>
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
