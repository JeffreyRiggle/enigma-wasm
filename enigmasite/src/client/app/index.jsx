import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Link, Route} from 'react-router-dom';

import {EnigmaJS} from './enigmaJS.jsx';
import {EnigmaRust} from './enigmaRust.jsx';
import './common.scss';

export class App extends React.Component {
    render () {
        return (
            <div>
                <ul>
                    <li><Link to="/js">Javascript Engine</Link></li>
                    <li><Link to="/rust">Rust Engine</Link></li>
                </ul>
            </div>
        );
    }
}

render((
    <BrowserRouter basename="/">
        <div>
            <App/>
            <Route path="/js" component={EnigmaJS}/>
            <Route path="/rust" component={EnigmaRust}/>
        </div>
    </BrowserRouter>
), document.getElementById('app'));