import React from 'react';
import {alphabetRow1, alphabetRow2, alphabetRow3} from './config.js';
import { Plug } from './plug.jsx';

export class Plugboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="plugboard">
                <div className="plug-row">
                    {alphabetRow1.map(letter => 
                        <Plug letter={letter}/>
                    )}
                </div>
                <div className="plug-row">
                    {alphabetRow2.map(letter => 
                        <Plug letter={letter}/>
                    )}
                </div>
                <div className="plug-row">
                    {alphabetRow3.map(letter => 
                        <Plug letter={letter}/>
                    )}
                </div>                
            </div>
        )
    }
}