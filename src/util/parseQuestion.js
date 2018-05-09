import React, {Fragment} from 'react';
import {find, includes, map} from 'lodash';
import FontAwesome from 'react-fontawesome';
import {types} from '../enums';

export default class ReviewsUtilities {
    static getOption(options, value) {
        if (!value) {
            return null;
        }
        return find(options, o => parseInt(o.value, 10) === value);
    }

    static convertBooleanToString(value) {
        if (value) {
            return 'Si';
        } else if (value === false) {
            return 'No';
        }
        return null;
    }

    static parseQuestion(question, chapter) {
        if (question.type === types.RADIO_TABLE) {
            return (
                <Fragment>
                    <br/>
                    {map(question.questions, option => {
                        const questionValue = this.getOption(
                            question.options, chapter[`${question.name}${option.name}`]
                        );
                        return questionValue && (
                            <span key={`${question.name}${questionValue.text}`}>
                                &nbsp;&nbsp;{option.text}&nbsp;
                                {questionValue.text} ({questionValue.value})<br/>
                            </span>);
                    })}
                </Fragment>
            );
        }
        if (question.type === types.MULTI_SELECT) {
            return (
                <Fragment>
                    <br/>
                    {map(question.options, option => includes(chapter[question.name], option.value) && (
                        <span key={`${question.name}${option.label}`}>
                            &nbsp;&nbsp;{option.label} ({option.value}) <FontAwesome name="check-circle"/><br/>
                        </span>)
                    )}
                </Fragment>
            );
        }

        if (question.options) {
            const q = this.getOption(question.options, chapter[question.name]);
            return q ? `${q.label} (${q.value})` : null;
        }
        if (question.type === types.CHECKBOX) {
            if (chapter[question.name]) {
                return (<FontAwesome name="check-circle"/>);
            }

            return null;
        }
        if (question.trueValue) {
            return this.convertBooleanToString(chapter[question.name]);
        }
        return question.name && chapter[question.name];
    }
}
