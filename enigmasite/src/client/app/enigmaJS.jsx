import {h, Component} from 'preact';
import {EnigmaView} from './enigma.jsx';
import jsEngine from './jsEngine';

export class EnigmaJS extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.boundMessageChanged = this.messageChanged.bind(this);
        jsEngine.on(jsEngine.messageProcessedEvent, this.boundMessageChanged);
    }

    messageChanged() {
        this.setState({
            originalMessage: jsEngine.originalMessage,
            encryptedMessage: jsEngine.encryptedMessage
        });
    }

    render () {
        return (
            <div>
                <EnigmaView engine={jsEngine}/>
                <label>Last Execution Took: {jsEngine.timeTaken}</label>
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