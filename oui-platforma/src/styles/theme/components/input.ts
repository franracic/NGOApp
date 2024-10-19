import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const dark = definePartsStyle({
  element: {
    color: "black",
    height: "56px",
  },
  field: {
    height: "56px",
    border: "2px solid",
    borderColor: "black",
    background: "yellowInput",
    borderRadius: "full",
    color: "black",
    _placeholder: {
      color: "black",
    },
    _invalid: {
      borderColor: "error",
    },
  },
  group: {},
});

const defaultProps = {
  variant: "dark" as const,
};

export const Input = defineMultiStyleConfig({
  variants: { dark },
  defaultProps,
});
