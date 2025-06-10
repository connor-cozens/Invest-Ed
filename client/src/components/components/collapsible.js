import React from "react";

export class Collapsible extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle(e) {
        this.setState({open: !this.state.open})
    }

    render() {
        return (<div>
                <div onClick={(e) => this.toggle(e)} className='header'>
                    {
                        this.state.open ?
                            <i className="arrow up"></i>
                            : <i className="arrow down"></i>
                    }
                    {this.props.title}</div>
                {this.state.open ? (
                    <div className='content'>
                        {this.props.children}
                    </div>
                ) : null}
            </div>
        );
    }
}