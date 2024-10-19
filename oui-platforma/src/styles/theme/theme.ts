import { extendTheme } from "@chakra-ui/react";
import "typeface-noto-sans";
import "typeface-roboto";
import { Button } from "./components/button";
import { Card } from "./components/card";
import { Input } from "./components/input";
import { Modal } from "./components/modal";
import { Progress } from "./components/progress";
import { Select } from "./components/select";
import { Textarea } from "./components/textarea";
import { colors } from "./foundations/colors";
import { fonts } from "./foundations/fonts";
import { radii } from "./foundations/radii";
import { Form } from "./components/form";

export default extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: "backgroundGray",
        color: "black",
        fontFamily: "Noto Sans, Roboto, sans-serif",
      },
    },
  },
  fonts,
  colors,
  radii,
  components: {
    Card,
    Button,
    Input,
    Modal,
    Progress,
    Textarea,
    Select,
    Form,
  },
});
