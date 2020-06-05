import React, { Component } from 'react'
import axios from 'axios/index';
import Message from './Message';
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';

const cookies = new Cookies();

class Chatbot extends Component {
    messagesEnd;
    talkInput;
    constructor(props) {
        super(props);
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this.state = {
            messages: []
        };
        if (cookies.get('userID') === undefined) {
            cookies.set('userID', uuid(), { path: '/' });
        }
        console.log(cookies.get('userID'));
    }

    async df_text_query(text) {
        let says = {
            speaks: 'me',
            msg: {
                text: {
                    text: text
                }
            }
        }

        this.setState({ messages: [...this.state.messages, says] })
        const res = await axios.post('http://localhost:5050/text_queryIntent', { text, userId: cookies.get('userID') })

        for (let msg of res.data.fulfillmentMessages) {
            says = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({ messages: [...this.state.messages, says] })
        }
    }



    async df_event_query(event) {
        const res = await axios.post('http://localhost:5050/event_queryIntent', { event, userId: cookies.get('userID') })
        console.log(res.data);
        for (let msg of res.data.fulfillmentMessages) {
            let says = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({ messages: [...this.state.messages, says] })
        }
    }

    renderMessages(stateMessages) {
        if (stateMessages) {
            return stateMessages.map((message, i) => {
                return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />
            })
        } else {
            return null;
        }
    }

    _handleInputKeyPress(e) {
        if (e.key === 'Enter') {
            this.df_text_query(e.target.value);
            e.target.value = '';
        }
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behaviour: 'smooth ' });
        this.talkInput.focus();
    }

    componentDidMount() {
        this.df_event_query("Welcome");
    }

    render() {
        return (
            <div style={{ height: "400px", width: "400px", float: 'right' }}>
                <div id="chatbot" style={{ height: '100%', width: '100%', overflow: 'auto' }}>
                    <h3>Chatbot</h3>
                    {this.renderMessages(this.state.messages)}
                    <div ref={(el) => { this.messagesEnd = el; }}
                        style={{ float: 'left', clear: 'both' }}>
                    </div>
                    <input
                        type="text"
                        ref={(input) => { this.talkInput = input }}
                        onKeyPress={this._handleInputKeyPress} />
                </div>

            </div>
        )
    }
}

export default Chatbot;
