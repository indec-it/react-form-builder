import {types} from '../enums';

const demo = {
    name: 'demo',
    title: 'Demo de Datos',
    rows: [{
        id: 1,
        questions: [{
            name: 'typeCheckBox',
            number: 1,
            text: 'Example of Type CheckBox',
            type: types.CHECKBOX
        }]
    }, {
        id: 2,
        questions: [{
            name: 'typeDate',
            number: 2,
            text: 'Example of Time Picker',
            type: types.DATE_INPUT
        },
        {
            name: 'typeDateDisabled',
            text: 'Example of Time Picker Disabled',
            disabled: true,
            type: types.DATE_INPUT
        }]
    }, {
        id: 3,
        questions: [{
            number: 3,
            name: 'typeNumberInput',
            text: 'Example of Number Input',
            type: types.DECIMAL_INPUT
        }, {
            name: 'typeNumberInputDisabled',
            text: 'Example of Number Input Disabled',
            disabled: true,
            type: types.DECIMAL_INPUT
        }]
    }, {
        id: 4,
        questions: [{
            number: 4,
            name: 'typeNumberInputOrIgnore',
            text: 'Example of Number Input or Ignore',
            type: types.DECIMAL_INPUT_OR_IGNORE
        }]
    }, {
        id: 5,
        questions: [{
            number: 5,
            name: 'typeMultiSelect',
            text: 'Example of MultiSelect',
            type: types.MULTI_SELECT,
            options: [
                {value: 1, label: 'Demo value 1'},
                {value: 2, label: 'Demo value 2'},
                {value: 3, label: 'Demo value 3'},
                {value: 4, label: 'Demo value 4'},
                {value: 5, label: 'Demo value 5'},
                {value: 6, label: 'Demo Exclusive 1', exclusive: true},
                {value: 99, label: 'Demo Exclusive 2', exclusive: true}
            ]
        }, {
            name: 'typeMultiSelectDisabled',
            text: 'Example of MultiSelect Disabled',
            type: types.MULTI_SELECT,
            disabled: true,
            options: [
                {value: 1, label: 'Demo value 1'},
                {value: 2, label: 'Demo value 2'},
                {value: 3, label: 'Demo value 3'},
                {value: 4, label: 'Demo value 4'},
                {value: 5, label: 'Demo value 5'},
                {value: 6, label: 'Demo Exclusive 1', exclusive: true},
                {value: 99, label: 'Demo Exclusive 2', exclusive: true}
            ]
        }]
    }, {
        id: 6,
        questions: [{
            name: 'typeRadioButton',
            number: 6,
            text: 'Example of Radio Button',
            type: types.RADIO,
            options: [
                {value: 1, label: 'Valor 1'},
                {value: 2, label: 'Valor 2'},
                {value: 3, label: 'Valor 3'},
                {value: 4, label: 'Valor 4'},
                {value: 5, label: 'Valor 5'}
            ]
        }, {
            name: 'typeRadioButtonDisabled',
            text: 'Example of Radio Button Disabled',
            type: types.RADIO,
            disabled: true,
            options: [
                {value: 1, label: 'Valor 1'},
                {value: 2, label: 'Valor 2'},
                {value: 3, label: 'Valor 3'},
                {value: 4, label: 'Valor 4'},
                {value: 5, label: 'Valor 5'}
            ]
        }]
    }, {
        id: 8,
        questions: [{
            name: 'typeRadioTable',
            number: 8,
            text: 'Example of RadioTable',
            type: types.RADIO_TABLE,
            options: [{
                value: 1, text: 'Sí'
            }, {
                value: 2, text: 'No'
            }],
            questions: [{
                name: 'radioTable1', text: '1 Demo'
            }, {
                name: 'radioTable2', text: '2 Demo'
            }, {
                name: 'radioTable3', text: '3 Demo'
            }, {
                name: 'radioTable4', text: '4 Demo'
            }]
        }, {
            name: 'typeRadioTableDisabled',
            text: 'Example of RadioTable Disabled',
            type: types.RADIO_TABLE,
            disabled: true,
            options: [{
                value: 1, text: 'Sí'
            }, {
                value: 2, text: 'No'
            }],
            questions: [{
                name: 'radioTable1', text: '1 Demo'
            }, {
                name: 'radioTable2', text: '2 Demo'
            }, {
                name: 'radioTable3', text: '3 Demo'
            }, {
                name: 'radioTable4', text: '4 Demo'
            }]
        }]
    }, {
        id: 12,
        questions: [{
            name: 'typeTextInput',
            number: 12,
            text: 'Example of Text Input',
            type: types.TEXT_INPUT
        }]
    }, {
        id: 13,
        questions: [{
            name: 'typeTextInputOrIgnore',
            number: 13,
            text: 'Example of Text Input or Ignore',
            type: types.TEXT_INPUT_OR_IGNORE
        }]
    }, {
        id: 14,
        questions: [{
            name: 'typeTextInputOrNoAnswer',
            number: 14,
            text: 'Example of Text Input or no Answer',
            type: types.TEXT_INPUT_OR_IGNORE
        }]
    }]
};

export default demo;
