import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  cardAnatomy.keys
);

const baseStyle = {
  container: {
    borderRadius: "containerRadius",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",

    transition: "all 0.3s",
    _hover: {
      transform: "scale(1.05)",
      boxShadow: "xl",
    },
  },
};

const variants = {
  primary: {
    container: {
      backgroundColor: "white",
      color: "black",
    },
  },
  secondary: {
    container: {
      backgroundColor: "black",
      color: "purpleBase",
    },
  },
  dark: {
    container: {
      backgroundColor: "purpleDark",
      color: "purpleBase",
    },
  },
  light: {
    container: {
      padding: 4,
      _hover: {
        transform: "1",
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
      },
    },
  },
};

const defaultProps = {
  variant: "primary" as const,
};

export const Card = defineMultiStyleConfig({
  baseStyle,
  variants,
  defaultProps,
});
