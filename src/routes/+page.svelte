<script lang="ts">
  import { Card } from "$lib/components";
  import { Alert } from "$lib/components";
  import { Color, Pattern, Shape, CardDetails } from "$lib/types";
  import { Matches } from "$lib/state/matches.svelte";

  type MatchState = { status: "idle" | "successful" } | { status: "error"; error: Error };

  const cards: CardDetails[] = [
    new CardDetails(1, Color.Red, Pattern.Solid, Shape.Oval),
    new CardDetails(2, Color.Red, Pattern.Striped, Shape.Oval),
    new CardDetails(3, Color.Red, Pattern.Outlined, Shape.Oval),
    new CardDetails(1, Color.Green, Pattern.Solid, Shape.Diamond),
    new CardDetails(2, Color.Green, Pattern.Striped, Shape.Diamond),
    new CardDetails(3, Color.Green, Pattern.Outlined, Shape.Diamond),
    new CardDetails(1, Color.Purple, Pattern.Solid, Shape.Squiggle),
    new CardDetails(2, Color.Purple, Pattern.Striped, Shape.Squiggle),
    new CardDetails(3, Color.Purple, Pattern.Outlined, Shape.Squiggle),
    new CardDetails(1, Color.Red, Pattern.Solid, Shape.Diamond),
    new CardDetails(2, Color.Green, Pattern.Striped, Shape.Squiggle),
    new CardDetails(3, Color.Purple, Pattern.Outlined, Shape.Oval),
  ];

  let selectedCards: CardDetails[] = $state([]);
  let hasSelectedMaxCards = $derived(selectedCards.length >= 3);
  let matchState = $state<MatchState>({ status: "idle" });
  let matches = new Matches();

  function isCardSelected({ key }: CardDetails) {
    return selectedCards.some((card) => card.key === key);
  }
</script>

<div class="wrapper">
  <h1>Daily Set Game</h1>

  <div class="cards">
    {#each cards as card (card.key)}
      <Card
        cardDetails={card}
        disabled={matches.all.length === 6 || (hasSelectedMaxCards && !isCardSelected(card))}
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
              matches.tryAddMatch(selectedCards);
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
      {#if matches.all.length >= 6}
        <div><b>Congratulations! You found all 6 matches!</b></div>
        <div>Current streak: 4 days</div>
      {:else}
        You found a valid match!
      {/if}
    </Alert>
  {:else if matchState.status === "error"}
    <Alert variant="error"><b>{matchState.error.message}</b></Alert>
  {:else}
    <Alert variant="default">
      <b>Select 3 cards to see if they're a match.</b>
    </Alert>
  {/if}

  <h2>Found matches ({matches.all.length} / 6):</h2>

  <!-- TODO: Fix semantics -->
  <div class="matches">
    {#each matches.all as { key, cards } (key)}
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
    display: flex;
    flex-direction: column;
    align-items: center;
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
