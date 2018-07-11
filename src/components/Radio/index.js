import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Radio} from 'react-bootstrap';
import {isEmpty, isEqual, map} from 'lodash';
import classNames from 'classnames';

import {TextWithBadge} from '..';
import {getSelectedValue, handleChange} from '../../util';

const drawAnswer = (answer, options) => {
    const answered = getSelectedValue(options, answer);
    if (answered && !isEmpty(answered)) {
        return answered.label;
    }
    return null;
};

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
            {plainResponse && answer && (
                <Fragment>
                    &nbsp;{drawAnswer(answer, question.options)}
                </Fragment>)
            }
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
