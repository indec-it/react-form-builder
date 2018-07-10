import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Checkbox} from 'react-bootstrap';
import classNames from 'classnames';
import {TextWithBadge} from '..';
import {handleChange} from '../../util';

const CheckBox = ({
    answer,
    onChange,
    question,
    disabled
}) => (

    <Row className={classNames('height-question-separation', 'checkbox-question', {'question-disabled': disabled})}>
        <Col sm={7}>
            {question.text && <TextWithBadge
                question={question}
            />}
        </Col>
        <Col sm={5} className="text-right">
            <Checkbox
                title={question.checkBoxTitle}
                onChange={() => handleChange(question.name, !answer, onChange)}
                checked={answer}
                disabled={disabled}
            />
        </Col>
    </Row>
);
CheckBox.displayName = 'checkbox';
CheckBox.propTypes = {
    question: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
    answer: PropTypes.bool,
    disabled: PropTypes.bool
};
CheckBox.defaultProps = {
    answer: null,
    disabled: false
};
export default CheckBox;
