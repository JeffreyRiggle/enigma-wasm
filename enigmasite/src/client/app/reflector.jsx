import React from 'react';

export class Reflector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reflector: 'A'
        }
    }

    moveDown() {

    }

    moveUp() {

    }

    render() {
        return (
            <div className="reflector">
                <div className="reflector-option">
                    <span>{this.state.reflector}</span>
                </div>
                <div className="reflector-option-move-area">
                    <button onClick={this.moveUp.bind(this)} className="rotor-move-btn"><i className="fa fa-arrow-up"></i></button>
                    <button onClick={this.moveDown.bind(this)} className="rotor-move-btn"><i className="fa fa-arrow-down"></i></button>
                </div>
            </div>
        );
    }
}