import React from "react";
import Alert from "../Alert/Alert";

export const ServerError = () => {
    const message = {
        heading: 'Something went wrong',
        text: (
            <p>Please try again, or come back another time :)</p>
        ),
        type: 'error'
    };

    return (
        <Alert message={message} />
    );
};

export const ErrorList = ({title, errors}) => {
    const message = {
        heading: title,
        text: (
            <>
                <p>Please check all fields and try again</p>
                <ul>
                    {
                        errors.map((error, key) => {
                            return <li key={key}>{error}</li>
                        })
                    }
                </ul>
            </>
        ),
        type: 'error'
    }

    return (
        <Alert message={message}/>
    );
}
