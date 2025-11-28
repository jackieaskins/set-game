import { getCardsFor } from "$lib/cards";
import type { CardDetails } from "$lib/types";
import { isValidSet } from "$lib/utils/set";
import { SvelteDate } from "svelte/reactivity";

const EXPECTED_SETS = 6;

export default class GameState {
  public readonly date = new SvelteDate();
  readonly #dateId = new Intl.DateTimeFormat("en-US").format(this.date);
  readonly #cards = getCardsFor(this.#dateId);

  #timeInterval: number;
  #timeElapsed = $state(0);

  #sets: CardSet[] = $state([]);

  public constructor() {
    this.#timeInterval = setInterval(() => {
      this.#timeElapsed = new SvelteDate().getTime() - this.date.getTime();
    }, 1000);

    $effect(() => {
      if (this.sets.length >= EXPECTED_SETS) {
        clearInterval(this.#timeInterval);
      }
    });
  }

  public get timeElapsed(): number {
    return this.#timeElapsed;
  }

  public get cards(): CardDetails[] {
    return this.#cards;
  }

  public get sets(): CardSet[] {
    return this.#sets;
  }

  public tryAddSet(cards: CardDetails[]): void {
    if (!isValidSet(cards)) {
      throw new Error("Not a match :(");
    }

    if (this.sets.some((set) => cards.every((card) => set.cardKeys.includes(card.key)))) {
      throw new Error("You already found that set :(");
    }

    this.#sets = [new CardSet(cards), ...this.sets];
  }

  public destroy(): void {
    clearInterval(this.#timeInterval);
  }
}

class CardSet {
  public constructor(public readonly cards: CardDetails[]) {}

  public get cardKeys() {
    return this.cards.map((card) => card.key);
  }

  public get key() {
    return this.cardKeys.join("&&");
  }
}
