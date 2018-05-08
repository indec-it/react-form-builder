import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const TextBox = ({text}) => (
    <Fragment>
        {text}
    </Fragment>);

TextBox.displayName = 'textBox';
TextBox.propTypes = {
    text: PropTypes.string.isRequired
};
export default TextBox;
