import { render, screen, waitFor } from "@testing-library/react";
import { useSellerAndAuction } from "@/hooks/swr/useSellerAndAuctions";
import Home from "@/app/page";
import "@testing-library/jest-dom";
import { mockData } from "@/mocks/mockSellerAndAuctionData";

jest.mock("@/hooks/swr/useSellerAndAuctions");

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe("Home", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockedUseSellerAndAuction = useSellerAndAuction as jest.MockedFunction<
    typeof useSellerAndAuction
  >;

  it("renders loading state initially", () => {
    mockedUseSellerAndAuction.mockReturnValue({
      data: mockData,
      isLoading: true,
      error: null,
    });

    render(<Home />);

    expect(screen.getAllByTestId("basic-loading").length).toBeGreaterThan(0);
  });

  it("does not show loading when data is loaded", () => {
    mockedUseSellerAndAuction.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    render(<Home />);

    expect(screen.queryByTestId("basic-loading")).not.toBeInTheDocument();
  });

  it("renders SellerCards when data is available", () => {
    mockedUseSellerAndAuction.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    render(<Home />);

    expect(screen.getAllByRole("seller-card").length).toBe(2);
  });

  it("renders Carrousel when data is available", async () => {
    render(<Home />);

    const carrousel = screen.getByRole("heading", {
      name: /Live Auctions 🔥/i,
    });

    expect(carrousel).toBeInTheDocument();
  });
});
