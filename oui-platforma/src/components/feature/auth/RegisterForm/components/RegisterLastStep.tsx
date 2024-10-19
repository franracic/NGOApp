"use client";
import { PasswordInput } from "@/components/shared/PasswordInput/PasswordInput";
import { swrKeys } from "@/fetchers/swrKeys";
import { useUserRegistration } from "@/hooks/useUserRegistration";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
  VStack,
  chakra,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { MdPerson } from "react-icons/md";
import { IRegisterForm, RegisterContext } from "./RegisterContextProvider";

export const RegisterLastStep = () => {
  const { register, handleSubmit, setError, errors, isSubmitting } =
    useContext(RegisterContext);
  const toast = useToast();
  const { registerUser, isLoading, isError } = useUserRegistration();
  const router = useRouter();

  const validateEmail = async (email: string) => {
    try {
      const response = await fetch(swrKeys.validateEmail, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!data.available) {
        return "Email is already in use";
      }
    } catch (error) {
      return "Failed to validate email";
    }

    return true;
  };

  const onRegister = async (data: IRegisterForm) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    try {
      await registerUser(data);
      toast({
        title: "Account created.",
        description: "Welcome " + data.username + "!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      router.push("/login");
    } catch (err) {
      console.log(data);
      toast({
        title: "Registration failed.",
        description: "There was an issue creating your account.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={0} mt={10}>
      <chakra.form
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        onSubmit={handleSubmit(onRegister)}
      >
        <VStack spacing={8}>
          <FormControl isRequired isInvalid={!!errors.email}>
            <InputGroup variant="dark">
              <InputLeftElement pointerEvents="none">
                <Icon as={MdPerson} boxSize={6} />
              </InputLeftElement>
              <Input
                {...register("email", {
                  required: "Email is required",
                  validate: validateEmail,
                })}
                type="email"
                placeholder=" "
                disabled={isSubmitting || isLoading}
              />
              <FormLabel left={"40px !important"}>Email</FormLabel>
            </InputGroup>
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.password}>
            <PasswordInput
              register={{
                ...register("password", { required: "Password is required" }),
              }}
              disabled={isSubmitting || isLoading}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.confirmPassword}>
            <PasswordInput
              register={{
                ...register("confirmPassword", {
                  required: "Confirm Password is required",
                }),
              }}
              disabled={isSubmitting || isLoading}
            />
            <FormErrorMessage>
              {errors.confirmPassword?.message}
            </FormErrorMessage>
          </FormControl>
        </VStack>

        <Button
          type="submit"
          isLoading={isSubmitting || isLoading}
          marginTop="58px"
          variant="light"
          loadingText="Submitting"
        >
          Sign up
        </Button>
      </chakra.form>
      <Text marginTop="28px" color="black" fontSize="sm" textAlign="center">
        Already have an account?{" "}
        <Link href="/login" fontWeight={600}>
          Login
        </Link>
      </Text>
    </VStack>
  );
};
