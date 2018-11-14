import {h, Component} from 'preact';
import './landing.scss';

export class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <h1>Enigma</h1>
                <p>This is a site intended to provide a simple enigma user interface.</p>
                <p>This site has two different execution engines, one in rust and one in javascript.</p>
                <p>Press Javascript Engine or Rust Engine to test either of the engines.</p>
                <p>You can also use the Racer Engine to try and see which performs faster with larger messages.</p>
            </div>
        )
    }
}