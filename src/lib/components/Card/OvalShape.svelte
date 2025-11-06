<script lang="ts">
  import { Path } from "$lib/components";

  interface OvalShapeProps {
    x: number;
  }

  let { x }: OvalShapeProps = $props();

  const width = 50;
  const height = 50;
  const curve = 30;
  const y = 5;
  const baseY = y + curve;
</script>

<Path
  commands={[
    { type: "Move", points: [{ x, y: baseY }] },
    {
      type: "Bezier",
      points: [
        { x, y },
        { x: x + width, y },
        { x: x + width, y: baseY },
      ],
    },
    { type: "Line", points: [{ x: x + width, y: baseY + height }] },
    {
      type: "Bezier",
      points: [
        { x: x + width, y: baseY + height + curve },
        { x, y: baseY + height + curve },
        { x, y: baseY + height },
      ],
    },
    { type: "Close" },
  ]}
/>
