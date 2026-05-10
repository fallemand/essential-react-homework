import type { Config } from "jest";

export function createJestConfig(overrides?: Partial<Config>): Config {
  return {
    preset: "jest-expo",
    ...overrides,
  };
}

export function createJestConfigNode(overrides?: Partial<Config>): Config {
  return {
    transform: {
      "^.+\\.tsx?$": ["ts-jest", { diagnostics: false }],
    },
    testEnvironment: "jsdom",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
    ...overrides,
  };
}
