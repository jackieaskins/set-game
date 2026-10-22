<script lang="ts">
  import { getGameContext } from "$lib/context/gameContext";
  import { getShortTimeFormat } from "$lib/utils/timeFormatter.svelte";

  let dialog: HTMLDialogElement;

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const canShare = Boolean(navigator.share);

  let justCopied = $state(false);

  const gameState = getGameContext();
  let shortTime = $derived(getShortTimeFormat(gameState.timeElapsed));

  $effect(() => {
    if (gameState.hasWon) {
      dialog.showModal();
    }
  });

  $effect(() => {
    if (!justCopied) {
      return;
    }

    const timeout = setTimeout(() => {
      justCopied = false;
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  });
</script>

<dialog bind:this={dialog} closedby="any">
  <h2>Yayyy! You did it!</h2>

  <p>Wow you're so smart!</p>
  <p>You solved today's Set Game puzzle in <b>{shortTime}</b>.</p>

  <br />

  <p><b>Current streak:</b> {gameState.stats.streak} games</p>
  <p><b>Best time:</b> {gameState.stats.bestTime ?? "-"}</p>

  <div class="actions">
    <button
      class="share"
      disabled={justCopied}
      onclick={async () => {
        const text = [
          `Set Game #${String(gameState.gameNumber)} | ${shortTime} 🎉`,
          window.location.host,
        ].join("\n");

        if (canShare) {
          await navigator.share({ text });
        } else {
          await navigator.clipboard.writeText(text);
          justCopied = true;
        }
      }}
    >
      {#if justCopied}
        Successfully copied results
      {:else}
        {canShare ? "Share" : "Copy"} results
      {/if}
    </button>

    <button
      class="close"
      onclick={() => {
        dialog.close();
      }}
    >
      Close
    </button>
  </div>
</dialog>

<style>
  dialog[open] {
    width: 80%;
    max-width: 440px;
    margin: auto;
    padding: 32px;
    color: inherit;
    background-color: light-dark(white, #2a2a2a);

    border: none;

    &::backdrop {
      background-color: black;
      opacity: 0.5;
    }

    /* sheet */
    @media only screen and (max-width: 600px) {
      width: 100%;
      max-width: 100%;
      margin: auto 0 0 0;
    }
  }

  h2 {
    margin-bottom: 10px;
  }

  button {
    width: 100%;
    height: 2.4rem;
  }

  .actions {
    margin-top: 16px;

    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .close {
    color: inherit;
    background-color: light-dark(#e8e8e8, #444);
  }

  .share {
    color: white;

    &:enabled {
      background-color: light-dark(#3d53e6, #4d63f6);
    }

    &:disabled {
      background-color: light-dark(#c0c7f7, #3a4080);
      color: light-dark(white, #888);
    }
  }
</style>
