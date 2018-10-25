import React from 'react';
import bombeEngine from './bombeEngine';
import waitingImage from '../../../static/waiting.gif';
import './bombe.scss';

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
            config: result.config,
            running: false
        });
    }

    send() {
        bombeEngine.sendMessage(this.state.message, this.state.expectation);
        this.setState({
            originalMessage: '',
            config: '',
            running: true
        });
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
                    <div className="input-area">
                        <div className="input-child">
                            <textarea 
                                value={this.state.message} 
                                onChange={this.inputChanged.bind(this)} 
                                defaultValue="Encrypted Message here..."
                                className={"input-area " + (this.state.valid ? '' : 'error')}/>
                        </div>
                        <div className="input-child expectation">
                            <label>Expectation</label>
                            <div className="input-child">
                                <textarea className="input-area" 
                                        value={this.state.expectation} 
                                        onChange={this.expectationChanged.bind(this)} />
                                <button onClick={() => { this.send() }} 
                                        className="send-input"
                                        disabled={!this.state.valid}>Send</button>
                            </div>
                        </div>
                    </div>
                    {this.state.running && <img src={waitingImage} />}
                    <div className="result-container">
                        <div className="result-area">
                            <label>Javascript Engine</label>
                            <label>Last Execution Took: {bombeEngine.timeTaken}</label>
                            <div className="result-details">
                                <div className="result-detail-area">
                                    <label>Decoded Message</label>
                                    <textarea value={this.state.originalMessage} readOnly={true} className="output"/>
                                </div>
                                <div className="result-detail-area">
                                    <label>Found Configuration</label>
                                    <textarea value={this.state.config} readOnly={true} className="output"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}