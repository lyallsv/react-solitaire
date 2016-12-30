import CardUtils from './CardUtils';

export default class EventHandler {

  constructor(containerRepository) {
    this.containerRepository = containerRepository;
  }

  handleDrop(card, index, droppedOn) {
    if (droppedOn === 'container') {
      this.containerRepository.dropCardOnContainer(card, index);
    } else {
      this.containerRepository.dropCardOnCompletedContainer(card, index);
    }
  }

  handleDoubleClick(item, index) {
    return this.containerRepository.addCardToCompleteContainer(
      this.getCardFromEventItem(item, index)
    );
  }

  getCardFromEventItem(item, index) {
    if (CardUtils.isInDeck(item)) {
      return item;
    }

    let card = this.getLastCardInContainer(item);
    card.container = index;
    return card;
  }

  getLastCardInContainer(container) {
    return container.cards[container.cards.length -1];
  }

  getCompletedContainers() {
    return this.containerRepository.getCompletedContainers();
  }

  getCardContainers() {
    return this.containerRepository.getCardContainers();
  }
}
