import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Row} from 'react-bootstrap';

import TextWithBadge from '../TextWithBadge';
import {handleChange} from '../../util';
/**
 * Perform calculation and save it.
 * @param {Object} section Answers of the chapter.
 * @param {Object} question Question's data.
 * @param {String} question.name The name of question field.
 * @param {Function} question.calc A function that generates the field value.
 * @param {Function} onChange Handle when the result has changed.
 * @returns {Number} Returns result of the calculation.
 */
const getResult = (section, {name, calc}, onChange) => {
    const result = calc(section);
    if (result !== section[name]) {
        handleChange(name, result, onChange);
    }
    return result;
};
const Calc = ({
    section, question, onChange, disabled
}) => (
    <Fragment>
        {question.text &&
            <TextWithBadge
                question={question}
            />}
        {!disabled &&
            <Row>
                {getResult(section, question, onChange)}
            </Row>}
        {question.textAfterCalc &&
            <Row>
                {question.textAfterCalc}
            </Row>}
    </Fragment>
);
Calc.displayName = 'calc';
Calc.propTypes = {
    section: PropTypes.shape({}).isRequired,
    question: PropTypes.shape({
        name: PropTypes.string.isRequired,
        calc: PropTypes.func.isRequired
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};
Calc.defaultProps = {
    disabled: false
};
export default Calc;
