"use client";

import Carrousel from "@/components/Carrousel";
import { useSellerAndAuction } from "@/hooks/swr/useSellerAndAuctions";
import { useParams } from "next/navigation";
import Image from "next/image";
import BackButton from "@/components/BackButton";

export default function Page() {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const { data, isLoading } = useSellerAndAuction();

  const seller = data?.bestSellers.find((seller) => seller.id === parseInt(id));
  const auctions =
    data?.nfts.filter((auction) => auction.sellerId === parseInt(id)) ?? [];

  return (
    <main className="">
      <div className="">
        <BackButton />
        <div className="flex flex-col gap-4 justify-center items-center ">
          {seller && (
            <div className="relative">
              <Image
                className="rounded-full"
                src={`${seller?.avatar}`}
                alt="Vercel logomark"
                width={80}
                height={80}
              />
              {seller?.isVerified && (
                <Image
                  className="absolute -right-2 bottom-0"
                  src="/verifiedBadge.png"
                  alt="Vercel logomark"
                  width={30}
                  height={30}
                />
              )}
            </div>
          )}

          <div>
            <h2 className="font-bold text-xl">
              Welcome to {seller?.name} wallet
            </h2>
          </div>
        </div>

        <div>
          <div className="my-24">
            <Carrousel
              title={`${seller?.name}'s Auctions 🔥`}
              subtitle={"There is the list of all the auctions of this user"}
              auctions={auctions ?? []}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
