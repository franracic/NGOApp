import { useSteps } from "@chakra-ui/react";
import { createContext, Dispatch, SetStateAction } from "react";
import {
  FormState,
  useForm,
  UseFormReturn,
  UseFormSetError,
} from "react-hook-form";

interface IRegisterContext extends IRegisterForm {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  setError: UseFormSetError<IRegisterForm>;
  handleSubmit: UseFormReturn<IRegisterForm>["handleSubmit"];
  register: UseFormReturn<IRegisterForm>["register"];
  errors: FormState<IRegisterForm>["errors"];
  isSubmitting: FormState<IRegisterForm>["isSubmitting"];
}

export interface IRegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: Date;
  city: string;
  country: string;
  jobTitle: string;
  NGO: string;
  role: string;
  name: string;
}

export const RegisterContext = createContext<IRegisterContext>(
  {} as IRegisterContext
);

export const RegisterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { activeStep, setActiveStep: chakraSetActiveStep } = useSteps({
    index: 0,
    count: 4,
  });
  const formMethods = useForm<IRegisterForm>({
    defaultValues: {
      name: "",
      dateOfBirth: new Date(),
      city: "",
      country: "",
      jobTitle: "",
      NGO: "",
      role: "beginner",
    },
  });

  const setActiveStep: Dispatch<SetStateAction<number>> = (value) => {
    if (typeof value === "function") {
      chakraSetActiveStep(value(activeStep));
    } else {
      chakraSetActiveStep(value);
    }
  };

  return (
    <RegisterContext.Provider
      value={{
        activeStep,
        setActiveStep,
        email: formMethods.watch("email"),
        password: formMethods.watch("password"),
        confirmPassword: formMethods.watch("confirmPassword"),
        dateOfBirth: formMethods.watch("dateOfBirth"),
        city: formMethods.watch("city"),
        country: formMethods.watch("country"),
        jobTitle: formMethods.watch("jobTitle"),
        name: formMethods.watch("name"),
        NGO: formMethods.watch("NGO"),
        role: formMethods.watch("role"),
        setError: formMethods.setError,
        handleSubmit: formMethods.handleSubmit,
        register: formMethods.register,
        errors: formMethods.formState.errors,
        isSubmitting: formMethods.formState.isSubmitting,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};
