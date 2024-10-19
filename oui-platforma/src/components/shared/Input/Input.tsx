import {
  Input as ChakraInput,
  FormControl,
  FormLabel,
  InputProps,
} from "@chakra-ui/react";

const CustomInput: React.FC<InputProps> = ({ placeholder, ...kwargs }) => {
  return (
    <FormControl>
      <ChakraInput {...kwargs} placeholder=" " />
      <FormLabel>{placeholder}</FormLabel>
    </FormControl>
  );
};

export default CustomInput;
