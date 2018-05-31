import React from 'react';
import PropTypes from 'prop-types';
import {ButtonGroup, Button, Row, Col} from 'react-bootstrap';
import classNames from 'classnames';

import TextWithBadge from '../TextWithBadge';
import {handleChange} from '../../util';

const YesNoButtons = ({
    answer, question, onChange, disabled
}) => (
    <Row className={classNames('height-component-separation', {disabled})}>
        <Col sm={7}>
            {question.text && <TextWithBadge
                question={question}
            />}
        </Col>
        <Col sm={5}>
            <ButtonGroup
                onClick={({target: {value}}) => handleChange(question.name, value, onChange)}
                disabled={disabled}
            >
                <Button
                    value={question.trueValue}
                    active={answer === question.trueValue}
                >
                    SI
                </Button>
                <Button
                    value={question.falseValue}
                    active={answer === question.falseValue}
                >
                    NO
                </Button>
                {question.dkValue && (
                    <Button
                        value={question.dkValue}
                        active={answer === question.dkValue}
                    >
                        {question.dkLabel}
                    </Button>)
                }
            </ButtonGroup>
        </Col>
    </Row>
);

YesNoButtons.displayName = 'yesNoButtons';

YesNoButtons.propTypes = {
    question: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
    answer: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number
    ]),
    disabled: PropTypes.bool
};

YesNoButtons.defaultProps = {
    answer: null,
    disabled: false
};

export default YesNoButtons;
