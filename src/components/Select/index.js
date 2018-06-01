import React from 'react';
import PropTypes from 'prop-types';
import {FormControl, Row} from 'react-bootstrap';
import classNames from 'classnames';

import {TextWithBadge} from '..';
import {handleChange} from '../../util';

const SelectComponent = ({
    answer, question, onChange, disabled
}) => (
    <Row className={classNames('select-question', {'question-disabled': disabled})}>
        {question.text && <TextWithBadge
            question={question}
        />}
        <FormControl
            componentClass="select"
            value={answer}
            onChange={itemValue => handleChange(question.name, itemValue, onChange)}
            disabled={disabled}
        >
            {question.options.map(option => (
                <option
                    key={option.value}
                    label={option.label}
                    value={option.value}
                >
                    {option.label}
                </option>
            ))}
        </FormControl>
    </Row>
);

SelectComponent.displayName = 'select';

SelectComponent.propTypes = {
    question: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
    answer: PropTypes.number,
    disabled: PropTypes.bool
};

SelectComponent.defaultProps = {
    answer: null,
    disabled: false
};

export default SelectComponent;
