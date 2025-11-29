<script lang="ts">
  import { getGameContext } from "$lib/context/gameContext";

  interface GameTimerProps {
    format: "full" | "short";
  }

  let { format }: GameTimerProps = $props();

  const MILLISECONDS = 1000;
  const SECONDS = MILLISECONDS * 60;
  const MINUTES = SECONDS * 60;
  const HOURS = MINUTES * 24;

  const padNumber = (num: number) => (num < 10 ? `0${String(num)}` : num);

  const gameState = getGameContext();

  let seconds = $derived(Math.floor((gameState.timeElapsed % SECONDS) / MILLISECONDS));
  let minutes = $derived(Math.floor((gameState.timeElapsed % MINUTES) / SECONDS));
  let hours = $derived(Math.floor((gameState.timeElapsed % HOURS) / MINUTES));

  let formattedTimer = $derived(
    format === "full"
      ? [hours, minutes, seconds].map(padNumber).join(":")
      : [
          hours > 0 ? `${String(hours)}:` : undefined,
          hours > 0 ? padNumber(minutes) : minutes,
          padNumber(seconds),
        ]
          .filter((val) => val != undefined)
          .join(":"),
  );
</script>

{formattedTimer}
