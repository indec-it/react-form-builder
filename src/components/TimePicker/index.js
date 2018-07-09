import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';
import TimePicker from 'rc-time-picker';

import classNames from 'classnames';

import {TextWithBadge} from '..';
import {handleChange} from '../../util';

const TimePickerComponent = ({
    answer,
    question,
    onChange,
    disabled
}) => (
    <Row className={classNames('height-component-separation', {disabled})}>
        <Col sm={7}>
            {question.text && <TextWithBadge
                question={question}
            />}
        </Col>
        <Col sm={5}>
            <TimePicker
                showSecond={false}
                value={answer}
                onChange={date => handleChange(question.name, date, onChange)}
                use12Hours
            />
        </Col>
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
