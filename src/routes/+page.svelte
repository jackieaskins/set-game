<script lang="ts">
  import { Alert, Card } from "$lib/components";
  import { CARD_SELECTION_TIMEOUT_MS, NUM_SETS } from "$lib/constants";
  import { setGameContext } from "$lib/context/gameContext";
  import { setMessageContext } from "$lib/context/messageContext";
  import GameState from "$lib/state/GameState.svelte";
  import { MessageState } from "$lib/state/MessageState.svelte";
  import { CardDetails } from "$lib/types";
  import GameWonModal from "./GameWonModal.svelte";
  import PageHeader from "./PageHeader.svelte";

  let selectedCardTimeout: number | undefined;

  let selectedCards: CardDetails[] = $state([]);
  let hasSelectedMaxCards = $derived(selectedCards.length >= 3);

  function isCardSelected({ key }: CardDetails) {
    return selectedCards.some((card) => card.key === key);
  }

  const alertState = setMessageContext(
    new MessageState({
      type: "default",
      text: "Select 3 cards to see if they form a set.",
    }),
  );
  const gameState = setGameContext(new GameState(alertState));

  $effect(() => {
    if (selectedCardTimeout != undefined) {
      return () => {
        clearTimeout(selectedCardTimeout);
      };
    }
  });
</script>

<GameWonModal />

<div class="wrapper">
  <PageHeader />

  <div class="cards">
    {#each gameState.cards as card (card.key)}
      <Card
        cardDetails={card}
        disabled={gameState.sets.length >= NUM_SETS ||
          (hasSelectedMaxCards && !isCardSelected(card))}
        isSelected={isCardSelected(card)}
        onclick={() => {
          const { key } = card;

          if (isCardSelected(card)) {
            selectedCards = selectedCards.filter((card) => card.key !== key);
          } else if (!hasSelectedMaxCards) {
            selectedCards = [...selectedCards, card];
          }

          if (hasSelectedMaxCards) {
            gameState.tryAddSet(selectedCards);

            selectedCardTimeout = setTimeout(() => {
              selectedCards = [];
            }, CARD_SELECTION_TIMEOUT_MS);
          }
        }}
      />
    {/each}
  </div>

  {#if gameState.sets.length < NUM_SETS}
    <Alert variant={alertState.message.type}>
      {alertState.message.text}
    </Alert>
  {/if}

  <!-- TODO: Fix semantics -->
  <div class="matches">
    <h2>Found sets ({gameState.sets.length} / {NUM_SETS}):</h2>

    {#each gameState.sets as { key, cards } (key)}
      <div class="match">
        {#each cards as card (card.key)}
          <Card cardDetails={card} />
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .wrapper {
    max-width: 500px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .cards {
    width: 100%;
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(3, 1fr);
  }

  .matches {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 4px;
  }

  .match {
    width: 50%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
  }
</style>
