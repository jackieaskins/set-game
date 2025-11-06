<script lang="ts">
  import type { Snippet } from "svelte";

  interface SVGProps {
    width: number;
    height: number;
    children: Snippet;
  }

  let { width, height, children }: SVGProps = $props();
</script>

<svg viewBox="0 0 {width} {height}">
  {@render children()}
</svg>
