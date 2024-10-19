import {
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";

interface IPasswordInputProps {
  disabled?: boolean;
  error?: string;
  register?: UseFormRegisterReturn;
}

export const PasswordInput = ({
  disabled,
  error,
  register,
}: IPasswordInputProps) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl>
      <InputGroup variant={"dark"} size="md">
        <InputLeftElement>
          <Icon as={MdLock} boxSize={6} />
        </InputLeftElement>
        <Input
          type={show ? "text" : "password"}
          placeholder=" "
          disabled={disabled}
          {...register}
        />

        <FormLabel left={"40px !important"}>Password</FormLabel>

        <InputRightElement>
          <IconButton
            aria-label={`toggle password visibility`}
            onClick={handleClick}
            variant="dark"
            borderWidth={0}
            fontSize={20}
            marginRight={4}
            disabled={disabled}
          >
            {show ? <MdVisibilityOff /> : <MdVisibility />}
          </IconButton>
        </InputRightElement>
      </InputGroup>

      {error && <Text color="red.500">{error}</Text>}
    </FormControl>
  );
};
