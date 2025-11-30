import type { MessageType } from "$lib/types";
import { MESSAGE_TIMEOUT_MS } from "$lib/constants";

interface Message {
  type: MessageType;
  text: string;
}

export class MessageState {
  #defaultMessage: Message;

  #message = $state<Message | null>(null);
  #messageTimer: number | undefined;

  public constructor(defaultMessage: Message) {
    this.#defaultMessage = defaultMessage;
  }

  public set message(newMessage: Message) {
    if (this.#messageTimer) {
      clearTimeout(this.#messageTimer);
    }

    this.#message = newMessage;

    setTimeout(() => {
      this.#message = null;
    }, MESSAGE_TIMEOUT_MS);
  }

  public get message(): Message {
    return this.#message ?? this.#defaultMessage;
  }
}
