import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Radio} from 'react-bootstrap';
import {isEqual, map} from 'lodash';
import classNames from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckSquare, faSquare} from '@fortawesome/free-solid-svg-icons';

import {TextWithBadge} from '..';
import {handleChange} from '../../util';

const RadioButton = ({
    answer, question, onChange, disabled, plainResponse
}) => (
    <Row className={classNames('height-question-separation', 'radio-question', {'question-disabled': disabled})}>
        <Col sm={7}>
            {question.text && <TextWithBadge
                question={question}
            />}
        </Col>
        <Col sm={5}>
            {plainResponse && map(question.options,
                option => option.label && (
                    <span key={option.text}>
                        <FontAwesomeIcon icon={isEqual(answer, option.value) ? faCheckSquare : faSquare}/>
                        &nbsp;{option.label}
                    </span>
                )
            )}
            {!plainResponse && map(question.options,
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
                        <span className="label-checkbox-radio">{option.label}</span>
                    </Radio>
                ))
            )}
        </Col>
    </Row>
);

RadioButton.displayName = 'radio';

RadioButton.propTypes = {
    question: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func,
    answer: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    disabled: PropTypes.bool,
    plainResponse: PropTypes.bool
};

RadioButton.defaultProps = {
    onChange: null,
    answer: null,
    disabled: false,
    plainResponse: false
};

export default RadioButton;
