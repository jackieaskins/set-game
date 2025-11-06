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

export const ShapeCount = {
  One: 1,
  Two: 2,
  Three: 3,
} as const;
export type ShapeCount = (typeof ShapeCount)[keyof typeof ShapeCount];

export interface Card {
  key: string;
  color: Color;
  shape: Shape;
  pattern: Pattern;
  count: ShapeCount;
}
