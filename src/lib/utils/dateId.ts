import type { SvelteDate } from "svelte/reactivity";

const FORMATTER = new Intl.DateTimeFormat("en-US");

export function getDateId(date: SvelteDate): string {
  return FORMATTER.format(date);
}
