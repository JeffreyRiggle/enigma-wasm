import {h, render, Component} from 'preact';
import {Router} from 'preact-router';
import {Link} from 'preact-router/match';

import {EnigmaJS} from './enigmaJS.jsx';
import {EnigmaRust} from './enigmaRust.jsx';
import {EnigmaRacer} from './enigmaRacer.jsx';
import {Landing} from './landing.jsx';

import './common.scss';

export class App extends Component {
    render () {
        return (
            <nav className="navbar">
                <Link href="/js" className="nav-item" activeClassName="active">Javascript Engine</Link>
                <Link href="/rust" className="nav-item" activeClassName="active">Rust Engine</Link>
                <Link href="/racer" className="nav-item" activeClassName="active">Racer Engine</Link>
            </nav>
        );
    }
}

render((
    <div>
        <App/>
        <Router basename="/robit">
            <Landing default/>
            <EnigmaJS path="/js"/>
            <EnigmaRust path="/rust"/>
            <EnigmaRacer path="/racer"/>
        </Router>
    </div>
), document.getElementById('app'));