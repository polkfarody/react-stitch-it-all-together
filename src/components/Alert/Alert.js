import React from "react";
import * as PropTypes from 'prop-types';
import {Alert as TwitterAlert} from "react-bootstrap";

class Alert extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            show: true,
            onClose: props.onClose
        }

        this.closeAlert = this.closeAlert.bind(this);
    }

    componentDidMount() {
        if (this.props.timeout) {
            this.timer = setTimeout(
                this.props.onClose,
                this.props.timeout
            );
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    alertClass(type) {
        let classes = {
            error: 'danger',
            alert: 'warning',
            notice: 'info',
            success: 'success'
        };
        return classes[type] || classes.success;
    }

    getHeading() {
        if (this.props.message.heading !== undefined) {
            return (
                <TwitterAlert.Heading>
                    {this.props.message.heading}
                </TwitterAlert.Heading>
            )
        }

        return '';
    }

    getContent() {
        if (this.props.message.text !== undefined) {
            return (
                <div className="alert-content">{this.props.message.text}</div>
            );
        }
    }

    closeAlert() {
        if (this.props.onClose === null) {
            this.setState({show: false})
        } else {
            this.props.onClose();
        }
    }

    render() {
        const message = this.props.message;
        const alertType = this.alertClass(message.type);
        return (
            <TwitterAlert show={this.state.show} variant={alertType} onClick={() => this.closeAlert()} dismissible>
                {this.getHeading()}
                {this.getContent()}
            </TwitterAlert>
        );
    }
}

Alert.propTypes = {
    onClose: PropTypes.func,
    timeout: PropTypes.number,
    message: PropTypes.object.isRequired
};

Alert.defaultProps = {
    timeout: null,
    onClose: null,
};

export default Alert;
