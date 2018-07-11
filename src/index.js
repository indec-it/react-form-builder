import React from 'react';
import PropTypes from 'prop-types';
import ComponentsRegistry from './ComponentsRegistry';
import {questionPropType} from './util';

const FormBuilder = ({
    questionAnswer, question, onChange, disabled, chapter, plainResponse
}) => {
    const registry = new ComponentsRegistry();
    const QuestionComponent = registry.get(question.type);
    return (
        <QuestionComponent
            key={question.number}
            question={question}
            section={chapter}
            answer={questionAnswer}
            onChange={answer => onChange(answer)}
            disabled={disabled}
            plainResponse={plainResponse}
        />
    );
};

FormBuilder.propTypes = {
    question: PropTypes.instanceOf(questionPropType).isRequired,
    chapter: PropTypes.shape({}).isRequired,
    questionAnswer: PropTypes.oneOfType([
        PropTypes.any
    ]),
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    plainResponse: PropTypes.bool
};

FormBuilder.defaultProps = {
    questionAnswer: null,
    onChange: null,
    disabled: false,
    plainResponse: false
};

export default FormBuilder;
