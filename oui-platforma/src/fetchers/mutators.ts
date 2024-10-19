// mutator.ts
import axios, { AxiosRequestConfig } from "axios";

interface ILoginFormInputs {
  email: string;
  password: string;
}

interface ILoginResponse {
  access: string;
  user: {
    id: number;
    email: string;
    username: string;
  };
}

export const mutator = async (
  url: string,
  { arg }: { arg: ILoginFormInputs }
): Promise<ILoginResponse> => {
  try {
    const config: AxiosRequestConfig = {
      method: "post",
      url,
      data: arg,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios(config);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to log in. Please check your credentials.");
    }
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.detail || "An error occurred during login."
      );
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }
};
