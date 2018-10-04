import React from 'react';
import './plug.scss';

export class Plug extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mappedLetter: '',
            edit: false
        };

        this.boundEdit = this.toggleEdit.bind(this);
        this.boundChange = this.handleChange.bind(this);
        this.boundPress = this.handlePress.bind(this);
        this.props.manager.on(this.props.manager.plugsChanged, this.onPlugsChanged.bind(this));
    }

    onPlugsChanged(changeEvent) {
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

    toggleEdit() {
        this.setState({
            edit: !this.state.edit
        });
    }

    handleChange(event) {
        let letter = event.target.value.toUpperCase();

        if (this.props.manager.validatePlug(this.props.letter, letter)) {
            this.props.manager.setPlug(this.props.letter, letter);
            return;
        }

        this.setState({
            error: true
        });
    }

    handlePress(event) {
        if (event.charCode !== 13 && event.key !== 'Enter') {
            return;
        }

        this.toggleEdit();
    }

    render() {
        return (
            <div className="plug">
                <div className="plug-key">{this.props.letter}</div>
                {this.renderValue()}
            </div>
        )
    }

    renderValue() {
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

        return <button className={this.state.mappedLetter ? '' : 'min-plug-size'} onClick={this.boundEdit}>{this.state.mappedLetter}</button>
    }
}