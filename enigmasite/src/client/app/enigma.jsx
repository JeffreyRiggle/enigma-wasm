import React from 'react';
import { Rotor } from './rotor.jsx';
import { Reflector } from './reflector.jsx';
import { Lamp } from './lamp.jsx';
import { Keyboard } from './keyboard.jsx';
import { Plugboard } from './plugboard.jsx';
import './enigma.scss';

export class EnigmaView extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        if (!this.props.engine.loaded) {
            return (
                <div><h1>Loading...</h1></div>
            )
        }

        return (
            <div className="enigma">
                <div className="rotor-area">
                    <Reflector engine={this.props.engine}/>
                    <Rotor engine={this.props.engine} ring={2} rotorType={'III'}/>
                    <Rotor engine={this.props.engine} ring={1} rotorType={'II'}/>
                    <Rotor engine={this.props.engine} ring={0} rotorType={'I'}/>
                </div>
                    <Lamp engine={this.props.engine}/>
                <div>
                    <Keyboard engine={this.props.engine}/>
                </div>
                <div>
                    <Plugboard engine={this.props.engine}/>
                </div>
            </div>
        );
    }
}