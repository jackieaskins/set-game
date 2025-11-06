<script lang="ts">
  import { Path } from "$lib/components";

  interface SquiggleShapeProps {
    x: number;
  }

  let { x }: SquiggleShapeProps = $props();

  const baseX = x + 10;
  const y = 13;
</script>

<Path
  commands={[
    { type: "Move", points: [{ x: baseX, y: y + 13 }] },
    {
      type: "Quadratic",
      points: [
        { x: baseX - 4, y: y + 7 },
        { x: baseX + 4, y: y + 3 },
      ],
    },
    {
      type: "Bezier",
      points: [
        { x: baseX + 11, y: y + 0 },
        { x: baseX + 35, y: y + 1 },
        { x: baseX + 39, y: y + 25 },
      ],
    },
    {
      type: "Quadratic",
      points: [
        { x: baseX + 42, y: y + 41 },
        { x: baseX + 35, y: y + 53 },
      ],
    },
    {
      type: "Quadratic",
      points: [
        { x: baseX + 30, y: y + 64 },
        { x: baseX + 40, y: y + 80 },
      ],
    },
    {
      type: "Bezier",
      points: [
        { x: baseX + 51, y: y + 97 },
        { x: baseX + 20, y: y + 98 },
        { x: baseX + 10, y: y + 91 },
      ],
    },
    {
      type: "SmoothBezier",
      points: [
        { x: baseX - 7, y: y + 70 },
        { x: baseX + 4, y: y + 52 },
      ],
    },
    {
      type: "SmoothBezier",
      points: [
        { x: baseX + 4, y: y + 21 },
        { x: baseX, y: y + 13 },
      ],
    },
    { type: "Close" },
  ]}
/>

<Path commands={[]} />
