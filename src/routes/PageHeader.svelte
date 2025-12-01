<script lang="ts">
  import { getGameContext } from "$lib/context/gameContext";
  import { getFullTimeFormat } from "$lib/utils/timeFormatter.svelte";

  const dateFormatter = Intl.DateTimeFormat(undefined, { dateStyle: "full" });

  const gameState = getGameContext();
  const elapsedTime = $derived(getFullTimeFormat(gameState.timeElapsed));
</script>

<header>
  <h1>Daily Set Game</h1>
  <div class="subheader">
    <div>{dateFormatter.format(gameState.date)}</div>
    <div>{elapsedTime}</div>
  </div>
</header>

<style>
  .subheader {
    display: flex;
    justify-content: space-between;
  }
</style>
