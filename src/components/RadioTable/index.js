import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Grid, Radio} from 'react-bootstrap';
import {isEqual} from 'lodash';
import classNames from 'classnames';

import {TextWithBadge} from '..';
import {handleChange} from '../../util';

const renderRowQuestion = (question, section, rowQuestion, onChange, disabled) => {
    const questionName = question.name + rowQuestion.name;
    const questionValue = section[questionName];
    return (
        <Row key={questionName}>
            <Col size={4}>
                <span>
                    {rowQuestion.text}
                </span>
            </Col>
            {question.options.map(option => (
                <Col
                    key={option.id}
                >
                    <Radio
                        onPress={() => handleChange(questionName, option.value, onChange)}
                        checked={isEqual(questionValue, option.value)}
                        disabled={disabled}
                    >
                        {option.text}
                    </Radio>
                </Col>
            ))}
        </Row>
    );
};

const RadioTable = ({
    section, question, onChange, disabled
}) => (
    <Row className={classNames('', {disabled})}>
        {question.text && <TextWithBadge
            question={question}
        />}
        <Grid>
            {question.questions.map(rowQuestion => (
                renderRowQuestion(question, section, rowQuestion, onChange, disabled)
            ))}
        </Grid>
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
