import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const dark = defineStyle({
  height: "auto",
  resize: "none",
  border: "2px solid",
  borderColor: "black",
  background: "yellowInput",
  borderRadius: "32px",
  pt: "20px",
  color: "black",
  _placeholder: {
    color: "black",
  },
  _invalid: {
    borderColor: "error",
  },
});

const defaultProps = {
  variant: "dark" as const,
};

export const Textarea = defineStyleConfig({
  variants: { dark },
  defaultProps,
});
