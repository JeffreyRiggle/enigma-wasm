import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, NavLink, Route} from 'react-router-dom';

import {EnigmaJS} from './enigmaJS.jsx';
import {EnigmaRust} from './enigmaRust.jsx';
import {EnigmaRacer} from './enigmaRacer.jsx';

import './common.scss';

export class App extends React.Component {
    render () {
        return (
            <nav className="navbar">
                <NavLink to="/js" className="nav-item" activeClassName="active">Javascript Engine</NavLink>
                <NavLink to="/rust" className="nav-item" activeClassName="active">Rust Engine</NavLink>
                <NavLink to="/racer" className="nav-item" activeClassName="active">Racer Engine</NavLink>
            </nav>
        );
    }
}

render((
    <BrowserRouter basename="/">
        <div>
            <App/>
            <Route path="/js" component={EnigmaJS}/>
            <Route path="/rust" component={EnigmaRust}/>
            <Route path="/racer" component={EnigmaRacer}/>
        </div>
    </BrowserRouter>
), document.getElementById('app'));