import React from 'react';
import PropTypes from 'prop-types';
import {Radio, Row} from 'react-bootstrap';
import {isEqual} from 'lodash';
import classNames from 'classnames';

import {TextWithBadge} from '..';
import {handleChange} from '../../util';

const RadioSections = ({
    answer, question, onChange, disabled
}) => (
    <Row className={classNames('', {disabled})}>
        {question.text && <TextWithBadge
            question={question}
        />}
        {question.options.map(option => (
            option.section ? (
                <span
                    key={option.section}
                >
                    {option.section}
                </span>
            ) : (
                <Radio
                    key={option.value}
                    title={option.label}
                    onPress={() => handleChange(question.name, option.value, onChange)}
                    checked={isEqual(answer, option.value)}
                    disabled={disabled}
                >
                    {option.label}
                </Radio>
            )
        ))}
    </Row>
);

RadioSections.displayName = 'radioSections';

RadioSections.propTypes = {
    question: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
    answer: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    disabled: PropTypes.bool
};

RadioSections.defaultProps = {
    answer: null,
    disabled: false
};

export default RadioSections;
