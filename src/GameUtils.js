import CardUtils from './CardUtils';

export default class GameUtils {

  static getShuffledDeck() {
    return this.shuffleDeck(
      this.getDeck()
    );
  }

  static getDeck() {
    let deck = [];
    for (let i = 0; i < 53; i++) {
      deck[i] = i;
    }
    return deck;
  }

  static shuffleDeck(a) {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
  }

  static removeCardFromDeck(card, deck) {
    return deck.filter((i, _) => i !== card);
  }

  static setUpCardContainers(deck) {
    let containers = []
    for (let container = 0; container < 7; container++) {
      let cards = this.getCardsToAddToContainer(container, deck);
      containers.push({
        accepts: CardUtils.calculateAccepts(cards[cards.length - 1].card),
        cards: cards
      });
    }
    return containers;
  }

  static getCardsToAddToContainer(container, deck) {
    let cards = [];
    for (let j = 0; j < container + 1; j++) {
      cards.push({
        card: deck[j],
        isVisible: j === container ? true : false
      });
      deck.splice(j, 1);
    }
    return cards;
  }

  static setUpCompletedCardContainers() {
    let suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
    let accepts = [];
    for (let i = 0; i <= 3; i++) {
      accepts.push({
        suit: suits[i],
        accepts: (i * 13) + 1
      })
    }
    return accepts;
  }
}
