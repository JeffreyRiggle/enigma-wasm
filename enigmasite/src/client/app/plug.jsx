import React from 'react';
import './plug.scss';

export class Plug extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mappedLetter: '',
            edit: false
        };

        this.boundEdit = this._toggleEdit.bind(this);
        this.boundChange = this._handleChange.bind(this);
        this.boundPress = this._handlePress.bind(this);
        this.boundPlugsChanged = this._onPlugsChanged.bind(this);
        this.props.manager.on(this.props.manager.plugsChanged, this.boundPlugsChanged);
    }

    _onPlugsChanged(changeEvent) {
        let newLetter;

        if (this.props.letter === changeEvent.key) {
            newLetter = changeEvent.value;
        } else if (this.props.letter === changeEvent.value) {
            newLetter = changeEvent.key;
        } else {
            return;
        }

        this.setState({
            mappedLetter: changeEvent.removed ? '' : newLetter,
            error: false
        });
    }

    _toggleEdit() {
        this.setState({
            edit: !this.state.edit
        });
    }

    _handleChange(event) {
        let letter = event.target.value.toUpperCase();

        if (this.props.manager.validatePlug(this.props.letter, letter)) {
            this.props.manager.setPlug(this.props.letter, letter);
            return;
        }

        this.setState({
            error: true
        });
    }

    _handlePress(event) {
        if (event.charCode !== 13 && event.key !== 'Enter') {
            return;
        }

        this._toggleEdit();
    }

    render() {
        return (
            <div className="plug">
                <div className="plug-key">{this.props.letter}</div>
                {this._renderValue()}
            </div>
        )
    }

    _renderValue() {
        if (this.state.edit) {
            return <input type="text"
                          defaultValue={this.state.mappedLetter}
                          onBlur={this.boundEdit} 
                          onChange={this.boundChange}
                          onKeyPress={this.boundPress}
                          className={this.state.error ? 'max-plug-size error' : 'max-plug-size'}
                          maxLength="1"
                          autoFocus/>
        }

        if (this.state.mappedLetter) {
            return <button onClick={this.boundEdit} className="plug-btn">{this.state.mappedLetter}</button>    
        }

        return <button className="plug-btn min-plug-size" onClick={this.boundEdit}><i className="fa fa-circle-o"></i></button>
    }

    componentWillUnmount() {
        this.props.manager.removeListener(this.props.manager.plugsChanged, this.boundPlugsChanged);
    }
}