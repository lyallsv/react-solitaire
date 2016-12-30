import CardUtils from './CardUtils';

export default class ContainerRepository {

  constructor(cardContainers, completeContainers) {
    this.cardContainers = cardContainers;
    this.completeContainers = completeContainers;
  }

  getCompletedContainers() {
    return this.completeContainers;
  }

  getCardContainers() {
    return this.cardContainers;
  }

  getCardContainer(index) {
    return this.cardContainers[index];
  }

  addCardToContainer(card, container) {
    container.cards.push({
      card: card.card,
      isVisible: true
    });
  }

  addCardsToContainer(cards, container) {
    for (var card of cards) {
      this.addCardToContainer(card, container);
    }
  }

  addCardToCompleteContainer(card) {
    for (let i = 0; i < this.completeContainers.length; i++) {
      if (this.completeContainers[i].accepts === card.card) {
        this.dropCardOnCompletedContainer(card, i);
        return true;
      }
    }
    return false;
  }

  removeCardFromContainer(card, container) {
    this.cardContainers[container].cards =
      this.cardContainers[container].cards.filter((i, _) => i.card !== card.card)
  }

  updateCompletedContainerSuitAccepts(suit, accept) {
    this.completeContainers[suit].accepts = accept;
  }

  isContainerEmpty(container) {
    return container.cards.length === 0
  }

  dropCardOnContainer(card, index) {
    this.processDrop(card, this.cardContainers[index]);
    this.updateCardAcceptsAndVisiblity();

    if (CardUtils.isCardSorted(card)) {
      this.updateCompletedContainerSuitAccepts(card.suit, card.card);
    }
  }

  dropCardOnCompletedContainer(card, index) {
    if (CardUtils.isInDeck(card) === false) {
      this.removeCardFromContainer(card, card.container);
    }
    this.updateCompletedContainerSuitAccepts(index, card.card + 1);
    this.updateCardAcceptsAndVisiblity();
  }

  processDrop(card, container) {
    if (CardUtils.isInDeck(card) || CardUtils.isCardSorted(card)) {
      this.addCardToContainer(card, container)
    } else {
      this.addStackedCardsToContainer(card, container);
    }
  }

  addStackedCardsToContainer(card, container) {
    let originalContainer = this.getCardContainer(card.container);
    let cardIndex = originalContainer.cards.findIndex(x =>
      x.card === card.card
    );

    this.addCardsToContainer(
      originalContainer.cards.slice(cardIndex),
      container
    );
    this.cardContainers[card.container].cards =
      this.cardContainers[card.container].cards.slice(0, cardIndex);
  }

  updateCardAcceptsAndVisiblity() {
    for (let i = 0; i < this.cardContainers.length; i++) {
      if (this.isContainerEmpty(this.cardContainers[i])) {
        this.cardContainers[i].accepts = 'all';
      } else {
        let lastCardIndex = this.cardContainers[i].cards.length - 1;
        this.cardContainers[i].cards[lastCardIndex].isVisible = true;
        this.cardContainers[i].accepts = CardUtils.calculateAccepts(
          this.cardContainers[i].cards[lastCardIndex].card
        );
      }
    }
  }
}
