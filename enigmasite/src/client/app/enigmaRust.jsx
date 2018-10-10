import React from 'react';
import rustEngine from './rustEngine';
import {EnigmaView} from './enigma.jsx';

export class EnigmaRust extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.boundMessageChanged = this.messageChanged.bind(this);
        rustEngine.on(rustEngine.messageProcessedEvent, this.boundMessageChanged);
    }

    messageChanged() {
        this.setState({
            originalMessage: rustEngine.originalMessage,
            encryptedMessage: rustEngine.encryptedMessage
        });
    }

    render () {
        return (
            <div>
                <h1>Rust Enigma</h1>
                <EnigmaView engine={rustEngine}/>
                <div className="result-container">
                    <div className="result-area">
                        <label>Input</label>
                        <textarea value={this.state.originalMessage} readOnly={true} className="output"/>
                    </div>
                    <div className="result-area">
                        <label>Output</label>
                        <textarea value={this.state.encryptedMessage} readOnly={true} className="output"/>
                    </div>
                </div>
            </div>
        );
    }
}