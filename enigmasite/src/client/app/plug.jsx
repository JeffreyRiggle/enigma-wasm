import React from 'react';

export class Plug extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mappedLetter: ' ',
            edit: false
        };

        this.boundEdit = this.toggleEdit.bind(this);
        this.boundChange = this.handleChange.bind(this);
        this.boundPress = this.handlePress.bind(this);
    }

    toggleEdit() {
        this.setState({
            edit: !this.state.edit
        });
    }

    handleChange(event) {
        let letter = event.target.value.toUpperCase();
        let errored = false;

        if (letter === this.props.letter) {
            errored = true;
        }

        this.setState({
            mappedLetter: errored ? '' : letter,
            error: false
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
                <div>{this.props.letter}</div>
                {this.renderValue()}
            </div>
        )
    }

    renderValue() {
        if (this.state.edit) {
            return <input type="text" 
                          onBlur={this.boundEdit} 
                          onChange={this.boundChange}
                          onKeyPress={this.boundPress}
                          className={this.state.error ? 'error' : ''}
                          maxLength="1"></input>
        }

        return <button className={this.state.mappedLetter ? '' : ''} onClick={this.boundEdit}>{this.state.mappedLetter}</button>
    }
}