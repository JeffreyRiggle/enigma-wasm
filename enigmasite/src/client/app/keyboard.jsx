import React from 'react';
import {alphabetRow1, alphabetRow2, alphabetRow3} from './config.js';
import './keyboard.scss';

const isValid = /[a-z|A-Z]/i;

export class Keyboard extends React.Component {
    constructor(props) {
        super(props);

        this.boundPressed = this.buttonPressed.bind(this);
        this.state = {
            lastPressed: ''
        };
    }

    buttonPressed(letter) {
        this.updateLastPressed(letter);
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

        let pressed = e.key.toUpperCase()
        this.updateLastPressed(pressed);

        this.props.engine.sendMessage(pressed).then((encryped) => {
            console.log(encryped);
        }).catch(err => {
            console.log(err);
        });
    }

    updateLastPressed(key) {
        this.setState({
            lastPressed: key
        });
    }

    render() {
        return (
            <div className="keyboard letter-grid" onKeyPress={this.keyPressed.bind(this)}>
                <div className="letter-grid-row">
                    {alphabetRow1.map(letter => 
                        <button onClick={() => this.boundPressed(letter)} key={letter} disabled={this.props.disabled} className={'letter-grid-item' + (this.state.lastPressed === letter ? ' active' : '')}>{letter}</button>
                    )}
                </div>
                <div className="letter-grid-row">
                    {alphabetRow2.map(letter => 
                        <button onClick={() => this.boundPressed(letter)} key={letter} disabled={this.props.disabled} className={'letter-grid-item' + (this.state.lastPressed === letter ? ' active' : '')}>{letter}</button>
                    )}
                </div>
                <div className="letter-grid-row">
                    {alphabetRow3.map(letter => 
                        <button onClick={() => this.boundPressed(letter)} key={letter} disabled={this.props.disabled} className={'letter-grid-item' + (this.state.lastPressed === letter ? ' active' : '')}>{letter}</button>
                    )}
                </div>
            </div>
        );
    }
}