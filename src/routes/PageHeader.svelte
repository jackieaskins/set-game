<script lang="ts">
  import { getGameContext } from "$lib/context/gameContext";
  import GameTimer from "./GameTimer.svelte";

  const dateFormatter = Intl.DateTimeFormat(undefined, { dateStyle: "full" });

  const gameState = getGameContext();
</script>

<header>
  <h1>Daily Set Game</h1>
  <div class="subheader">
    <div>{dateFormatter.format(gameState.date)}</div>
    <div><GameTimer format="full" /></div>
  </div>
</header>

<style>
  .subheader {
    display: flex;
    justify-content: space-between;
  }
</style>
