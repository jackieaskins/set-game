<script lang="ts">
  import { SVG } from "$lib/components";
  import { Color, Pattern, Shape, ShapeCount } from "$lib/types";
  import DiamondShape from "./DiamondShape.svelte";
  import OvalShape from "./OvalShape.svelte";
  import SquiggleShape from "./SquiggleShape.svelte";

  interface CardProps {
    count: ShapeCount;
    shape: Shape;
    pattern: Pattern;
    color: Color;
  }

  const shapeMap = {
    [Shape.Diamond]: DiamondShape,
    [Shape.Oval]: OvalShape,
    [Shape.Squiggle]: SquiggleShape,
  };
  const countPositionsMap = {
    1: [70],
    2: [35, 115],
    3: [10, 70, 130],
  };

  const padding = 10;
  const shapeWidth = 60;

  const fullWidth = padding * 2 + shapeWidth * 3;

  let { count, shape, pattern, color }: CardProps = $props();

  let patternId = $derived(`${String(count)}-${color}-${pattern}-${shape}-pattern`);

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

<SVG width={fullWidth} height={120}>
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
