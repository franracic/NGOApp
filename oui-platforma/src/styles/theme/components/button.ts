import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
  variants: {
    light: {
      background: "yellowDark",
      borderColor: "yellowDark",
      borderWidth: "2px",
      color: "white",
      _hover: {
        background: "transparent",
        color: "yellowDark",
      },
      _active: {
        background: "transparent",
        color: "yellowDark",
      },
    },
    dark: {
      background: "transparent",
      borderColor: "yellowDark",
      borderWidth: "2px",
      color: "yellowDark",
      _hover: {
        background: "yellowDark",
        color: "white",
      },
      _active: {
        background: "yellowDark",
        color: "white",
      },
    },
    navigation: {
      borderRadius: "none",
      textAlign: "left",
      height: "20px",
      color: "grayBase",
      fontSize: "16px",
      marginY: "8px",
      textDecor: "none",
      _hover: {
        color: "black",
      },
      _active: {
        color: "black",
        borderColor: "yellowBase",
        borderLeftWidth: "4px",
        paddingLeft: "12px",
      },
    },
    disabled: {
      bg: "black",
      opacity: "50%",
      color: "yellowDark",
    },
  },
});
