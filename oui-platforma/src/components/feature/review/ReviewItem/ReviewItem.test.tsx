import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ReviewItem } from "./ReviewItem";

describe("ReviewItem", () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      return JSON.stringify({
        uid: "test@example.com",
      });
    });
  });

  const mockReview = {
    user: {
      email: "test@example.com",
      avatar: "https://example.com/avatar.jpg",
    },
    rating: 5,
    comment: "Great show!",
    deleteShowReview: jest.fn(),
    show_id: "1",
    id: "42",
  };

  it("should render correct user email", () => {
    render(<ReviewItem {...mockReview} />);
    const email = screen.getByText(mockReview.user.email);

    expect(email).toBeInTheDocument();
  });

  it("should render correct rating", () => {
    render(<ReviewItem {...mockReview} />);
    const rating = screen.getByTestId("rating-badge");

    expect(rating).toBeInTheDocument();
    expect(rating).toHaveTextContent(`${mockReview.rating}/5`);
  });

  it("should render correct review comment", () => {
    render(<ReviewItem {...mockReview} />);
    const comment = screen.getByText(mockReview.comment);

    expect(comment).toBeInTheDocument();
  });

  it("should render edit button and delete button", () => {
    render(<ReviewItem {...mockReview} />);
    const editButton = screen.getByRole("button", { name: "Edit" });
    const deleteButton = screen.getByRole("button", { name: "Delete" });

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  it("should not render edit button and delete button if user is not the author", () => {
    render(
      <ReviewItem
        {...mockReview}
        user={{ email: "test@gmail.com", avatar: "" }}
      />
    );
    const editButton = screen.queryByRole("button", { name: "Edit" });
    const deleteButton = screen.queryByRole("button", { name: "Delete" });

    expect(editButton).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
  });
});
