import React from 'react';
import PropTypes from 'prop-types';
import {FormControl, Row} from 'react-bootstrap';
import classNames from 'classnames';
import {map, isEmpty} from 'lodash';
import {TextWithBadge} from '..';
import {getSelectedValue, handleChange} from '../../util';

const drawAnswer = (answer, options) => {
    const answered = getSelectedValue(options, answer);
    if (answered && !isEmpty(answered)) {
        return answered.label;
    }
    return null;
};

const SelectComponent = ({
    answer, question, onChange, disabled, plainResponse
}) => (
    <Row className={classNames('select-question', {'question-disabled': disabled})}>
        {question.text && <TextWithBadge
            question={question}
        />}
        {plainResponse && drawAnswer(answer, question.options)}
        {!plainResponse && (
            <FormControl
                componentClass="select"
                value={answer}
                onChange={itemValue => handleChange(question.name, itemValue, onChange)}
                disabled={disabled}
            >
                {map(question.options, option => (
                    <option
                        key={option.value}
                        label={option.label}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </FormControl>)
        }
    </Row>
);

SelectComponent.displayName = 'select';

SelectComponent.propTypes = {
    question: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func,
    answer: PropTypes.number,
    disabled: PropTypes.bool,
    plainResponse: PropTypes.bool
};

SelectComponent.defaultProps = {
    onChange: null,
    answer: null,
    disabled: false,
    plainResponse: false
};

export default SelectComponent;
