import React from 'react';
import PropTypes from 'prop-types';
import {Row, Checkbox} from 'react-bootstrap';
import classNames from 'classnames';
import {TextWithBadge} from '..';
import {handleChange} from '../../util';

const CheckBox = ({
    answer,
    onChange,
    question,
    disabled
}) => (
    <Row className={classNames('', {disabled})}>
        {question.text && <TextWithBadge
            question={question}
        />}
        <Checkbox
            title={question.checkBoxTitle}
            onPress={() => handleChange(question.name, !answer, onChange)}
            checked={answer}
            disabled={disabled}
        />
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
