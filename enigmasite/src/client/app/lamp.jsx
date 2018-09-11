import React from 'react';

export class Lamp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: 'A'
        }
    }

    render() {
        return (
            <div className="lamp">
                <div className="row">
                    <span>a</span><span>b</span><span>c</span><span>d</span><span>e</span><span>f</span><span>g</span><span>h</span><span>i</span>
                </div>
                <div className="row">
                    <span>j</span><span>k</span><span>l</span><span>m</span><span>n</span><span>o</span><span>p</span><span>q</span>
                </div>
                <div className="row">
                   <span>r</span><span>s</span><span>t</span><span>u</span><span>v</span><span>w</span><span>x</span><span>y</span><span>z</span>
                </div>
            </div>
        );
    }
}