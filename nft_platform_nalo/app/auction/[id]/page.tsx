"use client";

import { useSellerAndAuction } from "@/hooks/swr/useSellerAndAuctions";
import { useParams } from "next/navigation";
import Image from "next/image";
import BackButton from "@/components/BackButton";

import LoadingImageText from "@/components/LoadingImageText";
import SellerCard from "@/components/SellerCard";

export default function Page() {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const { data, isLoading } = useSellerAndAuction();

  const auction = data?.nfts.find((auction) => auction.id === id);
  const seller = data?.bestSellers.find(
    (seller) => seller.id === parseInt((auction?.sellerId ?? "").toString())
  );

  return (
    <main className="">
      <div className="">
        <BackButton />
        <div className="mt-8">
          <h2 className="font-bold text-xl">Auction informations 🔥</h2>
          <p className="text-zinc-400 font-semibold text-xs">
            Here are the details of the auction
          </p>
        </div>
        <div className="flex gap-4 justify-start items-center">
          <div className="mt-4 w-full">
            {isLoading || !auction || !seller ? (
              <LoadingImageText />
            ) : (
              <div className="flex flex-col-reverse sm:flex-row justify-between items-center">
                <div className="text-start mt-4 sm:mt-0 w-full text-zinc-500 font-semibold text-xs">
                  <p className="text-zinc-700 font-semibold text-sm">
                    Properties
                  </p>
                  <ul>
                    <li>name: {auction.name}</li>
                    <li>like: {auction.like}</li>
                    <li>price: {auction.price}</li>
                    <li>time left: {auction.timeLeft}</li>
                    <li>total minted{auction.totalMinted}</li>
                  </ul>
                  <div className="w-fit">
                    <p className="text-zinc-700 font-semibold text-sm mt-2">
                      Seller
                    </p>
                    <SellerCard seller={seller} />
                  </div>
                </div>
                <Image
                  className=""
                  src={`${auction.image}`}
                  alt="Vercel logomark"
                  width={300}
                  height={300}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
