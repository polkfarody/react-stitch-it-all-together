import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import FlashMessages from "../FlashMessages";

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

it("display with multiple messages", () => {
    let messages = [
        {
            text: (
                <p>Message 1 content</p>
            )
        },
        {
            text: (
                <p>Message 2 content</p>
            )
        }
    ];

    act(() => {
        render(<FlashMessages messages={messages}/>, container);
    });

    const generatedHtml = container.querySelector('div.global-flash-container');

    expect(
        generatedHtml.classList.contains('global-flash-container')
    ).toEqual(true);

    expect(
        generatedHtml.getElementsByClassName('alert').length
    ).toEqual(2);
});

it("display with no messages", () => {
    let messages = [];

    act(() => {
        render(<FlashMessages messages={messages}/>, container);
    });

    const generatedHtml = container.querySelector('div.global-flash-container');

    expect(
        generatedHtml.classList.contains('global-flash-container')
    ).toEqual(true);

    expect(
        generatedHtml.getElementsByClassName('alert').length
    ).toEqual(0);
});
