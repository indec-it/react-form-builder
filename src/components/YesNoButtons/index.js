import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {ButtonGroup, Button, Row, Col} from 'react-bootstrap';
import classNames from 'classnames';
import TextWithBadge from '../TextWithBadge';
import {handleChange} from '../../util';

const YesNoButtons = ({
    answer, question, onChange, disabled, plainResponse
}) => (
    <Row className={classNames('height-question-separation', 'yes-no-question', {'question-disabled': disabled})}>
        <Col sm={10}>
            {question.text && <TextWithBadge
                question={question}
            />}
        </Col>
        <Col sm={2}>
            {plainResponse && (
                <strong>
                    {answer === question.trueValue && (
                        <Fragment>
                            SI
                        </Fragment>
                    )}
                    {answer === question.falseValue && (
                        <Fragment>
                            NO
                        </Fragment>
                    )}
                    {answer === question.dkValue && (
                        <Fragment>
                            {question.dkValue}
                        </Fragment>
                    )}
                </strong>)
            }
            {!plainResponse && (
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
                </ButtonGroup>)
            }
        </Col>
    </Row>
);

YesNoButtons.displayName = 'yesNoButtons';

YesNoButtons.propTypes = {
    question: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func,
    answer: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number
    ]),
    disabled: PropTypes.bool,
    plainResponse: PropTypes.bool
};

YesNoButtons.defaultProps = {
    onChange: null,
    answer: null,
    disabled: false,
    plainResponse: false
};

export default YesNoButtons;
