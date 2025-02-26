import { render, screen, waitFor } from "@testing-library/react";
import { useSellerAndAuction } from "@/hooks/swr/useSellerAndAuctions";
import Auction from "@/app/auction/[id]/page";
import "@testing-library/jest-dom";
import { mockData } from "@/mocks/mockSellerAndAuctionData";

jest.mock("@/hooks/swr/useSellerAndAuctions");

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useParams: jest.fn(() => ({
    id: mockData.nfts[0].id,
  })),
}));

describe("AuctionPage", () => {
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

  it("renders auctions details", () => {
    const { id } = require("next/navigation").useParams(); // 🔥 Récupération de l'ID
    const auction = mockData.nfts.find((auction) => auction.id === id);

    render(<Auction />);

    expect(screen.getByText("Properties")).toBeInTheDocument();
    expect(screen.getByText(`name: ${auction?.name}`)).toBeInTheDocument();
    expect(screen.getByText(`like: ${auction?.like}`)).toBeInTheDocument();
    expect(
      screen.getByText(`time left: ${auction?.timeLeft}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`total minted: ${auction?.totalMinted}`)
    ).toBeInTheDocument();
  });

  it("renders associated seller", () => {
    const { id } = require("next/navigation").useParams(); // 🔥 Récupération de l'ID
    const auction = mockData.nfts.find((auction) => auction.id === id);
    const seller = mockData.bestSellers.find(
      (seller) => seller.id === auction?.sellerId
    );

    render(<Auction />);
    expect(screen.getByTestId(`seller-card-${seller?.id}`)).toBeInTheDocument();
  });
});
