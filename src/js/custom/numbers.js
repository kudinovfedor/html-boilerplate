/**
 * Number
 *
 * @example
 * numbers('.fk-number', '.fk-number-field', '.fk-number-spin-plus', '.fk-number-spin-minus');
 * @author Fedor Kudinov <brothersrabbits@mail.ru>
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

            let field_value = parseInt(_field.text());

            if (field_value >= 1) {

                field_value++;

                _field.text(field_value);

            }

        });

        _minus.on('click', () => {

            let field_value = parseInt(_field.text());

            if (field_value > 1) {

                field_value--;

                _field.text(field_value);

            }
        });

    });

};

export default numbers;
