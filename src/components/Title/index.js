import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const Title = ({question}) => (
    <Fragment>
        <h3>
            {question.text}
        </h3>
    </Fragment>
);

Title.displayName = 'title';

Title.propTypes = {
    question: PropTypes.shape({}).isRequired
};

export default Title;
