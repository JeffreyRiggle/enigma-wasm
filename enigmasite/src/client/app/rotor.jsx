import React from 'react';

export class Rotor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            position: 'A',
            nextPosition: 'B',
            lastPosition: 'Z'
        }

        this.boundUpdate = this.updateRotor.bind(this);
        this.rotor = this.props.engine.getRotor(this.props.ring);

        this.props.engine.on(this.props.engine.messageProcessedEvent, this.boundUpdate);
    }

    moveRotorDown() {
        this.props.engine.setRotor(this.props.ring, this.props.rotorType, this.state.position);
        updateRotor();
    }

    moveRotorUp() {
        this.props.engine.setRotor(this.props.ring, this.props.rotorType, this.state.position);
        updateRotor();
    }

    updateRotor() {
        let pos = this.rotor.position.charCodeAt(0) - 65;
        let next = String.fromCharCode(65 + (pos + 1));
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