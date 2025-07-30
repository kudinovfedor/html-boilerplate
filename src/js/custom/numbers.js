/**
 * Number
 *
 * @example
 * numbers('.number', '.number-field', '.number-spin-plus', '.number-spin-minus');
 * @author Fedir Kudinov <brothersrabbits@mail.ru>
 * @param {(string|Object)} id - container of element
 * @param {(string|Object)} field - field with number
 * @param {(string|Object)} plus - button plus
 * @param {(string|Object)} minus - button minus
 */
const numbers = (id, field, plus, minus) => {

    $(id).each((i, val) => {

        const el = $(val),
            _field = el.find(field),
            _plus = el.find(plus),
            _minus = el.find(minus);

        _plus.on('click', () => {

            let fieldValue = parseInt(_field.text());

            if (fieldValue >= 1) {

                fieldValue++;

                _field.text(fieldValue);

            }

        });

        _minus.on('click', () => {

            let fieldValue = parseInt(_field.text());

            if (fieldValue > 1) {

                fieldValue--;

                _field.text(fieldValue);

            }
        });

    });

};

export default numbers;
