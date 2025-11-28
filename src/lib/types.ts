export const Color = {
  Red: "red",
  Green: "green",
  Purple: "purple",
} as const;
export type Color = (typeof Color)[keyof typeof Color];

export const Shape = {
  Squiggle: "squiggle",
  Oval: "oval",
  Diamond: "diamond",
} as const;
export type Shape = (typeof Shape)[keyof typeof Shape];

export const Pattern = {
  Solid: "solid",
  Striped: "striped",
  Outlined: "outlined",
} as const;
export type Pattern = (typeof Pattern)[keyof typeof Pattern];

export class CardDetails {
  constructor(
    public readonly count: 1 | 2 | 3,
    public readonly color: Color,
    public readonly pattern: Pattern,
    public readonly shape: Shape,
  ) {}

  public get key(): string {
    return [this.count, this.color, this.pattern, this.shape].join("-");
  }
}
