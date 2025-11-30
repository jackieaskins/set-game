export default class PageVisibilityState {
  #isVisible = $state(!document.hidden);

  public constructor() {
    const listener = () => {
      this.#isVisible = !document.hidden;
    };

    document.addEventListener("visibilitychange", listener);

    $effect(() => () => {
      document.removeEventListener("visibilitychange", listener);
    });
  }

  public get isVisible(): boolean {
    return this.#isVisible;
  }
}
