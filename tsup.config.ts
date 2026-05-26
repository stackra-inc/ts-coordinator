/**
 * @see https://tsup.egoist.dev/
 */
import { defineConfig } from "tsup";
import { basePreset } from "@stackra/tsup-config";

export default defineConfig({
  ...basePreset,
  entry: ["src/index.ts", "src/testing/index.ts"],
  external: ["rxjs", "react"],
});
