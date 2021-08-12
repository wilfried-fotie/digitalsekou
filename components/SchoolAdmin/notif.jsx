import React from "react"



class InputField extends React.Component {

    constructor(props) {
        super(props);

        this.handleNewMessage = this.handleNewMessage.bind(this);
    }

    handleNewMessage(e) {
        let message = e.target.querySelectorAll('input')[0].value
        if (message !== '') {
            this.props.handleNewMessage(message, 'out');
            setTimeout(() => {
                this.props.handleNewMessage('Hello there!', 'in');
            }, 1500)
            e.target.reset();
        }
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleNewMessage}>
                <input className="input__field" type="text" placeholder="Type a message" />
            </form>
        )
    }
}

class InputRow extends React.Component {

    constructor(props) {
        super(props);

        this.handleNewMessage = this.handleNewMessage.bind(this);
    }

    handleNewMessage(inputText, type) {
        this.props.handleNewMessage(inputText, type);
    }

    render() {
        return (
            <div className="input__row">
                <InputField handleNewMessage={this.handleNewMessage} />
            </div>
        )
    }
}

class Time extends React.Component {
    render() {
        return (
            <span className="time">{this.props.time}</span>
        )
    }
}

class Message extends React.Component {
    render() {
        return (
            <div className="message__row">
                <span className={`message message--${this.props.direction}`}>
                    {this.props.message}
                    <Time time={this.props.time} />
                </span>
            </div>
        )
    }
}

class MessageContainer extends React.Component {
    render() {
        let messages = [];
        this.props.messages.forEach((message) => {
            messages.push(<Message message={message.text} direction={message.type} time={message.time} />)
        });

        return (
            <div className="message__container">
                {messages}
                <div className="message__tile"></div>
            </div>
        )
    }
}

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [{
                text: 'hello!',
                type: 'out',
                time: '10:00 PM'
            }]
        }
        this.handleNewMessage = this.handleNewMessage.bind(this);
    }

    handleNewMessage(inputText, type) {
        this.setState((prevState, props) => ({
            messages: [...prevState.messages, { text: inputText, type: type, time: '11:00 PM' }]
        }));
    }

    render() {
        return (
            <div className="app">
                <MessageContainer messages={this.state.messages} />
                <InputRow inputText={this.state.inputText} handleNewMessage={this.handleNewMessage} />
            </div>
        )
    }
}
