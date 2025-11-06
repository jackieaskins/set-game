<script lang="ts">
  import type { SVGAttributes } from "svelte/elements";

  interface Point {
    x: number;
    y: number;
  }

  interface PolygonProps extends Omit<SVGAttributes<SVGPolygonElement>, "points"> {
    points: Point[];
  }

  let { points }: PolygonProps = $props();
</script>

<polygon points={points.map(({ x, y }) => `${String(x)},${String(y)}`).join(" ")} />
