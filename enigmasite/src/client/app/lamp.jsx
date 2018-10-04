import React from 'react';
import {alphabetRow1, alphabetRow2, alphabetRow3} from './config.js';
import './lamp.scss';

export class Lamp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.boundChangeLamp = this.changeLamp.bind(this);
        this.props.engine.on(this.props.engine.messageProcessedEvent, this.boundChangeLamp);
    }

    changeLamp(message) {
        this.setState({
            selected: message
        });
    }

    render() {
        return (
            <div className="lamp">
                <div className="row">
                    {alphabetRow1.map(letter => 
                        <span className={letter === this.state.selected ? 'selected' : ''}>{letter}</span>
                    )}
                </div>
                <div className="row">
                    {alphabetRow2.map(letter => 
                        <span className={letter === this.state.selected ? 'selected' : ''}>{letter}</span>
                    )}
                </div>
                <div className="row">
                    {alphabetRow3.map(letter => 
                        <span className={letter === this.state.selected ? 'selected' : ''}>{letter}</span>
                    )}
                </div>
            </div>
        );
    }

    componentWillUnmount() {
        this.props.engine.off(this.props.engine.messageProcessedEvent, this.boundChangeLamp);
    }
}