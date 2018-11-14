import {h, Component} from 'preact';
import {alphabetRow1, alphabetRow2, alphabetRow3} from './config.js';
import './lamp.scss';

export class Lamp extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.boundChangeLamp = this.changeLamp.bind(this);
        this.props.engine.on(this.props.engine.messageProcessedEvent, this.boundChangeLamp);
    }

    changeLamp(message) {
        this.setState({
            selected: message
        });
    }

    render() {
        return (
            <div className="letter-grid">
                <div className="letter-grid-row">
                    {alphabetRow1.map(letter => 
                        <span className={letter === this.state.selected ? 'letter-grid-item selected' : 'letter-grid-item'} key={letter}>{letter}</span>
                    )}
                </div>
                <div className="letter-grid-row">
                    {alphabetRow2.map(letter => 
                        <span className={letter === this.state.selected ? 'letter-grid-item selected' : 'letter-grid-item'} key={letter}>{letter}</span>
                    )}
                </div>
                <div className="letter-grid-row">
                    {alphabetRow3.map(letter => 
                        <span className={letter === this.state.selected ? 'letter-grid-item selected' : 'letter-grid-item'} key={letter}>{letter}</span>
                    )}
                </div>
            </div>
        );
    }

    componentWillUnmount() {
        this.props.engine.removeListener(this.props.engine.messageProcessedEvent, this.boundChangeLamp);
    }
}