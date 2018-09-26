import React from 'react';
import {alphabetRow1, alphabetRow2, alphabetRow3} from './config.js';
import { Plug } from './plug.jsx';
import { PlugManager } from './plugManager.js';

export class Plugboard extends React.Component {
    constructor(props) {
        super(props);

        this.manager = new PlugManager();
        this.manager.on(this.manager.plugsChanged, this.onChanged.bind(this));
        this.state = {};
    }

    onChanged(changeEvent) {
        this.props.engine.setPlugboard(changeEvent.map);
    }

    render() {
        return (
            <div className="plugboard">
                <div className="plug-row">
                    {alphabetRow1.map(letter => 
                        <Plug letter={letter} manager={this.manager}/>
                    )}
                </div>
                <div className="plug-row">
                    {alphabetRow2.map(letter => 
                        <Plug letter={letter} manager={this.manager}/>
                    )}
                </div>
                <div className="plug-row">
                    {alphabetRow3.map(letter => 
                        <Plug letter={letter} manager={this.manager}/>
                    )}
                </div>                
            </div>
        )
    }
}