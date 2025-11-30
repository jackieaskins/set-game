<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import type { Snippet } from "svelte";

  import "../css-reset.css";
  import "../main.css";
  import { setPageVisibilityContext } from "$lib/context/pageVisibilityContext";
  import PageVisibilityState from "$lib/state/PageVisibilityState.svelte";

  let { children }: { children?: Snippet } = $props();

  setPageVisibilityContext(new PageVisibilityState());
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
