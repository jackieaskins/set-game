<script lang="ts">
  import { Polygon } from "$lib/components";

  interface DiamondShapeProps {
    x: number;
  }

  let { x }: DiamondShapeProps = $props();

  const width = 50;
  const height = 90;
  const y = 15;
</script>

<Polygon
  points={[
    { x, y: y + height / 2 },
    { x: x + width / 2, y },
    { x: x + width, y: y + height / 2 },
    { x: x + width / 2, y: y + height },
  ]}
/>
