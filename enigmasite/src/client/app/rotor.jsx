import React from 'react';
import './rotor.scss';

export class Rotor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            position: 'A',
            nextPosition: 'B',
            lastPosition: 'Z'
        };

        this.boundUpdate = this.updateRotor.bind(this);
        this.rotor = this.props.engine.getRotor(this.props.ring);

        this.props.engine.on(this.props.engine.messageProcessedEvent, this.boundUpdate);
    }

    moveRotorDown() {
        let pos = this.rotor.position.charCodeAt(0) - 65;
        let next = this.rotor.position === 'Z' ? 'A' : String.fromCharCode(65 + (pos + 1));

        this.props.engine.setRotor(this.props.ring, this.props.rotorType, next);
        this.updateRotor(true);
    }

    moveRotorUp() {
        let pos = this.rotor.position.charCodeAt(0) - 65;
        let last = this.rotor.position === 'A' ? 'Z' : String.fromCharCode(65 + (pos - 1));

        this.props.engine.setRotor(this.props.ring, this.props.rotorType, last);
        this.updateRotor(true);
    }

    updateRotor(refresh) {
        if (refresh) {
            this.rotor = this.props.engine.getRotor(this.props.ring);
        }

        let pos = this.rotor.position.charCodeAt(0) - 65;
        let next = this.rotor.position === 'Z' ? 'A' : String.fromCharCode(65 + (pos + 1));
        let last = this.rotor.position === 'A' ? 'Z' : String.fromCharCode(65 + (pos - 1));

        this.setState({
            position: this.rotor.position,
            nextPosition: next,
            lastPosition: last
        });
    }

    render() {
        return (
            <div className="rotor">
                <div className="rotor-wheel">
                    <span className="rotor-preview">{this.state.nextPosition}</span>
                    <span className="rotor-position">{this.state.position}</span>
                    <span className="rotor-preview">{this.state.lastPosition}</span>
                </div>
                <div className="rotor-move-area">
                    <button onClick={this.moveRotorUp.bind(this)} className="rotor-move-btn">up</button>
                    <button onClick={this.moveRotorDown.bind(this)} className="rotor-move-btn">down</button>
                </div>
            </div>
        );
    }
}