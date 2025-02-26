import { render, screen, waitFor } from "@testing-library/react";
import { useSellerAndAuction } from "@/hooks/swr/useSellerAndAuctions";
import Seller from "@/app/seller/[id]/page";
import "@testing-library/jest-dom";
import { mockData } from "@/mocks/mockSellerAndAuctionData";

jest.mock("@/hooks/swr/useSellerAndAuctions");

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useParams: jest.fn(() => ({
    id: mockData.bestSellers[0].id.toString(),
  })),
}));

describe("SellerPage", () => {
  const mockedUseSellerAndAuction = useSellerAndAuction as jest.MockedFunction<
    typeof useSellerAndAuction
  >;

  beforeAll(() => {
    mockedUseSellerAndAuction.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });
  });

  it("renders auctions associtated with the seller", () => {
    const { id } = require("next/navigation").useParams(); // 🔥 Récupération de l'ID

    render(<Seller />);
    expect(screen.getAllByTestId(`auction-seller-${id}`).length).toBe(1);
  });
});
