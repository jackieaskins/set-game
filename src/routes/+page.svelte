<script lang="ts">
  import { Card } from "$lib/components";
  import { Color, Pattern, Shape, CardDetails } from "$lib/types";

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

  let selectedCardKeys: string[] = $state([]);

  function isCardSelected({ key }: CardDetails) {
    return selectedCardKeys.includes(key);
  }

  function toggleCard(card: CardDetails) {
    const { key } = card;

    if (isCardSelected(card)) {
      selectedCardKeys = selectedCardKeys.filter((selectedKey) => selectedKey !== key);
    } else if (selectedCardKeys.length < 3) {
      selectedCardKeys = [...selectedCardKeys, key];
    }
  }
</script>

<div class="cards">
  {#each cards as cardDetails (cardDetails.key)}
    <Card
      {cardDetails}
      isSelected={isCardSelected(cardDetails)}
      onclick={() => {
        toggleCard(cardDetails);
      }}
    />
  {/each}
</div>

<style>
  .cards {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
  }
</style>
