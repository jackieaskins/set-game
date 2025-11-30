import type PageVisibilityState from "$lib/state/PageVisibilityState.svelte";
import { getContext, setContext } from "svelte";

const CONTEXT_KEY = "page-visibility-context";

export function setPageVisibilityContext(gameState: PageVisibilityState): PageVisibilityState {
  return setContext(CONTEXT_KEY, gameState);
}

export function getPageVisibilityContext(): PageVisibilityState {
  return getContext(CONTEXT_KEY);
}
