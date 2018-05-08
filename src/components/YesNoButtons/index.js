import React from 'react';
import PropTypes from 'prop-types';
import {ButtonGroup, Button, Row, Grid} from 'react-bootstrap';
import classNames from 'classnames';

import TextWithBadge from '../TextWithBadge';
import {handleChange} from '../../util';

const getValue = (index, question) => {
    switch (index) {
        case 0:
            return question.trueValue;
        case 1:
            return question.falseValue;
        case 2:
            return question.dkValue;
        default:
            return null;
    }
};

const getSelectedValue = (answer, question) => {
    switch (answer) {
        case question.trueValue:
            return 0;
        case question.falseValue:
            return 1;
        case question.dkValue:
            return 2;
        default:
            return null;
    }
};

const getRadioButtonStyle = (answer, questionValue, style) => ([
    style.radioButton, answer === questionValue ? style.buttonColorPressed : style.buttonColorDefault
]);

const YesNoButtons = ({
    answer, question, onChange, disabled
}) => {
    const buttons = [{
        element: () => (
            <Button style={getRadioButtonStyle(answer, question.trueValue)}>
                SI
            </Button>
        )
    }, {
        element: () => (
            <Button style={getRadioButtonStyle(answer, question.falseValue)}>
                NO
            </Button>
        )
    }];

    if (question.dkValue) {
        buttons.push({
            element: () => (
                <Button style={getRadioButtonStyle(answer, question.dkValu)}>
                    {question.dkLabel}
                </Button>
            )
        });
    }
    return (
        <Grid className={classNames('', {disabled})}>
            {question.text && <TextWithBadge
                question={question}
            />}
            <Row>
                <ButtonGroup
                    onPress={index => handleChange(question.name, getValue(index, question), onChange)}
                    selectedIndex={getSelectedValue(answer, question)}
                    buttons={buttons}
                    disabled={disabled}
                />
            </Row>
        </Grid>
    );
};

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
