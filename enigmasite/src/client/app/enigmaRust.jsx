import {h, Component} from 'preact';
import rustEngine from './rustEngine';
import {EnigmaView} from './enigma.jsx';

export class EnigmaRust extends Component {
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
                <EnigmaView engine={rustEngine}/>
                <label>Last Execution Took: {rustEngine.timeTaken}</label>
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