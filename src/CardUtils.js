export default class CardUtils {

  static getRank(card) {
    let rank = card % 13;
    return rank === 0 ? 13 : rank;
  }

  static getAbbreviation(card) {
    if (card % 13 === 0) {
      return 'K';
    }

    if (card % 13 === 12) {
      return 'Q';
    }

    if (card % 13 === 11) {
      return 'J';
    }

    return this.getRank(card);
  }

  static getMeta(card) {
    let meta = {};

    switch (true) {
      case card <= 13:
         meta = {
          suite: 'Hearts',
          icon: '♥',
          color: 'Red',
        };
      break;
      case card <= 26:
          meta = {
           suite: 'Diamond',
           icon: '♦',
           color: 'Red',
         };
      break;
      case card <= 39:
          meta = {
           suite: 'Spades',
           icon: '♠',
           color: 'Black',
         };
      break;
      default:
          meta = {
           suite: 'Spades',
           icon: '♣',
           color: 'Black',
         };
    }

    meta.rank = this.getRank(card);
    meta.abbreviation = this.getAbbreviation(card);
    return meta;

  }

  static calculateAccepts(card) {
    let accepts = [];
    let multipler = [0, 1];

    if (card <= 26) {
      multipler = [2, 3];
    }

    if (card % 13 === 0) {
      card = 12;
    } else {
      card = (card % 13) - 1;
    }

    for (let i = 0; i <= 1; i++) {
        accepts.push(card + (13 * multipler[i]));
    }

    return accepts;
  }

  static isInDeck(card) {
    return card.container === 'deck';
  }

  static isCardSorted(card) {
    return card.container === 'completed';
  }

}
