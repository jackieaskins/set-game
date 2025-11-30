export type MessageType = "success" | "error" | "default";

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

export type Count = 1 | 2 | 3;

export interface CardDetailsJSON {
  readonly count: Count;
  readonly color: Color;
  readonly pattern: Pattern;
  readonly shape: Shape;
}

export class CardDetails {
  constructor(
    public readonly count: Count,
    public readonly color: Color,
    public readonly pattern: Pattern,
    public readonly shape: Shape,
  ) {}

  public get key(): string {
    return [this.count, this.color, this.pattern, this.shape].join("-");
  }

  public static fromJSON({ count, color, pattern, shape }: CardDetailsJSON): CardDetails {
    return new CardDetails(count, color, pattern, shape);
  }
}
