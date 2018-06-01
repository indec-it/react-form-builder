import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Checkbox} from 'react-bootstrap';
import {concat, includes, isNil, filter, map, reject} from 'lodash';
import classNames from 'classnames';

import {TextWithBadge} from '..';
import {handleChange} from '../../util';
import questionPropType from '../../util/questionPropType';

const getSelectedValues = (optionValue, answer) => {
    if (isNil(answer)) {
        return [optionValue];
    }
    return includes(answer, optionValue)
        ? reject(answer, value => value === optionValue)
        : concat(answer, optionValue);
};

const getExclusiveOptionValues = options => map(
    filter(options, option => option.exclusive),
    option => option.value
);

const handleChangeAnswer = (question, option, answer, onChange) => {
    if (option.exclusive) {
        handleChange(question.name, [option.value], onChange);
        return;
    }
    const exclusiveValues = getExclusiveOptionValues(question.options);
    const answers = filter(
        getSelectedValues(option.value, answer),
        value => !includes(exclusiveValues, value)
    );
    handleChange(question.name, answers, onChange);
};

const MultiSelect = ({
    answer, question, onChange, disabled
}) => (

    <Row className={classNames('height-question-separation', 'multiselect-question', {'question-disabled': disabled})}>
        <Col sm={7}>
            {question.text && <TextWithBadge
                question={question}
            />}
        </Col>
        <Col sm={5}>
            {question.options.map(option => (option.text ?
                option.text : (
                    <Checkbox
                        key={option.value}
                        title={option.label}
                        onChange={() => handleChangeAnswer(question, option, answer, onChange)}
                        checked={includes(answer, option.value)}
                        disabled={disabled}
                    >
                        <div className="label-checkbox-radio">{option.label}</div>
                    </Checkbox>)
            ))}
        </Col>
    </Row>
);

MultiSelect.displayName = 'multiSelect';

MultiSelect.propTypes = {
    question: questionPropType.isRequired,
    onChange: PropTypes.func.isRequired,
    answer: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    disabled: PropTypes.bool
};

MultiSelect.defaultProps = {
    answer: null,
    disabled: false
};

export default MultiSelect;
