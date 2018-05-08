import React from 'react';
import PropTypes from 'prop-types';
import ComponentsRegistry from './ComponentsRegistry';
import {questionPropType, canAnswerQuestion} from './util';

const QuestionsDrawer = ({
    questionAnswer, question, onChange, disabled, chapter
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
            disabled={disabled || !canAnswerQuestion(question, chapter)}
        />
    );
};

QuestionsDrawer.propTypes = {
    question: PropTypes.instanceOf(questionPropType).isRequired,
    disabled: PropTypes.bool.isRequired,
    chapter: PropTypes.shape({}).isRequired,
    questionAnswer: PropTypes.oneOfType([
        PropTypes.any
    ]),
    onChange: PropTypes.func
};

QuestionsDrawer.defaultProps = {
    questionAnswer: null,
    onChange: null
};

export default QuestionsDrawer;
