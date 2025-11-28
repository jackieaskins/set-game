import type { CardDetails } from "$lib/types";

export function isValidSet(selectedCards: CardDetails[]): boolean {
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
