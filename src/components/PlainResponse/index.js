import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';

import {parseQuestion} from '../../util';
import {TextWithBadge} from '..';

const PlainResponse = ({
    question, section
}) => (
    <Fragment>
        {question.extraBadge && (
            <Row>
                <Col sm={10}>
                    <TextWithBadge
                        question={{
                            text: question.extraBadge.text,
                            number: question.extraBadge.number,
                            disabled: question.disabled
                        }}
                    />
                </Col>
            </Row>)
        }
        <Row>
            <Col sm={6}>
                {question.text && <TextWithBadge
                    question={question}
                />}
                {question.floatingLabel}
            </Col>
            <Col sm={6}>
                {parseQuestion.parseQuestion(question, section)}
                {question.textAfterInput && (
                    <span>
                        {question.textAfterInput}
                    </span>)
                }
            </Col>
        </Row>
    </Fragment>
);


PlainResponse.displayName = 'plainResponse';

PlainResponse.propTypes = {
    question: PropTypes.shape({}).isRequired,
    section: PropTypes.shape({}).isRequired
};

export default PlainResponse;
