import React from 'react';
import {Rotor} from './rotor.jsx';
import {Reflector} from './reflector.jsx';
import {Lamp} from './lamp.jsx';

import './main.css';

export class Enigma extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="enigma">
                <div className="rotor-area">
                    <Reflector/>
                    <Rotor/>
                    <Rotor/>
                    <Rotor/>
                </div>
                <Lamp />
                <div>
                    <div>keys</div>
                </div>
                <div>
                    <div>Plugboard</div>
                </div>
            </div>
        );
    }
}