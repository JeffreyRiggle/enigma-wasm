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

        this.state = {
            loading: !this.props.engine.loaded
        };

        this.props.engine.on(this.props.engine.loadedEvent, () => {
            this.setState({
                loading: !this.props.engine.loaded
            });
        })
    }

    render () {
        if (this.state.loading) {
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
                    <Keyboard engine={this.props.engine} disabled={this.props.disableKeyboard}/>
                </div>
                <div>
                    <Plugboard engine={this.props.engine}/>
                </div>
            </div>
        );
    }
}