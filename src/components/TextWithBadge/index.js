import React from 'react';
import PropTypes from 'prop-types';
import {Badge, Row} from 'react-bootstrap';
import {includes, toString} from 'lodash';
import classNames from 'classnames';

import {TextBox} from '..';

const getBadge = number => {
    const parsedNumber = toString(number);
    return (
        !includes(parsedNumber, '.') ? (
            <Badge className="badge">
                {number}
            </Badge>
        ) : (
            <span>
                <Badge>
                    {number}
                </Badge>
            </span>
        )
    );
};

const TextWithBadge = ({question: {number, text, infoAfterText}, disabled}) => (
    <Row className={classNames('', {disabled})}>
        {number && getBadge(number)}
        <span className="title-badge">
            &nbsp; {text}
        </span>
        {infoAfterText && <TextBox text={infoAfterText}/>}
    </Row>
);

TextWithBadge.displayName = 'textWithBadge';

TextWithBadge.propTypes = {
    question: PropTypes.shape({
        text: PropTypes.string.isRequired,
        number: PropTypes.number,
        infoAfterText: PropTypes.string
    }).isRequired,
    disabled: PropTypes.bool
};

TextWithBadge.defaultProps = {
    style: null,
    disabled: false
};

export default TextWithBadge;
