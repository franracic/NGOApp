"use client";
import { LogoImage } from "@/components/core/Logo/Logo";
import { PasswordInput } from "@/components/shared/PasswordInput/PasswordInput";
import {
  Button,
  Card,
  CardBody,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { MdPerson } from "react-icons/md";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { mutator } from "../../../../fetchers/mutators";
import { swrKeys } from "../../../../fetchers/swrKeys";

interface ILoginFormInputs {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginFormInputs>();

  const { trigger, error: apiError } = useSWRMutation(swrKeys.login, mutator, {
    onSuccess: () => {
      toast({
        title: "Logged in.",
        description: "Redirecting...",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (err) => {
      toast({
        title: "Login failed.",
        description: err.message || "Something went wrong.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

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

      if (data.available) {
        return "Email is not registered";
      }
    } catch (error) {
      return "Failed to validate email";
    }

    return true;
  };

  const onLogin = async (data: ILoginFormInputs) => {
    try {
      const response = await trigger(data);
      if (response) {
        console.log(response);
        localStorage.setItem(
          "auth-header",
          JSON.stringify({
            access: response.access,
            uid: response.user.id,
            username: response.user.username,
          })
        );
        mutate(swrKeys.currentUser, response.user, false);
      }
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  return (
    <>
      <Card p={8} bg={"white"} variant={"light"}>
        <CardBody>
          <VStack spacing={0}>
            <HStack justifyContent="center" marginBottom={"50px"}>
              <LogoImage />
            </HStack>
            <chakra.form
              onSubmit={handleSubmit(onLogin)}
              data-testid="login-form"
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <VStack spacing={8}>
                <FormControl isInvalid={!!errors.email}>
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
                      disabled={isSubmitting}
                    />
                    <FormLabel left={"40px !important"}>Email</FormLabel>
                  </InputGroup>
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired>
                  <PasswordInput
                    register={{
                      ...register("password", {
                        required: "Password is required",
                      }),
                    }}
                    disabled={isSubmitting}
                    error={errors.password?.message}
                  />
                  <FormErrorMessage>
                    {errors.password?.message}
                  </FormErrorMessage>
                </FormControl>
              </VStack>

              <Button
                type="submit"
                isLoading={isSubmitting}
                marginTop="58px"
                variant="light"
                loadingText="Submitting"
                data-testid="login-button"
              >
                LOG IN
              </Button>
            </chakra.form>
            <Text
              marginTop="28px"
              color="black"
              fontSize="sm"
              textAlign="center"
            >
              Don&apos;t have an account?{" "}
              <Link href="/register" fontWeight={600}>
                Register
              </Link>
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </>
  );
};
