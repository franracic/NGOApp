import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import useSWRMutation from "swr/mutation";
import { DeleteModal } from "./DeleteModal";

jest.mock("swr/mutation");

describe("DeleteModal component", () => {
  const reviewId = "123";

  beforeEach(() => {
    (useSWRMutation as jest.Mock).mockReturnValue({
      trigger: jest.fn(),
    });
    render(<DeleteModal review_id={reviewId} show_id={"15"} />);
  });

  it("should open the modal when the delete button is clicked", () => {
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);

    const modal = screen.getByTestId("delete-modal");
    expect(modal).toBeInTheDocument();
  });

  it("should call deleteShowReview when the delete button inside the modal is clicked", () => {
    const trigger = jest.fn();
    (useSWRMutation as jest.Mock).mockReturnValue({
      trigger,
    });
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    const modalDeleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(modalDeleteButton);

    expect(trigger).toHaveBeenCalled();
  });
});
