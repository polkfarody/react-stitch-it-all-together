import React from "react";
import * as HttpStatus from 'http-status-codes'

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties,
    }
}

export const formatErrorsFromApi = (error) => {
    let errors = {};
    if (error.response.status >= HttpStatus.INTERNAL_SERVER_ERROR) {
        return {
            server_error: error.message
        }
    }

    errors = error.response.data;
    errors.form_errors = [];
    for (const [key, error] of Object.entries(errors)) {
        switch (key) {
            case 'non_field_errors':
            case 'detail':
                errors.form_errors.push(error);
                break;
        }
    }

    return errors;
}
