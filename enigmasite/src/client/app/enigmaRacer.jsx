import React from 'react';
import racerEngine from './racerEngine';
import {EnigmaView} from './enigma.jsx';

export class EnigmaRacer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.boundMessageChanged = this.messageChanged.bind(this);
        racerEngine.on(racerEngine.messageProcessedEvent, this.boundMessageChanged);
    }

    messageChanged(js, rs) {
        this.setState({
            encryptedMessageJS: js,
            encryptedMessageRS: rs
        });
    }

    send() {
        racerEngine.sendMessage(this.state.message);
    }

    inputChanged(event) {
        let message = this._santizeMessage(event.target.value);
        const valid = this._checkValid(message);

        this.setState({
            message: message,
            valid: valid
        });
    }

    _santizeMessage(message) {
        return message.toUpperCase().replace(/ /g, '');
    }

    _checkValid(message) {
        return /^[A-Z]+$/.test(message);
    }

    render() {
        return (
            <div>
                <EnigmaView engine={racerEngine} disableKeyboard={true}/>
                <div>
                    <div className="input-container">
                        <textarea 
                            value={this.state.message} 
                            onChange={this.inputChanged.bind(this)} 
                            defaultValue="Type Message here..."
                            className={"input-area " + (this.state.valid ? '' : 'error')}/>
                        <button onClick={() => { this.send() }} 
                                className="send-input"
                                disabled={!this.state.valid}>Send</button>
                    </div>
                    <div className="result-container">
                        <div className="result-area">
                            <label>Javascript Engine</label>
                            <label>Last Execution Took: {racerEngine.timeTakenJS}</label>
                            <textarea value={this.state.encryptedMessageJS} readOnly={true} className="output"/>
                        </div>
                        <div className="result-area">
                            <label>Rust Engine</label>
                            <label>Last Execution Took: {racerEngine.timeTakenRust}</label>
                            <textarea value={this.state.encryptedMessageRS} readOnly={true} className="output"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}