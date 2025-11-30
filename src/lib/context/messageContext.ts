import { MessageState } from "$lib/state/MessageState.svelte";
import { getContext, setContext } from "svelte";

const CONTEXT_KEY = "message-context";

export function setMessageContext(messageState: MessageState): MessageState {
  return setContext(CONTEXT_KEY, messageState);
}

export function getMessageContext(): MessageState {
  return getContext(CONTEXT_KEY);
}
