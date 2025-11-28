<script lang="ts">
  import { Alert, Card } from "$lib/components";
  import { setGameContext } from "$lib/context/gameContext";
  import GameState from "$lib/state/GameState.svelte";
  import { CardDetails } from "$lib/types";
  import GameTimer from "./GameTimer.svelte";
  import PageHeader from "./PageHeader.svelte";

  type MatchState = { status: "idle" | "successful" } | { status: "error"; error: Error };

  let selectedCards: CardDetails[] = $state([]);
  let hasSelectedMaxCards = $derived(selectedCards.length >= 3);

  let matchState = $state<MatchState>({ status: "idle" });

  function isCardSelected({ key }: CardDetails) {
    return selectedCards.some((card) => card.key === key);
  }

  const gameState = setGameContext(new GameState());

  $effect(() => () => {
    gameState.destroy();
  });
</script>

<div class="wrapper">
  <PageHeader />

  <div class="cards">
    {#each gameState.cards as card (card.key)}
      <Card
        cardDetails={card}
        disabled={gameState.sets.length === 6 || (hasSelectedMaxCards && !isCardSelected(card))}
        isSelected={isCardSelected(card)}
        onclick={() => {
          const { key } = card;

          if (isCardSelected(card)) {
            selectedCards = selectedCards.filter((card) => card.key !== key);
          } else if (!hasSelectedMaxCards) {
            selectedCards = [...selectedCards, card];
          }

          if (hasSelectedMaxCards) {
            try {
              gameState.tryAddSet(selectedCards);
              matchState = { status: "successful" };
              selectedCards = [];
            } catch (error) {
              matchState = {
                status: "error",
                error: error instanceof Error ? error : new Error("Unknown error"),
              };
            }
          } else {
            matchState = { status: "idle" };
          }
        }}
      />
    {/each}
  </div>

  {#if matchState.status === "successful"}
    <Alert variant="success">
      {#if gameState.sets.length >= 6}
        Congratulations! You found all 6 matches in <GameTimer format="short" />!
      {:else}
        You found a valid match!
      {/if}
    </Alert>
  {:else if matchState.status === "error"}
    <Alert variant="error">{matchState.error.message}</Alert>
  {:else}
    <Alert variant="default">Select 3 cards to see if they're a match.</Alert>
  {/if}

  <!-- TODO: Fix semantics -->
  <div class="matches">
    <h2>Found sets ({gameState.sets.length} / 6):</h2>

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
