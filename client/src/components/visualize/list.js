import React, {Component} from 'react'

class List extends Component {
  render() {
    let listHeading = this.props.data !== undefined ?
    (
      (this.props.data !== null && this.props.heading !== null) ?
        <li className ="list-group-item d-flex justify-content-between align-items-center"><h4><b>Initiatives - {this.props.heading}</b></h4></li>
        : null
    ) : null

    let itemsList = this.props.data !== undefined ? (
      this.props.data !== null ? (
        this.props.data.map((item) => {
          return (
            <li className ="list-group-item d-flex justify-content-between align-items-center">{item}</li>
          )
        })
      ) : null
    ) : null

    return (
      <div>
        <ul className="list-group" style = {{width: "400px"}}>
          {listHeading}
          {itemsList}
        </ul>
      </div>
    );
  }
}

export default List
