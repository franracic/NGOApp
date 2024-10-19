import { progressAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const dark = definePartsStyle({
  filledTrack: {
    bg: "yellowBase",
  },
  track: {
    bg: "gray.100",
  },
});

const defaultProps = {
  variant: "dark" as const,
};

export const Progress = defineMultiStyleConfig({
  variants: { dark },
  defaultProps,
});
