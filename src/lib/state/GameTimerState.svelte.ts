import { ONE_SECOND_MS } from "$lib/constants";
import { SvelteDate } from "svelte/reactivity";

type TimerStatus = "idle" | "running" | "paused" | "stopped";

interface TimerState {
  status: TimerStatus;
  interval?: number;
  storedTime: number;
  trackingTime: number;
}

export default class GameTimerState {
  #timerState: TimerState = $state({
    status: "idle",
    storedTime: 0,
    trackingTime: 0,
  });

  public constructor() {
    $effect(() => {
      return () => {
        if (this.#timerState.interval) {
          clearInterval(this.#timerState.interval);
        }
      };
    });
  }

  public get timeElapsed(): number {
    return this.#timerState.storedTime + this.#timerState.trackingTime;
  }

  public start(): void {
    if (["idle", "paused"].includes(this.#timerState.status)) {
      const startTime = new SvelteDate().getTime();

      this.#timerState = {
        status: "running",
        storedTime: this.timeElapsed,
        trackingTime: 0,
        interval: setInterval(() => {
          this.#timerState = {
            ...this.#timerState,
            trackingTime: new SvelteDate().getTime() - startTime,
          };
        }, ONE_SECOND_MS),
      };
    }
  }

  public pause(): void {
    if (this.#timerState.status === "running") {
      clearInterval(this.#timerState.interval);

      this.#timerState = {
        ...this.#timerState,
        status: "paused",
        interval: undefined,
      };
    }
  }

  public stop(): void {
    if (this.#timerState.status !== "stopped") {
      clearInterval(this.#timerState.interval);

      this.#timerState = {
        ...this.#timerState,
        status: "stopped",
        interval: undefined,
      };
    }
  }
}
