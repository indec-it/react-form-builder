import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Radio} from 'react-bootstrap';
import {isEqual} from 'lodash';
import classNames from 'classnames';

import {TextWithBadge} from '..';
import {handleChange} from '../../util';

const RadioButton = ({
    answer, question, onChange, disabled
}) => (

    <Row className={classNames('height-component-separation', {disabled})}>
        <Col sm={7}>
            {question.text && <TextWithBadge
                question={question}
            />}
        </Col>
        <Col sm={5}>
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
                        <div className="label-checkbox-radio">{option.label}</div>
                    </Radio>
                ))
            )}
        </Col>
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
