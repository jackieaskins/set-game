import { SvelteDate } from "svelte/reactivity";
import type GameState from "./GameState.svelte";
import { getDateId } from "$lib/utils/dateId";

const STATS_LOCAL_STORAGE_KEY = "set-game-stats";

export interface Stats {
  lastWonDateId?: string;
  streak: number;
  bestTime?: number;
}

export default class StatsState {
  readonly #gameState: GameState;
  #stats: Stats;

  constructor(gameState: GameState) {
    this.#gameState = gameState;

    this.#stats = $state(this.#localStorageStats);
  }

  public get stats(): Stats {
    return this.#stats;
  }

  get #localStorageStats(): Stats {
    const storedStats = localStorage.getItem(STATS_LOCAL_STORAGE_KEY);
    return storedStats ? (JSON.parse(storedStats) as Stats) : { streak: 0 };
  }

  public updateStats(): void {
    const { lastWonDateId, bestTime, streak } = this.#localStorageStats;

    if (!this.#gameState.hasWon || lastWonDateId === this.#gameState.dateId) {
      return;
    }

    const yesterdayDate = new SvelteDate();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterdayDateId = getDateId(yesterdayDate);

    const newStats: Stats = {
      lastWonDateId: this.#gameState.dateId,
      streak: yesterdayDateId === lastWonDateId ? streak + 1 : 1,
      bestTime:
        bestTime != undefined
          ? Math.min(bestTime, this.#gameState.timeElapsed)
          : this.#gameState.timeElapsed,
    };

    this.#stats = newStats;
    localStorage.setItem(STATS_LOCAL_STORAGE_KEY, JSON.stringify(newStats));
  }
}
