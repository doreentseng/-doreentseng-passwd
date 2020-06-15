export const validate = (value) => {
    let err = '';
    if (!value) {
        err = 'Required'
    } else if (/^[A-Za-z]/.test(value) === false) {
        err = 'The first character cannot be a number or a symbol.';
    } else if (value.length < 8 || value.length > 16) {
        err = '8~16 long';
    } else if (/[A-Z]/.test(value) === false) {
        err = 'At least 1 uppercase letter';
    } else if (/[a-z]/.test(value) === false) {
        err = 'At least 1 lower letter';
    } else if (/[0-9]/.test(value) === false) {
        err = 'At least 1 number';
    } else if (/[*+!~@%^&$#*()_-]/.test(value) === false) {
        err = 'At least 1 symbol ~!@#$%^&*()-_+'
    } else if (/^[a-zA-Z0-9*+!~@%^&$#*()_-]+$/.test(value) === false) {
        err = 'Only letters, numbers and symbols ~!@#$%^&*()-_+ are allowed'
    }
    return err;
}