import React from 'react';
import PropTypes from 'prop-types';
import {Row, Radio} from 'react-bootstrap';
import {isEqual} from 'lodash';
import classNames from 'classnames';

import {TextWithBadge} from '..';
import {handleChange} from '../../util';

const RadioButton = ({
    answer, question, onChange, disabled
}) => (
    <Row className={classNames('', {disabled})}>
        {question.text && <TextWithBadge
            question={question}
        />}
        {question.options.map(
            option => (option.text ? (
                <span key={option.text}>
                    {option.text}
                </span>
            ) : (
                <Radio
                    key={option.value}
                    title={option.label}
                    onChange={() => handleChange(question.name, option.value, onChange)}
                    checked={isEqual(answer, option.value)}
                    disabled={disabled}
                >
                    {option.label}
                </Radio>
            ))
        )}
    </Row>
);

RadioButton.displayName = 'radio';

RadioButton.propTypes = {
    question: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
    answer: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    disabled: PropTypes.bool
};

RadioButton.defaultProps = {
    answer: null,
    disabled: false
};

export default RadioButton;
