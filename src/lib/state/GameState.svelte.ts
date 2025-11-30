import { getCardsFor } from "$lib/cards";
import { CardDetails, type CardDetailsJSON } from "$lib/types";
import { isValidSet } from "$lib/utils/set";
import { SvelteDate } from "svelte/reactivity";
import type { MessageState } from "./MessageState.svelte";
import { ONE_SECOND_MS } from "$lib/constants";

interface GameStateStorage {
  dateId: string;
  timeElapsed: number;
  sets: CardDetailsJSON[][];
}

const EXPECTED_SETS = 6;

const GAME_STATE_LOCAL_STORAGE_KEY = "set-game-game-state";

export default class GameState {
  public readonly date = new SvelteDate();
  readonly #dateId = new Intl.DateTimeFormat("en-US").format(this.date);
  readonly #cards = getCardsFor(this.#dateId);

  readonly #messageState: MessageState;

  readonly #timerOffset: number;
  readonly #timeInterval: number;
  #timeElapsed = $state(0);

  #sets: CardSet[];

  public constructor(messageState: MessageState) {
    this.#messageState = messageState;

    const { timeElapsed, sets } = this.getSavedGameState();

    this.#timerOffset = timeElapsed;
    this.#sets = $state(sets.map((cards) => new CardSet(cards)));

    this.#timeInterval = setInterval(() => {
      this.#timeElapsed = new SvelteDate().getTime() - this.date.getTime();
    }, ONE_SECOND_MS);

    $effect(() => {
      if (this.sets.length >= EXPECTED_SETS) {
        clearInterval(this.#timeInterval);
      }
    });

    $effect(() => {
      const newGameState: GameStateStorage = {
        dateId: this.#dateId,
        sets: this.sets.map(({ cards }) => cards),
        timeElapsed: this.timeElapsed,
      };

      localStorage.setItem(GAME_STATE_LOCAL_STORAGE_KEY, JSON.stringify(newGameState));
    });
  }

  private getSavedGameState() {
    const {
      dateId,
      timeElapsed = 0,
      sets = [],
    } = JSON.parse(
      localStorage.getItem(GAME_STATE_LOCAL_STORAGE_KEY) ?? "{}",
    ) as Partial<GameStateStorage>;

    const hasSavedGameState = this.#dateId === dateId;

    return {
      timeElapsed: hasSavedGameState ? timeElapsed : 0,
      sets: hasSavedGameState
        ? sets.map((cards) => cards.map((card) => CardDetails.fromJSON(card)))
        : [],
    };
  }

  public get timeElapsed(): number {
    return this.#timeElapsed + this.#timerOffset;
  }

  public get cards(): CardDetails[] {
    return this.#cards;
  }

  public get sets(): CardSet[] {
    return this.#sets;
  }

  public tryAddSet(cards: CardDetails[]): void {
    if (!isValidSet(cards)) {
      this.#messageState.message = { type: "error", text: "Not a set. :(" };
      return;
    }

    if (this.sets.some((set) => set.hasAllCards(cards))) {
      this.#messageState.message = { type: "error", text: "You already found that set. :(" };
      return;
    }

    this.#sets = [new CardSet(cards), ...this.sets];
    this.#messageState.message = { type: "success", text: "Yay! You found a new set!" };
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

  public hasAllCards(cards: CardDetails[]) {
    return cards.every((card) => this.cardKeys.includes(card.key));
  }
}
