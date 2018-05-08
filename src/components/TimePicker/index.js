import React from 'react';
import PropTypes from 'prop-types';
import {Row} from 'react-bootstrap';
import TimePicker from 'rc-time-picker';
import classNames from 'classnames';

import {TextWithBadge} from '..';
import {handleChange} from '../../util';

const TimePickerComponent = ({
    answer, question, onChange, disabled
}) => (
    <Row className={classNames('', {disabled})}>
        {question.text && <TextWithBadge
            question={question}
        />}
        <TimePicker
            value={answer}
            placeholder={question.placeholder}
            showSecond={false}
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            onChange={date => handleChange(question.name, date, onChange)}
            inputReadOnly={disabled}
        />
    </Row>
);

TimePickerComponent.displayName = 'timePicker';

TimePickerComponent.propTypes = {
    question: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
    answer: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    disabled: PropTypes.bool
};

TimePickerComponent.defaultProps = {
    answer: null,
    disabled: false
};

export default TimePickerComponent;
