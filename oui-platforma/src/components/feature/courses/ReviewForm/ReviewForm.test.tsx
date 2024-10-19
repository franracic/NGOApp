import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ReviewForm } from "./ReviewForm";

describe("ReviewForm", () => {
  it("should render comment input", () => {
    render(<ReviewForm addShowReview={jest.fn()} />);
    const commentInput = screen.getByPlaceholderText("Write a review");

    expect(commentInput).toBeInTheDocument;
  });

  it("should render rating input", () => {
    render(<ReviewForm addShowReview={jest.fn()} />);
    const ratingInput = screen.getByTestId("rating-input");

    expect(ratingInput).toBeInTheDocument;
  });

  it("should render submit button", () => {
    render(<ReviewForm addShowReview={jest.fn()} />);
    const submitButton = screen.getByRole("button", { name: "Add Review" });

    expect(submitButton).toBeInTheDocument;
  });
});
