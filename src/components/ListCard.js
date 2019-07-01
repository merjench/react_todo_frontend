import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'

class ListCard extends Component {



  render() {
    return (
      <Card >
        <div>
          <div className="content">
            <div onClick={() => this.props.handleClick(this.props.list.id)}
              className="header">{this.props.list.title}</div>
          </div>
          <div className="extra content">
          </div>
        </div>
      </Card>
    );
  }

}

export default ListCard;
