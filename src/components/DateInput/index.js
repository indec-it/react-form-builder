import React from 'react';
import PropTypes from 'prop-types';
import {Row, Grid} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import classNames from 'classnames';
import {TextWithBadge} from '..';
import {handleChange} from '../../util';

const DateInput = ({
    answer,
    question,
    onChange,
    disabled
}) => (
    <Grid className={classNames('', {disabled})}>
        <Row>
            {question.text && <TextWithBadge
                question={question}
            />}
            <DatePicker
                date={answer}
                placeholder={question.placeholder}
                format={question.format}
                minDate={question.minDate}
                maxDate={question.maxDate}
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                onChange={date => handleChange(question.name, date, onChange)}
                disabled={disabled}
            />
        </Row>
    </Grid>
);
DateInput.displayName = 'dateInput';
DateInput.propTypes = {
    question: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
    answer: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    disabled: PropTypes.bool
};
DateInput.defaultProps = {
    answer: null,
    disabled: false
};
export default DateInput;
