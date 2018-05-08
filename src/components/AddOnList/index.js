import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Grid, Button, Row, Col} from 'react-bootstrap';
import lang from 'lodash/lang';
import {filter, find, get, isString, isNumber, toNumber, isNaN, some, every, isNil} from 'lodash';

import ComponentsRegistry from '../../ComponentsRegistry';
import {ModalConfirm} from '../../../common';
import {TextWithBadge} from '..';
import {types, operators} from '../../../../constants';

const getFieldValue = (answerRow, question) => {
    let value = answerRow[question.name];
    switch (question.type) {
        case types.SELECT:
            if (isNumber(question.options[0].value) && isString(value) && !isNaN(toNumber(value))) {
                value = toNumber(value);
            }
            return find(question.options, {value}).label;
        default:
            return value;
    }
};


const normalizeInt = value => {
    let tmpValue = value;
    if (isString(tmpValue) && !isNaN(toNumber(tmpValue))) {
        tmpValue = toNumber(tmpValue);
    }
    return tmpValue;
};


const canDrawQuestion = ({parents}, chapter) => {
    if (!parents) {
        return true;
    }
    return every(
        parents.map(parent => {
            let refValue = parent.value;
            let actualValue = chapter[parent.id];
            switch (parent.type) {
                case operators.EXISTS:
                    return !isNil(chapter[parent.id]) === parent.value;
                case operators.NOT_EQUALS:
                    return !lang.eq(chapter[parent.id], parent.value);

                case operators.GREATER_THAN:
                    refValue = normalizeInt(refValue);
                    actualValue = normalizeInt(actualValue);
                    return lang.gt(actualValue, refValue);

                case operators.LESS_THAN:
                    refValue = normalizeInt(refValue);
                    actualValue = normalizeInt(actualValue);
                    return lang.lt(actualValue, refValue);

                default:
                    return lang[parent.type](chapter[parent.id], parent.value);
            }
        }),
        status => status === true
    );
};


export default class AddOnList extends Component {
    static displayName = 'addOnList';

    static propTypes = {
        question: PropTypes.shape({
            name: PropTypes.string,
            childQuestions: PropTypes.arrayOf(PropTypes.shape({}))
        }).isRequired,
        onChange: PropTypes.func.isRequired,
        answer: PropTypes.shape({})
    };

    static defaultProps = {
        answer: null
    };

    constructor(props) {
        super(props);
        this.state = {
            componentAnswers: {},
            answer: props.answer || [],
            modal: false
        };
    }

    someQuestionsAreNil() {
        return some(this.props.question.childQuestions, question => isNil(
            get(this.state.componentAnswers, question.name, null)
        ));
    }

    addToList() {
        if (this.someQuestionsAreNil()) {
            return;
        }

        this.state.answer.push(this.state.componentAnswers);
        this.props.onChange({
            [this.props.question.name]: this.state.answer
        });
        this.setState(() => ({
            componentAnswers: {}
        }));
    }

    deleteRow(index) {
        const {modal} = this.state;
        this.setState({modal: true});
        return modal && (
            <ModalConfirm
                message="¿Desea eliminar esta declaración?"
                title="Eliminar"
                onAccept={() => {
                    this.state.answer.splice(index, 1);
                    this.props.onChange({
                        [this.props.question.name]: this.state.answer
                    });
                }
                }
                onDismiss={() => this.setState({modal: false})}
            />);
    }


    render() {
        const {question} = this.props;
        const registry = new ComponentsRegistry();
        return (
            <Grid>
                {question.text && <TextWithBadge
                    question={question}
                />}
                <Row>
                    {filter(
                        this.props.question.childQuestions,
                        childQuestion => canDrawQuestion(childQuestion, this.state.componentAnswers)
                    ).map(childQuestion => {
                        const QuestionComponent = registry.get(childQuestion.type);
                        return (
                            <QuestionComponent
                                key={childQuestion.name.toString()}
                                answer={this.state.componentAnswers[childQuestion.name]}
                                question={childQuestion}
                                onChange={answer => this.setState(state => ({
                                    componentAnswers: Object.assign({}, state.componentAnswers, answer)
                                }))}
                            />
                        );
                    })}
                </Row>
                <Button
                    title="AGREGAR"
                    onPress={() => this.addToList()}
                />
                <Grid>
                    {this.state.answer && this.state.answer.map((answerRow, index) => {
                        const indexKey = `answerRow-${index}`;
                        return (
                            <Button
                                key={indexKey}
                                onPress={() => this.deleteRow(index)}
                            >
                                <Row>
                                    {question.childQuestions.map((childQuestion, childQuestionIndex) => {
                                        const value = getFieldValue(answerRow, childQuestion);
                                        const childQuestionKey = `childrenQuestion-${childQuestionIndex}`;
                                        return (
                                            <Col key={childQuestionKey}>
                                                {answerRow[childQuestion.name] ? value : '-'}
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </Button>
                        );
                    })}
                </Grid>
            </Grid>
        );
    }
}
