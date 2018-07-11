import {find, parseInt} from 'lodash';

export default (options, value) => {
    if (!value) {
        return {};
    }
    return find(options, o => parseInt(o.value) === parseInt(value));
};

