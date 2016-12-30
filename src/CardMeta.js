import React, { Component } from 'react';
import './CardMeta.css';

class CardMeta extends Component {
  render () {
    return (
      <pre className="meta">
        <span className="var">var</span>
          <span className="varName"> Card</span> = {"{\n"}
          <span className="varKey">  rank</span>:
          <span className="varValue"> {this.props.meta.rank},</span>{"\n"}
          <span className="varKey">  suit</span>:
          <span className="varValue"> "{this.props.meta.suite}"</span>{"\n"}
          <span className="varKey">  color</span>:
          <span className="varValue"> "{this.props.meta.color}"</span>{"\n"}
        {"}"}
      </pre>
    );
  }
}

export default CardMeta;
