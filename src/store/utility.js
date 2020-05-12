import * as HttpStatus from 'http-status-codes'

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties,
    }
}

export const formatErrorsForApi = (error) => {
    console.log(error)
    if (error.response.status >= HttpStatus.INTERNAL_SERVER_ERROR) {
        return {
            server_error: error.message
        }
    }

    const errors = error.response.data;
    errors.form_errors = [];
    for (const [key, error] of Object.entries(errors)) {
        switch (key) {
            case 'non_field_errors':
            case 'detail':
                errors.form_errors.push(error);
                break;
            default:
                // Leave it as is
                break;
        }
    }

    return errors;
}
