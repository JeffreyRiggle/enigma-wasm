import {h, Component} from 'preact';
import {reflectorTypes} from './config';

export class Reflector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reflector: reflectorTypes[0]
        }
    }

    moveDown() {
        let index = reflectorTypes.indexOf(this.state.reflector) - 1;
        
        if (index < 0) {
            index = reflectorTypes.length - 1;
        }

        this.updateReflector(reflectorTypes[index]);
    }

    moveUp() {
        let index = reflectorTypes.indexOf(this.state.reflector) + 1;
        
        if (index >= reflectorTypes.length) {
            index = 0;
        }

        this.updateReflector(reflectorTypes[index]);
    }

    updateReflector(reflector) {
        this.props.engine.setReflector(reflector);
        this.setState({
            reflector: reflector
        });
    }

    render() {
        return (
            <div className="reflector">
                <div className="reflector-option-move-area">
                    <button onClick={this.moveDown.bind(this)} className="rotor-move-btn"><i className="fa fa-arrow-left"></i></button>
                    <button onClick={this.moveUp.bind(this)} className="rotor-move-btn"><i className="fa fa-arrow-right"></i></button>
                </div>
                <div className="reflector-dial reflector-option">
                    <span>{this.state.reflector}</span>
                </div>
            </div>
        );
    }
}