import React from 'react';

export class Rotor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            position: 'A',
            nextPosition: 'B',
            lastPosition: 'Z'
        }
    }

    moveRotorDown() {

    }

    moveRotorUp() {

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