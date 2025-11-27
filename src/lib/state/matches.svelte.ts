import type { CardDetails } from "$lib/types";

function isValidMatch(selectedCards: CardDetails[]) {
  if (selectedCards.length !== 3) return false;

  const [firstCard, secondCard, thirdCard] = selectedCards;

  // Return false if somehow multiple of the same card is selected
  if (
    firstCard.key === secondCard.key ||
    secondCard.key === thirdCard.key ||
    firstCard.key === thirdCard.key
  ) {
    return false;
  }

  const parameters: (keyof CardDetails)[] = ["count", "pattern", "color", "shape"];
  return parameters.every((parameter) => {
    const allSame =
      firstCard[parameter] === secondCard[parameter] &&
      secondCard[parameter] === thirdCard[parameter];
    const allDifferent =
      firstCard[parameter] !== secondCard[parameter] &&
      firstCard[parameter] !== thirdCard[parameter] &&
      secondCard[parameter] !== thirdCard[parameter];

    return allSame || allDifferent;
  });
}

class Match {
  public constructor(public readonly cards: CardDetails[]) {}

  private get cardKeys() {
    return this.cards.map((card) => card.key);
  }

  public get key() {
    return this.cardKeys.join("&&");
  }

  public hasAllCards(otherCards: CardDetails[]) {
    return otherCards.every((otherCard) => this.cardKeys.includes(otherCard.key));
  }
}

export class Matches {
  private matches: Match[] = $state([]);

  public tryAddMatch(cards: CardDetails[]) {
    if (!isValidMatch(cards)) {
      throw new Error("Not a match :(");
    }

    if (this.matches.some((match) => match.hasAllCards(cards))) {
      throw new Error("Already found match");
    }

    this.matches = [new Match(cards), ...this.matches];
  }

  public get all() {
    return this.matches.map((match) => ({ cards: match.cards, key: match.key }));
  }
}
