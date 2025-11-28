import type GameState from "$lib/state/GameState.svelte";
import { getContext, setContext } from "svelte";

const CONTEXT_KEY = "game-context";

export function setGameContext(gameState: GameState): GameState {
  return setContext(CONTEXT_KEY, gameState);
}

export function getGameContext(): GameState {
  return getContext(CONTEXT_KEY);
}
