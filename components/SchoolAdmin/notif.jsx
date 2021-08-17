import Link from "next/link";
import React from "react"
import { createRef } from "react";
import { CursorFill, Whatsapp } from "react-bootstrap-icons";



class InputField extends React.Component {

    constructor(props) {
        super(props);

        this.handleNewMessage = this.handleNewMessage.bind(this);
         this.inputData = createRef(null)
    }

    handleNewMessage(e) {
        let message = this.inputData.current.value
        if (message !== '') {
            this.props.handleNewMessage(message, 'out');
            this.props.send(message)
            setTimeout(() => {
                this.props.handleNewMessage(<div style={{ fontSize: ".90em" }}>Merci de nous avoir contacter nous vous répondrons après la reception du message. mais pour un prise en charge plus rapide veuillez cliquez ici pour continuer la communication via whatsapp  <Link href={"https://wa.me/237" + this.props.school.tel}><a style={"dfss",{ color: "#4a00b4" }}> Continuer dans whatsapp <Whatsapp color="green" size={20}/> </a></Link></div> , 'in');
            }, 1500)
                this.inputData.current.value = null;
        }
        e.preventDefault();
    }

    render() {
        return (
         <div className="dfss">
                <textarea className="input__field" style={{fontFamily: "Montserrat"}} ref={this.inputData} type="text" placeholder="envoyer un message" /> <CursorFill onClick={this.handleNewMessage} size={20} color="#4a00b4"/>            </div>
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
                <InputField school={this.props.school} send={this.props.send} handleNewMessage={this.handleNewMessage} />
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
        this.date = () => new Date().getHours() + " : " + new Date().getMinutes()

        this.state = {
            messages: [{
                text: 'Salut à vous!',
                type: 'in',
                time: this.date()
            }]
        }
        this.handleNewMessage = this.handleNewMessage.bind(this);

    }

    handleNewMessage(inputText, type) {
        this.setState((prevState, props) => ({
            messages: [...prevState.messages, { text: inputText, type: type, time: this.date() }]
        }));

            }
    render() {
        return (
            <div className="app">
                <MessageContainer messages={this.state.messages} />
                <InputRow inputText={this.state.inputText} school={this.props.school} send={this.props.send} handleNewMessage={this.handleNewMessage} />
            </div>
        )
    }
}
