import React, { Component } from 'react';
import CardMeta from './CardMeta';
import CardUtils from './CardUtils';

class Card extends Component {

  render() {
    let {isVisible, card} = this.props;
    let meta = CardUtils.getMeta(card);

    return (
      <div className={"card " + (isVisible ? '' : 'flipped')}>
        <div className={"detail " + (meta.color)}>
          {meta.abbreviation}&nbsp;
          {meta.icon}
        </div>
        <CardMeta meta={meta} />
      </div>
    );
  }
}

export default Card;
