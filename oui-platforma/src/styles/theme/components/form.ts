import { formAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(formAnatomy.keys);

export const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};

const floating = definePartsStyle({
  container: {
    position: "relative",
    minWidth: "200px",
    _focusWithin: {
      label: {
        ...activeLabelStyles,
      },
    },
    "input:not(:placeholder-shown) + label, textarea:not(:placeholder-shown) ~ label":
      {
        ...activeLabelStyles,
      },
    label: {
      maxHeight: "20px",
      overflow: "hidden",
      position: "absolute",
      top: "7px",
      left: 2,
      zIndex: 2,
      background: "yellowInput",
      borderRadius: "md",
      pointerEvents: "none",
      mx: 3,
      px: 1,
      my: 2,
      transformOrigin: "left top",
      transition: "transform 0.2s ease-out",
    },
  },
  field: {
    height: "56px",
    borderRadius: "full",
    color: "black",
    background: "yellowInput",
    border: "2px solid black",
    _placeholder: {
      color: "gray.500",
    },
    _invalid: {
      borderColor: "error",
    },
  },
});

export const Form = defineMultiStyleConfig({
  variants: { floating },
  defaultProps: {
    variant: "floating",
  },
});
