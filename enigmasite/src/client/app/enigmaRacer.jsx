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
        this.setState({
            message: event.target.value
        });
    }

    render() {
        return (
            <div>
                <EnigmaView engine={racerEngine} disableKeyboard={true}/>
                <div>
                    <div>
                        <textarea value={this.state.message} onChange={this.inputChanged.bind(this)}/>
                        <button onClick={() => { this.send() }}>Send</button>
                    </div>
                    <div>
                        <div>
                            <label>Javascript Engine</label>
                            <label>Last Execution Took: {racerEngine.timeTakenJS}</label>
                            <textarea value={this.state.encryptedMessageJS} readOnly={true} className="output"/>
                        </div>
                        <div>
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