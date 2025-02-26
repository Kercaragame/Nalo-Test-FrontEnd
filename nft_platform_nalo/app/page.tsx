"use client";

import BasicLoading from "@/components/BasicLoading";
import Carrousel from "@/components/Carrousel";
import SellerCard from "@/components/SellerCard";
import { useSellerAndAuction } from "@/hooks/swr/useSellerAndAuctions";
import { useMemo } from "react";

export default function Home() {
  const { data, isLoading } = useSellerAndAuction();

  const auctions = useMemo(() => data?.nfts, [data]);
  const sellers = useMemo(
    () =>
      data?.bestSellers.map((seller) => ({
        ...seller,
        totalMoney:
          auctions
            ?.filter((auction) => auction.sellerId === seller.id)
            .reduce((acc, auction) => {
              return acc + auction.totalMinted * parseFloat(auction.price);
            }, 0)
            .toFixed(2) ?? "0.0",
      })),
    [data]
  );

  return (
    <div className="">
      <main>
        <div className="">
          <h2 className="font-bold text-xl">Best Sellers 🎨</h2>
          <p className="text-zinc-400 font-semibold text-xs">
            {"Best seller of this week's NFTs"}
          </p>
          {isLoading ? (
            <BasicLoading />
          ) : (
            <div className="mt-10 grid gap-2 grid-cols-1 [min-420px]-grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:gap-8 lg:grid-cols-4">
              {sellers
                ?.toSorted(
                  (a, b) => parseFloat(b.totalMoney) - parseFloat(a.totalMoney)
                )
                .map((seller, index) => (
                  <SellerCard
                    seller={seller}
                    rank={index + 1}
                    key={seller.id}
                  />
                ))}
            </div>
          )}
        </div>
        <div className="my-24 overflow-hidden">
          <Carrousel
            title={"Live Auctions 🔥"}
            subtitle={"Enjoy the latest hot auctions"}
            auctions={auctions ?? []}
            isLoading={isLoading}
          />
        </div>
      </main>
      <footer className=""></footer>
    </div>
  );
}

