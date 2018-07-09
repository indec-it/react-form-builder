import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {Grid} from 'react-bootstrap';

import FormBuilder from '..';
import questions from './sampleJson';

class ParseQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: {
                typeDateDisabled: new Date('20/12/2017'),
                typeNumberInputDisabled: 33,
                typeMultiSelectDisabled: [2, 5, 99],
                typeRadioButtonDisabled: 2,
                typeRadioTableDisabledradioTable1: 1,
                typeRadioTableDisabledradioTable2: 2,
                typeRadioTableDisabledradioTable3: 2,
                typeRadioTableDisabledradioTable4: 1,
                yesNoButtonsDisabled: 'dk'
            }
        };
    }

    handleChange(answers) {
        this.setState(state => ({answers: Object.assign(state.answers, answers)}));
    }

    render() {
        const {answers} = this.state;
        /* eslint no-console: 0 */
        console.log(answers);
        return (
            <Grid>
                {questions.rows.map(row => (
                    row.questions.map(question => (
                        <FormBuilder
                            questionAnswer={answers[question.name]}
                            question={question}
                            chapter={answers}
                            disabled={question.disabled || false}
                            onChange={e => this.handleChange(e)}
                            key={question.name}
                        />)
                    )
                ))}
            </Grid>
        );
    }
}

export default hot(module)(ParseQuestions);

