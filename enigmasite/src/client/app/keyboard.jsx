import React from 'react';
import {alphabetRow1, alphabetRow2, alphabetRow3} from './config.js';
const isValid = /[a-z|A-Z]/i;

export class Keyboard extends React.Component {
    constructor(props) {
        super(props);

        this.boundPressed = this.buttonPressed.bind(this);
    }

    buttonPressed(letter) {
        console.log(letter);
        this.props.engine.sendMessage(letter).then((encryped) => {
            console.log(encryped);
        }).catch(err => {
            console.log(err);
        });
    }

    keyPressed(e) {
        if (!isValid.test(e.key) || this.props.disabled) {
            return;
        }

        this.props.engine.sendMessage(e.key.toUpperCase()).then((encryped) => {
            console.log(encryped);
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div className="lamp" onKeyPress={this.keyPressed.bind(this)}>
                <div className="row">
                    {alphabetRow1.map(letter => 
                        <button onClick={() => this.boundPressed(letter)} key={letter} disabled={this.props.disabled}>{letter}</button>
                    )}
                </div>
                <div className="row">
                    {alphabetRow2.map(letter => 
                        <button onClick={() => this.boundPressed(letter)} key={letter} disabled={this.props.disabled}>{letter}</button>
                    )}
                </div>
                <div className="row">
                    {alphabetRow3.map(letter => 
                        <button onClick={() => this.boundPressed(letter)} key={letter} disabled={this.props.disabled}>{letter}</button>
                    )}
                </div>
            </div>
        );
    }
}