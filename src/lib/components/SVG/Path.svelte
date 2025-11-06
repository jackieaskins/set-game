<script lang="ts">
  import type { SVGAttributes } from "svelte/elements";
  interface Point {
    x: number;
    y: number;
  }

  type Command =
    | { type: "Move" | "Line"; points: [Point] }
    | { type: "Quadratic" | "SmoothBezier"; points: [Point, Point] }
    | { type: "Bezier"; points: [Point, Point, Point] }
    | { type: "Close" };

  interface PathProps extends SVGAttributes<SVGPathElement> {
    commands: Command[];
  }

  const commandMap = {
    Move: "M",
    Line: "L",
    Bezier: "C",
    SmoothBezier: "S",
    Quadratic: "Q",
    Close: "Z",
  };

  let { commands, ...restProps }: PathProps = $props();

  let d = $derived(
    commands
      .flatMap((command) => {
        const points = command.type !== "Close" ? command.points : [];
        const name = commandMap[command.type];

        return [name, ...points.map(({ x, y }) => `${String(x)},${String(y)}`)];
      })
      .join(" "),
  );
</script>

<path {d} {...restProps} />
