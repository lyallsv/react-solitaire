import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';

import GameUtils from './GameUtils';
import EventHandler from './EventHandler';
import HTML5Backend from 'react-dnd-html5-backend';
import CardContainer from './CardContainer';
import DealContainer from './DealContainer';
import CompletedContainer from './CompletedContainer';
import ContainerRepository from './ContainerRepository';

class GameContainer extends Component {

  constructor() {
    super();
    this.setUpGame();
  }

  setUpGame() {
    let deck = GameUtils.getShuffledDeck();
    this.state = {
      deck,
      cardContainers: GameUtils.setUpCardContainers(deck),
      completeContainers: GameUtils.setUpCompletedCardContainers()
    }
  }

  handleDrop(item, index, droppedOn) {
    let {deck} = this.state;
    let eventHandler = this.getEventHandler();

    eventHandler.handleDrop(item, index, droppedOn);

    this.setGameState(
      eventHandler.getCardContainers(),
      eventHandler.getCompletedContainers(),
      GameUtils.removeCardFromDeck(item.card, deck)
    );
  }

  handleDoubleClick(item, index) {
    let {deck} = this.state;
    let eventHandler = this.getEventHandler();

    let success = eventHandler.handleDoubleClick(item, index);

    this.setGameState(
      eventHandler.getCardContainers(),
      eventHandler.getCompletedContainers(),
      success ? GameUtils.removeCardFromDeck(item.card, deck) : deck
    );
  }

  setGameState(cardContainers, completeContainers, deck) {
    this.setState({
      cardContainers,
      completeContainers,
      deck
    });
  }

  getEventHandler() {
    let {cardContainers, completeContainers} = this.state;
    return new EventHandler(
      new ContainerRepository(
        cardContainers,
        completeContainers
      )
    );
  }

  render() {
    let {deck, completeContainers, cardContainers} = this.state;

    return (
      <div id="gameContainer">
        <div id="topContainer">
          <DealContainer
            deck={deck}
            onDoubleClick={(item, index) => this.handleDoubleClick(item, index)}
          />
          {completeContainers.map((item, index) =>
            <CompletedContainer
              key={index}
              suit={index}
              suitName={item.suit}
              accepts={item.accepts}
              onDrop={(item) => this.handleDrop(item, index, 'suit')}
            />
          )}
        </div>
        {cardContainers.map((item, index) =>
            <CardContainer
              key={index}
              accepts={item.accepts}
              cards={item.cards}
              container={index}
              onDrop={(item) => this.handleDrop(item, index, 'container')}
              onDoubleClick={(item) => this.handleDoubleClick(item, index)}
            />
        )}
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(GameContainer);
