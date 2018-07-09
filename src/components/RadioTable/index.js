import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Radio} from 'react-bootstrap';
import {isEqual} from 'lodash';
import classNames from 'classnames';

import {TextWithBadge} from '..';
import {handleChange} from '../../util';

const renderRowQuestion = (question, section, rowQuestion, onChange, disabled) => {
    const questionName = question.name + rowQuestion.name;
    const questionValue = section[questionName];
    return (
        <div key={questionName}>
            <span>
                {rowQuestion.text}
            </span>
            {question.options.map(option => (
                <Fragment>
                    <span className="label-checkbox-radio margin-yes-no">{option.text}</span>
                    <Radio
                        onChange={() => handleChange(questionName, option.value, onChange)}
                        checked={isEqual(questionValue, option.value)}
                        disabled={disabled}
                        className="radio-table-inline"
                    />
                </Fragment>
            ))}
        </div>
    );
};

const RadioTable = ({
    section, question, onChange, disabled
}) => (

    <Row className={classNames('height-component-separation', {disabled})}>
        <Col sm={7}>
            {question.text && <TextWithBadge
                question={question}
            />}
        </Col>
        <Col sm={5}>
            {question.questions.map(rowQuestion => (
                renderRowQuestion(question, section, rowQuestion, onChange, disabled)
            ))}
        </Col>
    </Row>
);

RadioTable.displayName = 'radioTable';

RadioTable.propTypes = {
    section: PropTypes.shape({}).isRequired,
    question: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

RadioTable.defaultProps = {
    disabled: false
};

export default RadioTable;
