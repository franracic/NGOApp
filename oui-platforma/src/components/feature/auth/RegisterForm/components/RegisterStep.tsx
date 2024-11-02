"use client";
import { ArrowRightIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
  VStack,
  chakra,
} from "@chakra-ui/react";
import { useContext } from "react";
import {
  MdCake,
  MdFlag,
  MdGroup,
  MdLocationCity,
  MdPerson,
  MdWork,
} from "react-icons/md";
import { IRegisterForm, RegisterContext } from "./RegisterContextProvider";
import { RegisterLastStep } from "./RegisterLastStep";

const steps = [
  [
    {
      title: "name",
      icon: MdPerson,
      description: "full name",
      type: "text",
    },
    {
      title: "dateOfBirth",
      icon: MdCake,
      description: "date of birth",
      type: "date",
    },
  ],
  [
    { title: "city", icon: MdLocationCity, description: "city", type: "text" },
    { title: "country", icon: MdFlag, description: "country", type: "text" },
  ],
  [
    {
      title: "jobTitle",
      icon: MdWork,
      description: "job or university",
      type: "text",
    },
    { title: "NGO", icon: MdGroup, description: "NGO", type: "text" },
  ],
];

export const RegisterStep = () => {
  const {
    register,
    setError,
    errors,
    activeStep,
    setActiveStep,
    handleSubmit,
    isSubmitting,
  } = useContext(RegisterContext);

  const handleNextStep = async (data: IRegisterForm) => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  if (activeStep === steps.length) {
    return <RegisterLastStep />;
  }

  if (isSubmitting) return <Text>Loading...</Text>;

  return (
    <VStack spacing={0} mt={10}>
      <chakra.form
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        onSubmit={handleSubmit(handleNextStep)}
      >
        <VStack spacing={8}>
          {steps[activeStep].map((step, index) => (
            <FormControl
              key={index}
              isRequired
              isInvalid={!!(errors as any)[step.title]}
            >
              <InputGroup variant="dark">
                <InputLeftElement>
                  <Icon as={step.icon} boxSize={6} />
                </InputLeftElement>
                <Input
                  {...register(step.title as keyof IRegisterForm, {
                    required: `${step.description} is required`,
                  })}
                  type={step.type}
                  placeholder=" "
                  onFocus={(e) => step.type === "date" && e.target.showPicker()}
                />
                <FormLabel left={"40px !important"}>
                  {step.description}
                </FormLabel>
              </InputGroup>
              <FormErrorMessage>
                {errors[step.title as keyof IRegisterForm]?.message}
              </FormErrorMessage>
            </FormControl>
          ))}
        </VStack>

        <IconButton
          marginTop="58px"
          type="submit"
          icon={<ArrowRightIcon />}
          variant="light"
          aria-label="Next"
        />
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
