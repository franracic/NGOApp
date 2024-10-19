// import "@testing-library/jest-dom";
// import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// import useSWRMutation from "swr/mutation";
// import { LoginForm } from "./LoginForm";

// jest.mock("swr/mutation");

// describe("LoginForm", () => {
//   it("should render email input field", () => {
//     (useSWRMutation as jest.Mock).mockReturnValue({
//       trigger: jest.fn(),
//     });

//     render(<LoginForm />);
//     const emailInput = screen.getByPlaceholderText("Enter email");
//     expect(emailInput).toBeInTheDocument();
//   });

//   it("should render password input field", () => {
//     (useSWRMutation as jest.Mock).mockReturnValue({
//       trigger: jest.fn(),
//     });

//     render(<LoginForm />);

//     const passwordInput = screen.getByPlaceholderText("Password");
//     expect(passwordInput).toBeInTheDocument();
//   });

//   it("should render button and submit on clicking", async () => {
//     const trigger = jest.fn();
//     (useSWRMutation as jest.Mock).mockReturnValue({ trigger });

//     render(<LoginForm />);

//     const emailInput = screen.getByPlaceholderText("Enter email");
//     const passwordInput = screen.getByPlaceholderText("Password");
//     const loginButton = screen.getByTestId("login-button");

//     expect(loginButton).toBeInTheDocument();

//     fireEvent.change(emailInput, { target: { value: "test@example.com" } });
//     fireEvent.change(passwordInput, { target: { value: "password123" } });
//     fireEvent.click(loginButton);

//     await waitFor(() => {
//       expect(trigger).toHaveBeenCalledWith({
//         email: "test@example.com",
//         password: "password123",
//       });
//     });
//   });
// });
