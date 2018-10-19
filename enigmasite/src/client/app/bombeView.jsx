import React from 'react';
import bombeEngine from './bombeEngine';

export class BombeView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.boundCodeFound = this.codeFound.bind(this);
        bombeEngine.on(bombeEngine.codeFoundEvent, this.boundCodeFound);
    }

    codeFound(result) {
        this.setState({
            originalMessage: result.result,
            config: result.config
        });
    }

    send() {
        bombeEngine.sendMessage(this.state.message, this.state.expectation);
    }

    inputChanged(event) {
        let message = this._santizeMessage(event.target.value);
        const valid = this._checkValid(message);

        this.setState({
            message: message,
            valid: valid
        });
    }

    expectationChanged(event) {
        this.setState({
            expectation: event.target.value
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
                <div>
                    <div className="input-container">
                        <textarea 
                            value={this.state.message} 
                            onChange={this.inputChanged.bind(this)} 
                            defaultValue="Encrypted Message here..."
                            className={"input-area " + (this.state.valid ? '' : 'error')}/>
                        <button onClick={() => { this.send() }} 
                                className="send-input"
                                disabled={!this.state.valid}>Send</button>
                        <label>Expectation</label>
                        <textarea value={this.state.expectation} onChange={this.expectationChanged.bind(this)} />
                    </div>
                    <div className="result-container">
                        <div className="result-area">
                            <label>Javascript Engine</label>
                            <label>Last Execution Took: {bombeEngine.timeTaken}</label>
                            <textarea value={this.state.originalMessage} readOnly={true} className="output"/>
                            <textarea value={this.state.config} readOnly={true} className="output"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}