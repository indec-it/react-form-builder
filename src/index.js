import React from 'react';
import PropTypes from 'prop-types';

import './sass/app.scss';
import ComponentsRegistry from './ComponentsRegistry';
import {questionPropType} from './util';
import {PlainResponse} from './components';

const FormBuilder = ({
    questionAnswer, question, onChange, disabled, chapter, plainAnswers
}) => {
    const registry = new ComponentsRegistry();

    const QuestionComponent = plainAnswers ? registry.get(PlainResponse.displayName) : registry.get(question.type);

    return (
        <QuestionComponent
            key={question.number}
            question={question}
            section={chapter}
            answer={questionAnswer}
            onChange={answer => onChange(answer)}
            disabled={disabled}
        />
    );
};

FormBuilder.propTypes = {
    question: PropTypes.instanceOf(questionPropType).isRequired,
    disabled: PropTypes.bool.isRequired,
    chapter: PropTypes.shape({}).isRequired,
    questionAnswer: PropTypes.oneOfType([
        PropTypes.any
    ]),
    onChange: PropTypes.func,
    plainAnswers: PropTypes.bool
};

FormBuilder.defaultProps = {
    questionAnswer: null,
    onChange: null,
    plainAnswers: false
};

export default FormBuilder;
