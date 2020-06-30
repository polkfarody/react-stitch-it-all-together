import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Alert from "../Alert";

let container = null;

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("Renders text without other information", () => {
    const message = {
        text: (
            <p>Please try again, or come back another time :)</p>
        )
    };

    act(() => {
        render(<Alert message={message}/>, container);
    });

    const generatedHtml = container.querySelector('div.alert');

    expect(
        container.querySelector('div.alert-content').textContent
    ).toEqual("Please try again, or come back another time :)");

    expect(
        generatedHtml.classList.contains('alert-success')
    ).toBe(true)


    message.heading = 'Something went wrong';
    act(() => {
        render(<Alert message={message}/>, container);
    });
    expect(
        container.querySelector('div.alert-heading').textContent
    ).toEqual("Something went wrong");

    message.type = 'error';
    act(() => {
        render(<Alert message={message}/>, container);
    });
    expect(
        generatedHtml.classList.contains('alert-danger')
    ).toBe(true)

    message.type = 'alert';
    act(() => {
        render(<Alert message={message}/>, container);
    });
    expect(
        generatedHtml.classList.contains('alert-warning')
    ).toBe(true)

    message.type = 'notice';
    act(() => {
        render(<Alert message={message}/>, container);
    });
    expect(
        generatedHtml.classList.contains('alert-info')
    ).toBe(true)

    message.type = 'success';
    act(() => {
        render(<Alert message={message}/>, container);
    });
    expect(
        generatedHtml.classList.contains('alert-success')
    ).toBe(true)
});

