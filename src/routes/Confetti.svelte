<script lang="ts">
  import { confetti } from "@neoconfetti/svelte";
  import { getGameContext } from "$lib/context/gameContext";

  const gameState = getGameContext();

  // Window dimensions for confetti
  let windowWidth = $state(window.innerWidth);
  let windowHeight = $state(window.innerHeight);

  // Listen for window resize
  $effect(() => {
    const handleResize = () => {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
</script>

{#if gameState.hasWon}
  <div
    class="confetti"
    use:confetti={{
      stageWidth: windowWidth,
      stageHeight: windowHeight,
      particleCount: 150,
      duration: 3000,
    }}
  ></div>
{/if}

<style>
  .confetti {
    display: flex;
    justify-content: center;

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;

    pointer-events: none;
  }
</style>
