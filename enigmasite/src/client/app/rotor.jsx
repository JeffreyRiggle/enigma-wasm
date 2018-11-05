import React from 'react';
import './rotor.scss';
import {getLastLastType, getNextType} from './rotormanager';

export class Rotor extends React.Component {
    constructor(props) {
        super(props);

        this.boundUpdate = this.updateRotor.bind(this);
        this.rotor = this.props.engine.getRotor(this.props.ring);

        this.state = {
            position: 'A',
            nextPosition: 'B',
            lastPosition: 'Z',
            type: this.props.rotorType
        };

        this.props.engine.on(this.props.engine.messageProcessedEvent, this.boundUpdate);
    }

    moveRotorDown() {
        let pos = this.rotor.position.charCodeAt(0) - 65;
        let next = this.rotor.position === 'Z' ? 'A' : String.fromCharCode(65 + (pos + 1));

        this.props.engine.setRotor(this.props.ring, this.state.type, next);
        this.updateRotor(true);
    }

    moveRotorUp() {
        let pos = this.rotor.position.charCodeAt(0) - 65;
        let last = this.rotor.position === 'A' ? 'Z' : String.fromCharCode(65 + (pos - 1));

        this.props.engine.setRotor(this.props.ring, this.state.type, last);
        this.updateRotor(true);
    }

    nextType() {
        let next = getNextType(this.state.type);
        this.props.engine.setRotor(this.props.ring, next, this.state.position);

        this.updateRotor(true);
    }

    lastType() {
        let last = getLastType(this.state.type);
        this.props.engine.setRotor(this.props.ring, last, this.state.position);

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
            type: this.rotor.type,
            nextPosition: next,
            lastPosition: last
        });
    }

    render() {
        return (
            <div className="rotor">
                <div className="rotor-type">
                    <button className="rotor-move-btn" onClick={this.lastType.bind(this)}><i className="fa fa-arrow-left"></i></button>
                    <span>{this.state.type}</span>
                    <button className="rotor-move-btn" onClick={this.nextType.bind(this)}><i className="fa fa-arrow-right"></i></button>
                </div>
                <div className="rotor-dial">
                    <div className="rotor-wheel">
                        <span className="rotor-preview">{this.state.nextPosition}</span>
                        <span className="rotor-position">{this.state.position}</span>
                        <span className="rotor-preview">{this.state.lastPosition}</span>
                    </div>
                    <div className="rotor-move-area">
                        <button onClick={this.moveRotorUp.bind(this)} className="rotor-move-btn"><i className="fa fa-arrow-up"></i></button>
                        <button onClick={this.moveRotorDown.bind(this)} className="rotor-move-btn"><i className="fa fa-arrow-down"></i></button>
                    </div>
                </div>
            </div>
        );
    }
}