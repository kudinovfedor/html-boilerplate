/**
 * Is a given variable an string?
 *
 * @param {string} value -
 * @returns {boolean}
 */
export const isString = value => {

    return (typeof value === 'string') || ((!!value && typeof value === 'object') && (Object.prototype.toString.call(value) === '[object String]'));

};

/**
 * Is a given variable an object?
 *
 * @param {object} value -
 * @returns {boolean}
 */
export const isObject = value => {

    return (!!value) && ((typeof value === 'function') || (typeof value === 'object'));

};
