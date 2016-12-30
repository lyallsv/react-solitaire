import React, { Component } from 'react';
import Deck from './Deck';
import DraggableCard from './DraggableCard';

class DealContainer extends Component {

  constructor() {
    super();
    this.state = {dealPosition: 0};
  }

  getCurrentDeltCards() {
    return this.props.deck.slice(
      this.state.dealPosition,
      this.state.dealPosition + 1
    );
  }

  deal() {
    let dealPosition = this.state.dealPosition + 1;
    if (dealPosition >= this.props.deck.length) {
      dealPosition = 0;
    }

    this.setState({
      dealPosition
    });
  }

  addCardToCompleteContainer(card) {
    this.props.onDoubleClick({
      card,
      container: 'deck'
    });
  }

  getRemainingCards() {
    return this.props.deck.length  - this.state.dealPosition;
  }

  render() {
    return (
      <div id="dealContainer">
        <Deck onClick={() => this.deal()}
          remainingCards={this.getRemainingCards()}
        />
        {this.getCurrentDeltCards().map(function(card) {
          return (
            <div onDoubleClick={() => this.addCardToCompleteContainer(card)}>
              <DraggableCard
                card={card}
                container='deck'
                isVisible={true}
              />
            </div>
          )}.bind(this)
        )}
      </div>
    );
  }
}

export default DealContainer;
