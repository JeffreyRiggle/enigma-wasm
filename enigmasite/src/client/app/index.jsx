import React from 'react';
import {render} from 'react-dom';
import {Enigma} from './enigma.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <h1>Simple Enigma Interface</h1>
                <Enigma/>
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));