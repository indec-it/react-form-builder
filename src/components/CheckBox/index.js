import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Checkbox} from 'react-bootstrap';
import classNames from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckSquare, faSquare} from '@fortawesome/free-regular-svg-icons';

import {TextWithBadge} from '..';
import {handleChange} from '../../util';

const CheckBox = ({
    answer,
    onChange,
    question,
    disabled,
    plainResponse
}) => (
    <Row className={classNames('height-question-separation', 'checkbox-question', {'question-disabled': disabled})}>
        <Col sm={7}>
            {question.text && <TextWithBadge
                question={question}
            />}
        </Col>
        <Col sm={5} className="text-right">
            {plainResponse &&
                <FontAwesomeIcon icon={answer ? faCheckSquare : faSquare}/>
            }
            {!plainResponse &&
                <Checkbox
                    title={question.checkBoxTitle}
                    onPress={() => handleChange(question.name, !answer, onChange)}
                    checked={answer}
                    disabled={disabled}
                />
            }
        </Col>
    </Row>
);

CheckBox.displayName = 'checkbox';
CheckBox.propTypes = {
    question: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func,
    answer: PropTypes.bool,
    disabled: PropTypes.bool,
    plainResponse: PropTypes.bool
};

CheckBox.defaultProps = {
    onChange: null,
    answer: null,
    disabled: false,
    plainResponse: false
};

export default CheckBox;
