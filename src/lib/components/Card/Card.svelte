<script lang="ts">
  import { SVG } from "$lib/components";
  import { CARD_SVG_HEIGHT, CARD_SVG_WIDTH } from "$lib/constants";
  import { Pattern, Shape, type CardDetails } from "$lib/types";
  import DiamondShape from "./DiamondShape.svelte";
  import OvalShape from "./OvalShape.svelte";
  import SquiggleShape from "./SquiggleShape.svelte";

  interface CardProps {
    cardDetails: CardDetails;
    disabled?: boolean;
    isSelected?: boolean;
    onclick?: () => void;
  }

  const shapeMap = {
    [Shape.Diamond]: DiamondShape,
    [Shape.Oval]: OvalShape,
    [Shape.Squiggle]: SquiggleShape,
  };
  const countPositionsMap = {
    1: [75],
    2: [42, 108],
    3: [15, 75, 135],
  };

  let { cardDetails, disabled, isSelected = false, onclick }: CardProps = $props();
  let { key, count, color, pattern, shape } = cardDetails;

  let patternId = $derived(`${key}-pattern`);

  let fill = $derived.by(() => {
    switch (pattern) {
      case Pattern.Solid:
        return color;
      case Pattern.Striped:
        return `url(#${patternId})`;
      case Pattern.Outlined:
        return "none";
    }
  });

  let ShapeComponent = $derived(shapeMap[shape]);
  let positions = $derived(countPositionsMap[count]);
</script>

{#snippet cardSVG()}
  <SVG width={CARD_SVG_WIDTH} height={CARD_SVG_HEIGHT}>
    {#if pattern === Pattern.Striped}
      <pattern
        id={patternId}
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(90)"
        width="8.5"
        height="8.5"
      >
        <line x1="0" y="0" x2="0" y2="8.5" stroke={color} stroke-width="7" />
      </pattern>
    {/if}

    <g stroke={color} stroke-width={4} {fill}>
      {#each positions as position (position)}
        <ShapeComponent x={position} />
      {/each}
    </g>
  </SVG>
{/snippet}

{#if onclick}
  <button class="card" class:selected={isSelected} {onclick} {disabled}>
    <!-- eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -->
    {@render cardSVG()}
  </button>
{:else}
  <!-- eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -->
  <div class="card">{@render cardSVG()}</div>
{/if}

<style>
  .card {
    --card-color: #e8e8e8;

    background-color: white;
    border: 2px var(--card-color) solid;
  }

  button.card {
    &:hover:enabled {
      border-color: #d3d3d3;
    }
  }

  .selected {
    background-color: var(--card-color);
  }
</style>
