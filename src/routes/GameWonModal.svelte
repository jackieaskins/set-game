<script lang="ts">
  import { NUM_SETS } from "$lib/constants";
  import { getGameContext } from "$lib/context/gameContext";
  import { getShortTimeFormat } from "$lib/utils/timeFormatter.svelte";

  let dialog: HTMLDialogElement;

  const dateFormatter = Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const canShare = Boolean(navigator.share);

  let justShared = $state(false);

  const gameState = getGameContext();
  let formattedDate = $derived(dateFormatter.format(gameState.date));
  let shortTime = $derived(getShortTimeFormat(gameState.timeElapsed));

  $effect(() => {
    if (gameState.sets.length >= NUM_SETS) {
      dialog.showModal();
    }
  });

  $effect(() => {
    if (!justShared) {
      return;
    }

    const timeout = setTimeout(() => {
      justShared = false;
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

  <div class="actions">
    <button
      class="share"
      disabled={justShared}
      onclick={async () => {
        const title = `Set Game: ${formattedDate}`;
        const text = `I solved today's Set Game in ${shortTime}!`;
        const url = window.location.href;

        if (canShare) {
          await navigator.share({ title, text, url });
        } else {
          await navigator.clipboard.writeText([title, text, url].join("\n"));
        }

        justShared = true;
      }}
    >
      {#if justShared}
        Successfully {canShare ? "shared" : "copied"} results
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
  }

  .share {
    color: white;

    &:enabled {
      background-color: #3d53e6;
    }

    &:disabled {
      background-color: #c0c7f7;
    }
  }
</style>
