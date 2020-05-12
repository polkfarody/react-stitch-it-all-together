import React from "react";
import PropTypes from 'prop-types';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import update from 'react-addons-update';
import Alert from "./Alert";

class FlashMessages extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: props.messages };

        window.flash_messages = this;
    }

    addMessage(message) {
        const messages = update(this.state.messages, { $push: [message] });
        this.setState({ messages: messages });
    }

    removeMessage(message) {
        const index = this.state.messages.indexOf(message);
        const messages = update(this.state.messages, { $splice: [[index, 1]] });
        this.setState({ messages: messages });
    }

    render () {
        const alerts = this.state.messages.map( message =>
            (
                <CSSTransition key={message.id} timeout={500} classNames="flash-alert">
                    <Alert key={ message.id } message={ message } onClose={ () => this.removeMessage(message) } timeout={3000} />
                </CSSTransition>
            )
        );

        return(
            <TransitionGroup className="global-flash-container">
                { alerts }
            </TransitionGroup>
        );
    }
}

FlashMessages.propTypes = {
    messages: PropTypes.array.isRequired
};

export default FlashMessages;
