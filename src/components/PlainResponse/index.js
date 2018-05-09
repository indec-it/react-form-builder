import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';

import {parseQuestion} from '../../util';
import {TextWithBadge} from '..';

const PlainResponse = ({
    question, section
}) => (
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
);

PlainResponse.displayName = 'plainResponse';

PlainResponse.propTypes = {
    question: PropTypes.shape({}).isRequired,
    section: PropTypes.shape({}).isRequired
};

export default PlainResponse;
