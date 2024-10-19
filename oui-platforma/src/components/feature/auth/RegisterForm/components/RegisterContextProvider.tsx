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
  username: string[];
  dateOfBirth: Date;
  address: string;
  city: string;
  country: string;
  workPlace: string;
  employer: string;
  role: string;
}

export const RegisterContext = createContext<IRegisterContext>(
  {} as IRegisterContext
);

export const RegisterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { activeStep, setActiveStep } = useSteps({ index: 0, count: 4 });
  const formMethods = useForm<IRegisterForm>({
    defaultValues: {
      username: [""],
      dateOfBirth: new Date(),
      address: "",
      city: "",
      country: "",
      workPlace: "",
      employer: "",
      role: "worker",
    },
  });

  return (
    <RegisterContext.Provider
      value={{
        activeStep,
        setActiveStep,
        email: formMethods.watch("email"),
        password: formMethods.watch("password"),
        confirmPassword: formMethods.watch("confirmPassword"),
        username: formMethods.watch("username"),
        dateOfBirth: formMethods.watch("dateOfBirth"),
        address: formMethods.watch("address"),
        city: formMethods.watch("city"),
        country: formMethods.watch("country"),
        workPlace: formMethods.watch("workPlace"),
        employer: formMethods.watch("employer"),
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
