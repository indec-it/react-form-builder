import React from 'react';
import PropTypes from 'prop-types';
import {Row} from 'react-bootstrap';
import {isEmpty, filter, toNumber, isNil, sum} from 'lodash';
import classNames from 'classnames';

import TextWithBadge from '../TextWithBadge';
import {handleChange} from '../../util';

/**
 * Perform sum and save it.
 * @param {Object} section Answers of the chapter.
 * @param {Object} question Question's data.
 * @param {String} question.name The name of question field.
 * @param {Array<String>} question.fieldsToAdd Answers to sum.
 * @param {Function} onChange Handle when the result has changed.
 * @returns {Number} Returns result of the sum.
 */
const getSum = (section, {name, fieldsToAdd}, onChange) => {
    const addends = filter(
        fieldsToAdd,
        field => !isNil(section[field])
    ).map(
        field => toNumber(section[field])
    );
    const result = sum(addends);
    if (section[name] !== result && !isEmpty(addends)) {
        handleChange(name, result, onChange);
    }
    return result;
};

const Sum = ({
    section, question, onChange, disabled
}) => (
    <Row className={classNames('', {disabled})}>
        {question.text &&
            <TextWithBadge
                question={question}
            />}
        {!disabled &&
            <span>
                {getSum(section, question, onChange)}
            </span>}
    </Row>
);

Sum.displayName = 'sum';

Sum.propTypes = {
    section: PropTypes.shape({}).isRequired,
    question: PropTypes.shape({
        name: PropTypes.string.isRequired,
        fieldsToAdd: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

Sum.defaultProps = {
    disabled: false
};

export default Sum;
